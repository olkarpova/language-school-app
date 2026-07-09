"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser } from "@/lib/firebase";
import css from "./RegisterForm.module.css";
import { useAuth } from "../AuthProvider/AuthProvider";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface RegisterFormProps {
  onClose: () => void;
}

export default function RegisterForm({ onClose }: RegisterFormProps) {
    const { refreshUser } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
        await registerUser(data.name, data.email, data.password);
        await refreshUser();
      reset();
      onClose();
    } catch {
      alert("Registration failed. This email may already be in use.");
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.title}>Registration</h2>
      <p className={css.subtitle}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>

      <div className={css.fields}>
        <div className={css.field}>
          <input
            className={css.input}
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && <span className={css.error}>{errors.name.message}</span>}
        </div>

        <div className={css.field}>
          <input
            className={css.input}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <span className={css.error}>{errors.email.message}</span>}
        </div>

        <div className={css.field}>
          <input
            className={css.input}
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && <span className={css.error}>{errors.password.message}</span>}
        </div>
      </div>

      <button type="submit" className={css.submitBtn}>
        Sign Up
      </button>
    </form>
  );
}