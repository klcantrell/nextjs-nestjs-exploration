import { useParams } from 'react-router-dom';

import {
  Film,
  Planet,
  Species,
  StarWarsPerson,
  Starship,
  Vehicle,
} from '../types';
import { getData } from '../utils';
import { useEffect, useRef, useState } from 'react';

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
    `http://localhost:3000/api/people/${id}/starships`
  );
}

async function getPersonHomeworld(id: string) {
  return getData<Planet>(`http://localhost:3000/api/people/${id}/homeworld`);
}

export default function Person() {
  const [person, setPerson] = useState<StarWarsPerson | null>(null);
  const [species, setSpecies] = useState<Species[] | null>(null);
  const [movies, setMovies] = useState<Film[] | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[] | null>(null);
  const [starships, setStarships] = useState<Starship[] | null>(null);
  const [homeworld, setHomeworld] = useState<Planet | null>(null);

  const fetching = useRef(false);

  const params = useParams<{ id: string }>();

  const isLoading =
    person === null ||
    species === null ||
    movies === null ||
    vehicles === null ||
    starships === null ||
    homeworld === null;

  useEffect(() => {
    if (params.id && !fetching.current) {
      fetching.current = true;
      const personRequest = getPerson(params.id);
      const speciesRequests = getPersonSpecies(params.id);
      const filmsRequests = getPersonMovies(params.id);
      const vehiclesRequests = getPersonVehicles(params.id);
      const starshipsRequests = getPersonStarships(params.id);
      const homeworldRequest = getPersonHomeworld(params.id);

      Promise.all([
        personRequest,
        speciesRequests,
        filmsRequests,
        vehiclesRequests,
        starshipsRequests,
        homeworldRequest,
      ]).then(([person, species, movies, vehicles, starships, homeworld]) => {
        setPerson(person);
        setSpecies(species);
        setMovies(movies);
        setVehicles(vehicles);
        setStarships(starships);
        setHomeworld(homeworld);
        fetching.current = false;
      });
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <main className={'mainPerson'}>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main className={'mainPerson'}>
      <h1>{person.name}</h1>

      <section className={'personDataSection'}>
        <h2>Homeworld</h2>
        <p>{homeworld.name}</p>
      </section>

      <section className={'personDataSection'}>
        <h2>Species</h2>
        {species.length === 0 ? (
          <p>None</p>
        ) : species.length === 1 ? (
          <p>{species[0].name}</p>
        ) : (
          <ul className={'personDataSectionList'}>
            {species.map((s) => (
              <li key={s.name}>{s.name}</li>
            ))}
          </ul>
        )}
      </section>

      <section className={'personDataSection'}>
        <h2>Films</h2>
        {movies.length === 0 ? (
          <p>None</p>
        ) : movies.length === 1 ? (
          <p>{movies[0].title}</p>
        ) : (
          <ul className={'personDataSectionList'}>
            {movies.map((film) => (
              <li key={film.title}>{film.title}</li>
            ))}
          </ul>
        )}
      </section>

      <section className={'personDataSection'}>
        <h2>Vehicles</h2>
        {vehicles.length === 0 ? (
          <p>None</p>
        ) : vehicles.length === 1 ? (
          <p>{vehicles[0].name}</p>
        ) : (
          <ul className={'personDataSectionList'}>
            {vehicles.map((vehicle) => (
              <li key={vehicle.name}>{vehicle.name}</li>
            ))}
          </ul>
        )}
      </section>

      <section className={'personDataSection'}>
        <h2>Starships</h2>
        {starships.length === 0 ? (
          <p>None</p>
        ) : starships.length === 1 ? (
          <p>{starships[0].name}</p>
        ) : (
          <ul className={'personDataSectionList'}>
            {starships.map((starship) => (
              <li key={starship.name}>{starship.name}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
