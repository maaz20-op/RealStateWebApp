import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthCard from "../components/common/AuthCard";
import Field from "../components/common/Field";
import Button from "../components/common/Button";
import { useSignupMutation } from "../services/authApi";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../components/common/Toast";
import { getErrorMessage } from "../utils/format";

export default function Signup() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [signup, { isLoading }] = useSignupMutation();
  const [error, setError] = useState("");
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  if (user) return <Navigate to="/" replace />;

  const onSubmit = async ({ name, email, password }) => {
    setError("");
    try { await signup({ name, email, password }).unwrap(); toast.success("Account created"); navigate("/"); }
    catch (e) { setError(getErrorMessage(e, "We couldn't create your account.")); }
  };
  return (
    <AuthCard title="Create an account" text="Save your details to contact us faster." footer={<>Already registered? <Link to="/login" className="font-semibold text-accent">Log in</Link></>}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {error && <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
        <Field label="Full name" autoComplete="name" error={errors.name?.message} {...register("name", { required: "Enter your full name", minLength: { value: 2, message: "Name is too short" } })} />
        <Field label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email", { required: "Enter your email", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" } })} />
        <Field label="Password" type="password" autoComplete="new-password" error={errors.password?.message} {...register("password", { required: "Choose a password", minLength: { value: 8, message: "Use at least 8 characters" } })} />
        <Field label="Confirm password" type="password" autoComplete="new-password" error={errors.confirm?.message} {...register("confirm", { required: "Confirm your password", validate: (v) => v === watch("password") || "Passwords do not match" })} />
        <Button type="submit" disabled={isLoading} className="w-full">{isLoading ? "Creating account…" : "Create account"}</Button>
      </form>
    </AuthCard>
  );
}
