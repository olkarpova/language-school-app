import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

const stats = [
  { value: '32,000 +', label: 'Experienced tutors' },
  { value: '300,000 +', label: '5-star tutor reviews' },
  { value: '120 +', label: 'Subjects taught' },
  { value: '200 +', label: 'Tutor nationalities' },
];

export default function Home() {
  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.textCard}>
          <h1 className={styles.title}>
            Unlock your potential with the best <span className={styles.accent}>language</span>{' '}
            tutors
          </h1>
          <p className={styles.description}>
            Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your
            language proficiency to new heights by connecting with highly qualified and experienced
            tutors.
          </p>
          <Link type="button" href="/teachers" className={styles.getStarted}>
            Get started
          </Link>
        </div>
        <div className={styles.imageCard}>
          <Image src="/home-memoji.png" alt="Language tutor" width={391} height={578} priority />
        </div>
      </section>

      <ul className={styles.stats}>
        {stats.map((item) => (
          <li key={item.label} className={styles.statItem}>
            <span className={styles.statValue}>{item.value}</span>
            <span className={styles.statLabel}>{item.label}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
