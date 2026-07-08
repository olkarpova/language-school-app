"use client";

import { useEffect, useState } from "react";
import { getTeachers } from "@/lib/firebase";
import { Teacher } from "@/types/teacher";
import TeacherCard from "@/components/TeacherCard/TeacherCard";
import { useFavorites } from "@/components/FavoritesProvider/FavoritesProvider";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import styles from "../teachers/page.module.css";
import Loader from "@/components/Loader/Loader";

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const { favorites } = useFavorites();

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getTeachers()
      .then((data) => setTeachers(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // поки перевіряємо авторизацію — нічого не показуємо
  if (authLoading) return <Loader/>;

  // захист: не залогінений — не пускаємо
  if (!user) {
    return (
      <section className={styles.page}>
        <p>This page is available only for authorized users. Please log in.</p>
      </section>
    );
  }

  if (loading) return <Loader/>;
  if (error) return <p>Something went wrong. Please try again.</p>;

  // лишаємо тільки викладачів, що є в обраному
  const favoriteTeachers = teachers.filter((teacher) =>
    favorites.includes(`${teacher.name} ${teacher.surname}`)
  );

  return (
    <section className={styles.page}>
      {favoriteTeachers.length === 0 ? (
        <p className={styles.emptyMessage}>You have no favorite teachers yet.</p>
      ) : (
        <ul className={styles.list}>
          {favoriteTeachers.map((teacher) => (
            <li key={`${teacher.name}-${teacher.surname}`}>
              <TeacherCard teacher={teacher} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}