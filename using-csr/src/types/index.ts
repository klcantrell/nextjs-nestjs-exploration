export type StarWarsPerson = {
  name: string;
  url: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  homeworld: string;
};

export type PeopleResponse = {
  results: StarWarsPerson[];
};

export type Film = {
  title: string;
};

export type Vehicle = {
  name: string;
};

export type Starship = {
  name: string;
};

export type Species = {
  name: string;
};

export type Planet = {
  name: string;
};

export function getPersonIdFromUrl(url: string) {
  return url.replace('https://swapi.dev/api/people/', '').replace('/', '');
}
