import { Inter } from 'next/font/google';

import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function PersonLoading() {
  return (
    <main className={styles.mainPerson}>
      <h1 className={inter.className}>Loading...</h1>
    </main>
  );
}
