import { Injectable } from '@nestjs/common';
import {
  Film,
  PeopleResponse,
  Planet,
  Species,
  StarWarsPerson,
  Starship,
  Vehicle,
} from '../../shared/types';
import { PeopleRequestDto } from 'dtos/peopleRequestDto';

const DEFAULT_ERROR_MESSAGE =
  'Yikes, we ran into some trouble. Try again, please';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getPeople(params: PeopleRequestDto): Promise<StarWarsPerson[]> {
    const people = await this.getData<PeopleResponse>(
      `https://swapi.dev/api/people?page=${params.page}`,
    );

    return people.results;
  }

  async getPerson(id: string): Promise<StarWarsPerson> {
    return this.getData<StarWarsPerson>(`https://swapi.dev/api/people/${id}`);
  }

  async getPersonSpecies(id: string): Promise<Species[]> {
    const person = await this.getData<StarWarsPerson>(
      `https://swapi.dev/api/people/${id}`,
    );

    return Promise.all(
      person.species.map((speciesUrl) => this.getData<Species>(speciesUrl)),
    );
  }
  async getPersonMovies(id: string): Promise<Film[]> {
    const person = await this.getData<StarWarsPerson>(
      `https://swapi.dev/api/people/${id}`,
    );

    return Promise.all(
      person.films.map((filmUrl) => this.getData<Film>(filmUrl)),
    );
  }

  async getPersonVehicles(id: string): Promise<Vehicle[]> {
    const person = await this.getData<StarWarsPerson>(
      `https://swapi.dev/api/people/${id}`,
    );

    return Promise.all(
      person.vehicles.map((vehicleUrl) => this.getData<Vehicle>(vehicleUrl)),
    );
  }

  async getPersonStarships(id: string): Promise<Starship[]> {
    const person = await this.getData<StarWarsPerson>(
      `https://swapi.dev/api/people/${id}`,
    );

    return Promise.all(
      person.starships.map((starshipUrl) =>
        this.getData<Starship>(starshipUrl),
      ),
    );
  }

  async getPersonHomeworld(id: string): Promise<Planet> {
    const person = await this.getData<StarWarsPerson>(
      `https://swapi.dev/api/people/${id}`,
    );

    return this.getData<Planet>(person.homeworld);
  }

  private async getData<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
      throw Error(DEFAULT_ERROR_MESSAGE);
    }

    return response.json() as Promise<T>;
  }
}
