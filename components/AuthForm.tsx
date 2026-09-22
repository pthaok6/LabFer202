"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthMode = "login" | "register";
type FormValues = { name: string; email: string; password: string; confirmPassword: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = { name: "", email: "", password: "", confirmPassword: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues, mode: AuthMode): FormErrors {
  const errors: FormErrors = {};
  if (mode === "register" && !values.name.trim()) errors.name = "Full name is required";
  if (!values.email.trim()) errors.email = "Email is required";
  else if (!emailPattern.test(values.email.trim())) errors.email = "Please enter a valid email address";
  if (!values.password) errors.password = "Password is required";
  else if (mode === "register" && values.password.length < 6) errors.password = "Password must be at least 6 characters";
  if (mode === "register") {
    if (!values.confirmPassword) errors.confirmPassword = "Confirm password is required";
    else if (values.confirmPassword !== values.password) errors.confirmPassword = "Passwords do not match";
  }
  return errors;
}

export function AuthForm({ mode }: { mode: AuthMode }) {
  const isLogin = mode === "login";
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateField = (field: keyof FormValues, value: string) => {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);
    setSuccess(false);
    if (submitted) setErrors(validate(nextValues, mode));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values, mode);
    const isValid = Object.keys(nextErrors).length === 0;
    setSubmitted(true);
    setErrors(nextErrors);
    setSuccess(isValid);
  };

  const prefix = isLogin ? "login" : "register";

  return (
    <main className="relative min-h-screen overflow-hidden bg-primary px-4 py-5 font-sans text-foreground sm:px-6 sm:py-8">
      <div className="pointer-events-none absolute -left-24 top-16 size-80 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 size-96 rounded-full bg-chart-2/20 blur-3xl" />

      <div className="relative mx-auto min-h-[calc(100vh-40px)] max-w-3xl overflow-hidden rounded-[28px] bg-background shadow-2xl sm:min-h-[calc(100vh-64px)]">
        <section className="flex min-h-[calc(100vh-40px)] min-w-0 flex-col p-5 sm:min-h-[calc(100vh-64px)] sm:p-9 lg:p-12">
          <div className="flex items-center justify-between">
            <Link href="/" className="ml-auto inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"><span aria-hidden="true"></span> Back to shop</Link>
          </div>

          <div className="mx-auto flex w-full max-w-[470px] flex-1 items-center py-10">
            <Card className="w-full border-0 bg-transparent shadow-none">
              <CardHeader className="px-0 pb-8 pt-0">
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-chart-2">{isLogin ? "Welcome back" : "Join the good life"}</p>
                <h1 className="text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">{isLogin ? "Sign in to your account" : "Create your account"}</h1>
                <p className="pt-2 text-sm leading-6 text-muted-foreground">{isLogin ? "Enter your details to continue your considered collection." : "A few details and you’ll be ready to save your favorite finds."}</p>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <form data-testid={`${prefix}-form`} noValidate onSubmit={handleSubmit} className="grid gap-5">
                  {!isLogin && (
                    <div className="grid gap-2">
                      <Label htmlFor="register-name">Full name</Label>
                      <Input id="register-name" name="name" type="text" autoComplete="name" placeholder="Your full name" value={values.name} onChange={(event) => updateField("name", event.target.value)} data-testid="register-name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} className={errors.name ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20" : ""} />
                      {errors.name && <p id="name-error" data-testid="error-name" className="text-xs font-semibold text-destructive">{errors.name}</p>}
                    </div>
                  )}

                  <div className="grid gap-2">
                    <Label htmlFor={`${prefix}-email`}>Email address</Label>
                    <Input id={`${prefix}-email`} name="email" type="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={(event) => updateField("email", event.target.value)} data-testid={`${prefix}-email`} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} className={errors.email ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20" : ""} />
                    {errors.email && <p id="email-error" data-testid="error-email" className="text-xs font-semibold text-destructive">{errors.email}</p>}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor={`${prefix}-password`}>Password</Label>
                    <Input id={`${prefix}-password`} name="password" type="password" autoComplete={isLogin ? "current-password" : "new-password"} placeholder={isLogin ? "Enter your password" : "At least 6 characters"} value={values.password} onChange={(event) => updateField("password", event.target.value)} data-testid={`${prefix}-password`} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? "password-error" : undefined} className={errors.password ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20" : ""} />
                    {errors.password && <p id="password-error" data-testid="error-password" className="text-xs font-semibold text-destructive">{errors.password}</p>}
                  </div>

                  {!isLogin && (
                    <div className="grid gap-2">
                      <Label htmlFor="register-confirm-password">Confirm password</Label>
                      <Input id="register-confirm-password" name="confirmPassword" type="password" autoComplete="new-password" placeholder="Repeat your password" value={values.confirmPassword} onChange={(event) => updateField("confirmPassword", event.target.value)} data-testid="register-confirm-password" aria-invalid={Boolean(errors.confirmPassword)} aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined} className={errors.confirmPassword ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20" : ""} />
                      {errors.confirmPassword && <p id="confirm-password-error" data-testid="error-confirm-password" className="text-xs font-semibold text-destructive">{errors.confirmPassword}</p>}
                    </div>
                  )}

                  {success && <p data-testid="form-success" role="status" className="rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-bold text-primary">{isLogin ? "Login successful (demo)" : "Registration successful (demo)"}</p>}

                  <Button data-testid={`${prefix}-submit`} type="submit" className="mt-1 h-[52px] w-full gap-2">{isLogin ? "Sign in" : "Create account"}<span aria-hidden="true"></span></Button>
                </form>

                <p className="mt-7 text-center text-sm text-muted-foreground">
                  {isLogin ? "New here?" : "Already have an account?"}{" "}
                  <Link href={isLogin ? "/register" : "/login"} className="font-bold text-foreground underline decoration-chart-2 decoration-2 underline-offset-4">{isLogin ? "Create an account" : "Sign in"}</Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
