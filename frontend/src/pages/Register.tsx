import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { AlertCircle, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { PasswordInput } from '../components/auth/PasswordInput';
import { PasswordStrengthMeter } from '../components/auth/PasswordStrengthMeter';
import { authService, extractAuthError } from '../services/auth.service';

// ─── Form shape ────────────────────────────────────────────────────────────────
interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

// ─── Component ─────────────────────────────────────────────────────────────────
export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);

  React.useEffect(() => {
    document.title = 'Create Account | CareerPilot';
    return () => { document.title = 'CareerPilot'; };
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
    },
  });

  const watchedPassword = watch('password');

  const registerMutation = useMutation({
    mutationFn: (values: RegisterFormValues) =>
      authService.register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
      }),
    onSuccess: () => {
      // ✔ Do NOT auto-login. Show success message, then redirect to Login.
      setRegistered(true);
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1800);
    },
    onError: (err: unknown) => {
      setError('root', { message: extractAuthError(err) });
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    registerMutation.mutate(values);
  };

  // ── Success state ────────────────────────────────────────────────────────────
  if (registered) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4 animate-in fade-in duration-300">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Account created!</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Redirecting you to sign in…
          </p>
        </div>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-7 select-none">
      {/* Header */}
      <div className="space-y-1">
        {/* Mobile-only brand mark */}
        <div className="flex lg:hidden items-center gap-2 mb-6">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-brand-600 text-white shrink-0">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-bold text-zinc-900 dark:text-zinc-50 text-lg tracking-tight">
            CareerPilot
          </span>
        </div>

        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Create your account
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Already have a profile?{' '}
          <Link
            to="/login"
            className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Root / API error banner */}
      {errors.root && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-lg border border-red-200 dark:border-red-800/60 bg-red-50 dark:bg-red-950/40 px-3.5 py-3 text-sm text-red-700 dark:text-red-400 animate-in fade-in duration-150"
        >
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{errors.root.message}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Name row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input
              id="reg-first-name"
              label="First name"
              placeholder="John"
              autoComplete="given-name"
              error={errors.firstName?.message}
              {...register('firstName', {
                required: 'First name is required.',
                minLength: { value: 2, message: 'At least 2 characters.' },
              })}
            />
          </div>
          <div>
            <Input
              id="reg-last-name"
              label="Last name"
              placeholder="Doe"
              autoComplete="family-name"
              error={errors.lastName?.message}
              {...register('lastName', {
                required: 'Last name is required.',
                minLength: { value: 2, message: 'At least 2 characters.' },
              })}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <Input
            id="reg-email"
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address.',
              },
            })}
          />
        </div>

        {/* Phone number */}
        <div>
          <Input
            id="reg-phone-number"
            label="Phone number"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (555) 000-0000"
            error={errors.phoneNumber?.message}
            {...register('phoneNumber', {
              required: 'Phone number is required.',
              pattern: {
                value: /^\+?[0-9\s\-()]{7,20}$/,
                message: 'Enter a valid phone number.',
              },
            })}
          />
        </div>

        {/* Password + strength meter */}
        <div>
          <PasswordInput
            id="reg-password"
            label="Password"
            autoComplete="new-password"
            placeholder="Create a strong password"
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required.',
              minLength: { value: 8, message: 'Password must be at least 8 characters.' },
            })}
          />
          <PasswordStrengthMeter password={watchedPassword} />
        </div>

        {/* Confirm password */}
        <div>
          <PasswordInput
            id="reg-confirm-password"
            label="Confirm password"
            autoComplete="new-password"
            placeholder="Repeat your password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Please confirm your password.',
              validate: (val) =>
                val === watchedPassword || 'Passwords do not match.',
            })}
          />
        </div>

        {/* Terms */}
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          By creating an account, you agree to our{' '}
          <a
            href="#"
            className="font-medium text-zinc-700 dark:text-zinc-300 hover:underline underline-offset-2"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href="#"
            className="font-medium text-zinc-700 dark:text-zinc-300 hover:underline underline-offset-2"
          >
            Privacy Policy
          </a>
          .
        </p>

        {/* Submit */}
        <Button
          type="submit"
          id="register-submit"
          className="w-full py-2.5 group"
          isLoading={registerMutation.isPending}
        >
          Create account
          {!registerMutation.isPending && (
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default Register;
