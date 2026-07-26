import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { PasswordInput } from '../components/auth/PasswordInput';
import { RememberMeCheckbox } from '../components/auth/RememberMeCheckbox';
import { useAuth } from '../context/AuthContext';
import { authService, extractAuthError } from '../services/auth.service';

// ─── Form shape ────────────────────────────────────────────────────────────────
interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

// ─── Component ─────────────────────────────────────────────────────────────────
export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = 'Sign In | CareerPilot';
    return () => { document.title = 'CareerPilot'; };
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const loginMutation = useMutation({
    mutationFn: (values: LoginFormValues) =>
      authService.login({ email: values.email, password: values.password }),
    onSuccess: (data) => {
      login(data.token, data.user);
      navigate('/dashboard', { replace: true });
    },
    onError: (err: unknown) => {
      setError('root', { message: extractAuthError(err) });
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

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
          Welcome back
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Sign in to continue to your career workspace.
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
        {/* Email */}
        <div>
          <Input
            id="login-email"
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

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Password
            </label>
            <a
              href="#"
              className="text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors"
              tabIndex={-1}
            >
              Forgot password?
            </a>
          </div>
          <PasswordInput
            id="login-password"
            autoComplete="current-password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required.',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters.',
              },
            })}
          />
        </div>

        {/* Remember me */}
        <div className="flex items-center justify-between pt-0.5">
          <RememberMeCheckbox registration={register('rememberMe')} />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          id="login-submit"
          className="w-full py-2.5 mt-1 group"
          isLoading={loginMutation.isPending}
        >
          Sign in
          {!loginMutation.isPending && (
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-600">
        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        <span className="shrink-0">Don't have an account?</span>
        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* Register link */}
      <Link
        to="/register"
        id="go-to-register"
        className="flex items-center justify-center gap-2 w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
      >
        Create a free account
      </Link>
    </div>
  );
};

export default Login;
