import { useEffect, useRef, useState } from 'react';
import { StarWarsPerson, getPersonIdFromUrl } from '../types';
import { Link } from 'react-router-dom';

const maxPage = 5;
const minPage = 1;

async function getData() {
  const response = await fetch(
    `http://localhost:3000/api/people?page=${Math.floor(
      Math.random() * (maxPage - minPage) + minPage
    )}`
  );

  if (!response.ok) {
    throw Error('Yikes, we ran into some trouble. Try again, please');
  }

  return response.json() as Promise<StarWarsPerson[]>;
}

let cachedPeople: StarWarsPerson[] | null = null;

type State = { type: 'loading' } | { type: 'loaded'; data: StarWarsPerson[] };

export default function Home() {
  const [state, setState] = useState<State>(
    cachedPeople ? { type: 'loaded', data: cachedPeople } : { type: 'loading' }
  );
  const fetching = useRef(false);

  useEffect(() => {
    if (state.type !== 'loaded' && !fetching.current) {
      fetching.current = true;
      getData().then((people) => {
        cachedPeople = people;
        setState({ type: 'loaded', data: people });
        fetching.current = false;
      });
    }
  }, [state.type]);

  if (state.type === 'loading') {
    return (
      <main className="mainPerson">
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main className="mainHome">
      <div className="description">
        <p>
          Get started by editing&nbsp;
          <code className="code">app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <img
              src="/vercel.svg"
              alt="Vercel Logo"
              className="vercelLogo"
              width={100}
              height={24}
            />
          </a>
        </div>
      </div>

      <div className="center">
        <img
          className="logo"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
        />
        <div className="thirteen">
          <img src="/thirteen.svg" alt="13" width={40} height={31} />
        </div>
      </div>

      <div className="grid">
        {state.data.map((person) => (
          <Link
            key={person.name}
            to={`/person/${getPersonIdFromUrl(person.url)}`}
            className="card"
          >
            <h2>
              {person.name} <span>-&gt;</span>
            </h2>
            <p>Learn more about {person.name}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
