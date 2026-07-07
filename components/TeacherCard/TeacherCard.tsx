'use client';

import { useState } from 'react';
import { Teacher } from '@/types/teacher';
import Image from 'next/image';
import styles from './TeacherCard.module.css';
import Icon from '../Icon/Icon';
import Modal from '../Modal/Modal';
import BookTrialForm from '../BookTrialForm/BookTrialForm';
import { useFavorites } from '@/components/FavoritesProvider/FavoritesProvider';
import { useAuth } from '../AuthProvider/AuthProvider';

interface TeacherCardProps {
  teacher: Teacher;
}
export default function TeacherCard({ teacher }: TeacherCardProps) {
  const [showMore, setShowMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  const teacherId = `${teacher.name} ${teacher.surname}`;

  const handleFavoriteClick = () => {
  if (!user) {
    alert("This feature is available only for authorized users.");
    return;
  }
  toggleFavorite(teacherId);
};

  return (
    <article className={styles.card}>
      <div className={styles.avatarWrap}>
        <Image
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          width={96}
          height={96}
          className={styles.avatar}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.topRow}>
          <span className={styles.label}>Languages</span>
          <ul className={styles.stats}>
            <li>
              <Icon name="icon-book" width={16} height={16} />
              Lessons online
            </li>
            <li>Lessons done: {teacher.lessons_done}</li>
            <li>
              <Icon name="icon-star" width={16} height={16} /> Rating: {teacher.rating}
            </li>
            <li>
              Price / 1 hour: <span className={styles.price}>{teacher.price_per_hour}$</span>
            </li>
          </ul>
          <button
            className={styles.favBtn}
            aria-label="Add to favorites"
            onClick={handleFavoriteClick}
          >
            <Icon
              name="icon-heart"
              width={26}
              height={26}
              className={user && isFavorite(teacherId) ? styles.favActive : ""}
            />
          </button>
        </div>
        <h2 className={styles.name}>
          {teacher.name} {teacher.surname}
        </h2>

        <p className={styles.row}>
          <span className={styles.rowLabel}>Speaks:</span>{' '}
          <span className={styles.underline}>{teacher.languages.join(', ')}</span>
        </p>
        <p className={styles.row}>
          <span className={styles.rowLabel}>Lesson Info:</span> {teacher.lesson_info}
        </p>
        <p className={styles.row}>
          <span className={styles.rowLabel}>Conditions:</span> {teacher.conditions.join(' ')}
        </p>

        {!showMore ? (
          <button className={styles.readMore} onClick={() => setShowMore(true)}>
            Read more
          </button>
        ) : (
          <div className={styles.more}>
            <p className={styles.experience}>{teacher.experience}</p>

            <ul className={styles.reviews}>
              {teacher.reviews.map((review, i) => (
                <li key={i} className={styles.review}>
                  <div className={styles.reviewHead}>
                    <div className={styles.reviewerAvatar}>{review.reviewer_name.charAt(0)}</div>
                    <div>
                      <p className={styles.reviewerName}>{review.reviewer_name}</p>
                      <p className={styles.reviewRating}>
                        <Icon name="icon-star" width={16} height={16} />{' '}
                        {review.reviewer_rating.toFixed(1)}
                      </p>
                    </div>
                  </div>
                  <p className={styles.reviewComment}>{review.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <ul className={styles.levels}>
          {teacher.levels.map(level => (
            <li key={level} className={styles.level}>
              #{level}
            </li>
          ))}
        </ul>

        {showMore && (
          <button className={styles.bookBtn} onClick={() => setIsModalOpen(true)}>
            Book trial lesson
          </button>
        )}

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <BookTrialForm
              teacherName={`${teacher.name} ${teacher.surname}`}
              teacherAvatar={teacher.avatar_url}
              onClose={() => {
                setIsModalOpen(false);
              }}
            />
          </Modal>
        )}
      </div>
    </article>
  );
}
