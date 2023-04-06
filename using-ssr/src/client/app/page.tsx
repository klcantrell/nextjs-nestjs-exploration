import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';

import styles from './page.module.css';
import { StarWarsPerson, getPersonIdFromUrl } from '@/../shared/types';

const inter = Inter({ subsets: ['latin'] });
const maxPage = 5;
const minPage = 1;

async function getData() {
  const response = await fetch(
    `http://localhost:3000/api/people?page=${Math.floor(
      Math.random() * (maxPage - minPage) + minPage,
    )}`,
    { cache: 'no-store' },
  );

  if (!response.ok) {
    throw Error('Yikes, we ran into some trouble. Try again, please');
  }

  return response.json() as Promise<StarWarsPerson[]>;
}

export default async function Home() {
  const people = await getData();

  return (
    <main className={styles.mainHome}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <div className={styles.thirteen}>
          <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
        </div>
      </div>

      <div className={styles.grid}>
        {people.map((person) => (
          <Link
            key={person.name}
            href={`/person/${getPersonIdFromUrl(person.url)}`}
            className={styles.card}
          >
            <h2 className={inter.className}>
              {person.name} <span>-&gt;</span>
            </h2>
            <p className={inter.className}>Learn more about {person.name}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
