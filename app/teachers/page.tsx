"use client";
// сторінка Teachers має бути клієнтською, тому й дані тягнемо на клієнті
// чому ця сторінка клієнтська
// Firebase client SDK працює в браузері. 
// Та функція getDatabase/get, яку ми використали, розрахована на клієнт
// Сторінка Teachers має бути інтерактивною

import { useEffect, useState } from "react";
import { getTeachers } from "@/lib/firebase";
import { Teacher } from "@/types/teacher";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeachers()
      .then((data) => { 
        setTeachers(data);
        console.log("teachers", data);
      })
      .finally(() => setLoading(false));
  }, []);
  

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {teachers.map((teacher, index) => (
        <li key={index}>
          {teacher.name} {teacher.surname} — {teacher.languages.join(", ")}, ${teacher.price_per_hour}/год
        </li>
      ))}
    </ul>
  );
}
// правило таке: 
// Серверний async-компонент (як notes) — коли просто треба завантажити й показати дані, 
// без кнопок і взаємодії. REST API + axios сюди ідеально лягають.
// Клієнтський компонент + useEffect — коли на сторінці є інтерактив (фільтри, стан, кліки), 
// і/або коли джерело даних (Firebase client SDK) працює в браузері.

