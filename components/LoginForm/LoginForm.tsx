"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUser } from "@/lib/firebase";
import css from "./LoginForm.module.css";

interface LoginFormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface LoginFormProps {
  onClose: () => void;
}

export default function LoginForm({ onClose }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginUser(data.email, data.password);
      reset();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.title}>Log In</h2>
      <p className={css.subtitle}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a teacher.
      </p>

      <div className={css.fields}>
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
        Log In
      </button>
    </form>
  );
}