'use client';
// сторінка Teachers має бути клієнтською, тому й дані тягнемо на клієнті
// Firebase client SDK працює в браузері.
// Функція getDatabase/get, яку ми використали, розрахована на клієнт
// Сторінка Teachers має бути інтерактивною

import { useEffect, useState } from 'react';
import { getTeachers } from '@/lib/firebase';
import { Teacher } from '@/types/teacher';
import TeacherCard from '@/components/TeacherCard/TeacherCard';
import styles from './page.module.css';
import Filters from '@/components/Filters/Filters';
import Loader from '@/components/Loader/Loader';


const PER_PAGE = 4;

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(PER_PAGE);

  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    getTeachers()
      .then(data => {
        setTeachers(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader/>;
  if (error) return <p>Something went wrong. Please try again.</p>;

  // збираємо унікальні варіанти для випадайок з даних
  const languages = [...new Set(teachers.flatMap((t) => t.languages))].sort();
  const levels = [...new Set(teachers.flatMap((t) => t.levels))];
  const prices = [...new Set(teachers.map((t) => t.price_per_hour))].sort((a, b) => a - b);

  // фільтруємо викладачів за вибраними значеннями
  const filtered = teachers.filter((teacher) => {
    const matchLanguage = !language || teacher.languages.includes(language);
    const matchLevel = !level || teacher.levels.includes(level);
    const matchPrice = !price || teacher.price_per_hour === Number(price);
    return matchLanguage && matchLevel && matchPrice;
  });

  const visibleTeachers = filtered.slice(0, visible);

  const handleLoadMore = () => {
    setVisible(prev => prev + PER_PAGE);
  };

  return (
    <section className={styles.page}>
      <Filters
        languages={languages}
        levels={levels}
        prices={prices}
        selectedLanguage={language}
        selectedLevel={level}
        selectedPrice={price}
        onLanguageChange={(value) => { setLanguage(value); setVisible(PER_PAGE); }}
        onLevelChange={(value) => { setLevel(value); setVisible(PER_PAGE); }}
        onPriceChange={(value) => { setPrice(value); setVisible(PER_PAGE); }}
      />
      
      {filtered.length === 0 ? (
        <p>No teachers found for selected filters.</p>
      ) : (
        <>
          <ul className={styles.list}>
            {visibleTeachers.map(teacher => (
              <li key={`${teacher.name}-${teacher.surname}`}>
                <TeacherCard teacher={teacher} />
              </li>
            ))}
          </ul>

          {visible < filtered.length && (
            <button className={styles.loadMore} onClick={handleLoadMore}>
              Load more
            </button>
          )}
        </>
      )}
    </section>
  );
}
{/* // правило таке:
// Серверний async-компонент (як notes) — коли просто треба завантажити й показати дані,
// без кнопок і взаємодії. REST API + axios сюди ідеально лягають.
// Клієнтський компонент + useEffect — коли на сторінці є інтерактив (фільтри, стан, кліки),
// і/або коли джерело даних (Firebase client SDK) працює в браузері. */}
