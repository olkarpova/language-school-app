'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import css from './BookTrialForm.module.css';
import Image from 'next/image';

interface BookTrialFormData {
  reason: string;
  name: string;
  email: string;
  phone: string;
}

const schema = yup.object().shape({
  reason: yup.string().required('Please choose a reason'),
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
});

interface BookTrialFormProps {
  teacherName: string;
  teacherAvatar: string;
  onClose: () => void;
}

export default function BookTrialForm({ teacherName, teacherAvatar, onClose }: BookTrialFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookTrialFormData>({
    resolver: yupResolver(schema),
  });

    const onSubmit = () => {
        alert("Thank you! We will contact you soon.");
      reset();
      onClose();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.title}>Book trial lesson</h2>
      <p className={css.subtitle}>
        Our experienced tutor will assess your current language level, discuss your learning goals,
        and tailor the lesson to your specific needs.
      </p>

      <div className={css.teacher}>
        <Image
          src={teacherAvatar}
          alt={teacherName}
          width={44}
          height={44}
          className={css.teacherAvatar}
        />
        <div className={css.teacherInfo}>
          <span className={css.teacherLabel}>Your teacher</span>
          <span className={css.teacherName}>{teacherName}</span>
        </div>
      </div>

      <h3 className={css.question}>What is your main reason for learning English?</h3>

      <div className={css.radioGroup}>
        <label className={css.radioLabel}>
          <input type="radio" value="Career and business" {...register('reason')} />
          Career and business
        </label>
        <label className={css.radioLabel}>
          <input type="radio" value="Lesson for kids" {...register('reason')} />
          Lesson for kids
        </label>
        <label className={css.radioLabel}>
          <input type="radio" value="Living abroad" {...register('reason')} />
          Living abroad
        </label>
        <label className={css.radioLabel}>
          <input type="radio" value="Exams and coursework" {...register('reason')} />
          Exams and coursework
        </label>
        <label className={css.radioLabel}>
          <input type="radio" value="Culture, travel or hobby" {...register('reason')} />
          Culture, travel or hobby
        </label>
      </div>
      {errors.reason && <span className={css.error}>{errors.reason.message}</span>}

      <div className={css.fields}>
        <div className={css.field}>
          <input className={css.input} type="text" placeholder="Full Name" {...register('name')} />
          {errors.name && <span className={css.error}>{errors.name.message}</span>}
        </div>

        <div className={css.field}>
          <input className={css.input} type="email" placeholder="Email" {...register('email')} />
          {errors.email && <span className={css.error}>{errors.email.message}</span>}
        </div>

        <div className={css.field}>
          <input
            className={css.input}
            type="tel"
            placeholder="Phone number"
            {...register('phone')}
          />
          {errors.phone && <span className={css.error}>{errors.phone.message}</span>}
        </div>
      </div>

      <button type="submit" className={css.submitBtn}>
        Book
      </button>
    </form>
  );
}
