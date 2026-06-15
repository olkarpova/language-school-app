"use client";

import { useEffect, useState } from "react";
import { getTeachers } from "@/lib/firebase";
import { Teacher } from "@/types/teacher";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeachers()
      .then(setTeachers)
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