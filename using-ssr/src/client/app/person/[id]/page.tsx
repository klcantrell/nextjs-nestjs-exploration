import {
  Film,
  Planet,
  Species,
  StarWarsPerson,
  Starship,
  Vehicle,
} from '@/../shared/types';
import { Inter } from 'next/font/google';
import styles from '../../page.module.css';

const inter = Inter({ subsets: ['latin'] });

const DEFAULT_ERROR_MESSAGE =
  'Yikes, we ran into some trouble. Try again, please';

async function getData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw Error(DEFAULT_ERROR_MESSAGE);
  }

  return response.json() as Promise<T>;
}

async function getPerson(id: string) {
  return getData<StarWarsPerson>(`http://localhost:3000/api/people/${id}`);
}

async function getPersonSpecies(id: string) {
  return getData<Species[]>(`http://localhost:3000/api/people/${id}/species`);
}

async function getPersonMovies(id: string) {
  return getData<Film[]>(`http://localhost:3000/api/people/${id}/movies`);
}

async function getPersonVehicles(id: string) {
  return getData<Vehicle[]>(`http://localhost:3000/api/people/${id}/vehicles`);
}

async function getPersonStarships(id: string) {
  return getData<Starship[]>(
    `http://localhost:3000/api/people/${id}/starships`,
  );
}

async function getPersonHomeworld(id: string) {
  return getData<Planet>(`http://localhost:3000/api/people/${id}/homeworld`);
}

export default async function Person({ params }: { params: { id: string } }) {
  const personRequest = getPerson(params.id);
  const speciesRequests = getPersonSpecies(params.id);
  const filmsRequests = getPersonMovies(params.id);
  const vehiclesRequests = getPersonVehicles(params.id);
  const starshipsRequests = getPersonStarships(params.id);
  const homeworldRequest = getPersonHomeworld(params.id);

  const allData = await Promise.all([
    personRequest,
    speciesRequests,
    filmsRequests,
    vehiclesRequests,
    starshipsRequests,
    homeworldRequest,
  ]);

  const person = allData[0];
  const species = allData[1];
  const films = allData[2];
  const vehicles = allData[3];
  const starships = allData[4];
  const homeworld = allData[5];

  return (
    <main className={styles.mainPerson}>
      <h1 className={inter.className}>{person.name}</h1>

      <section className={styles.personDataSection}>
        <h2 className={inter.className}>Homeworld</h2>
        <p>{homeworld.name}</p>
      </section>

      <section className={styles.personDataSection}>
        <h2 className={inter.className}>Species</h2>
        {species.length === 0 ? (
          <p>None</p>
        ) : species.length === 1 ? (
          <p>{species[0].name}</p>
        ) : (
          <ul className={styles.personDataSectionList}>
            {species.map((s) => (
              <li key={s.name}>{s.name}</li>
            ))}
          </ul>
        )}
      </section>

      <section className={styles.personDataSection}>
        <h2 className={inter.className}>Films</h2>
        {films.length === 0 ? (
          <p>None</p>
        ) : films.length === 1 ? (
          <p>{films[0].title}</p>
        ) : (
          <ul className={styles.personDataSectionList}>
            {films.map((film) => (
              <li key={film.title}>{film.title}</li>
            ))}
          </ul>
        )}
      </section>

      <section className={styles.personDataSection}>
        <h2 className={inter.className}>Vehicles</h2>
        {vehicles.length === 0 ? (
          <p>None</p>
        ) : vehicles.length === 1 ? (
          <p>{vehicles[0].name}</p>
        ) : (
          <ul className={styles.personDataSectionList}>
            {vehicles.map((vehicle) => (
              <li key={vehicle.name}>{vehicle.name}</li>
            ))}
          </ul>
        )}
      </section>

      <section className={styles.personDataSection}>
        <h2 className={inter.className}>Starships</h2>
        {starships.length === 0 ? (
          <p>None</p>
        ) : starships.length === 1 ? (
          <p>{starships[0].name}</p>
        ) : (
          <ul className={styles.personDataSectionList}>
            {starships.map((starship) => (
              <li key={starship.name}>{starship.name}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
