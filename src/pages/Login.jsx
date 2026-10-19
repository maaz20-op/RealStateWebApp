import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthCard from "../components/common/AuthCard";
import Field from "../components/common/Field";
import Button from "../components/common/Button";
import { useLoginMutation } from "../services/authApi";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../components/common/Toast";
import { getErrorMessage } from "../utils/format";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState("");
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const from = useLocation().state?.from || "/";
  if (user) return <Navigate to={from} replace />;

  const onSubmit = async (values) => {
    setError("");
    try { await login(values).unwrap(); toast.success("Welcome back"); navigate(from, { replace: true }); }
    catch (e) { setError(getErrorMessage(e, "Login failed. Check your email and password.")); }
  };
  return (
    <AuthCard title="Log in" text="Access your account." footer={<>New here? <Link to="/signup" className="font-semibold text-accent">Create an account</Link></>}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {error && <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
        <Field label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email", { required: "Enter your email", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" } })} />
        <Field label="Password" type="password" autoComplete="current-password" error={errors.password?.message} {...register("password", { required: "Enter your password" })} />
        <Button type="submit" disabled={isLoading} className="w-full">{isLoading ? "Logging in…" : "Log in"}</Button>
      </form>
    </AuthCard>
  );
}
