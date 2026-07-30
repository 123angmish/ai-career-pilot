import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AlertCircle, ArrowRight, Sparkles, Loader2 } from 'lucide-react';

import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { PasswordInput } from '../components/auth/PasswordInput';
import { RememberMeCheckbox } from '../components/auth/RememberMeCheckbox';
import { useAuth } from '../context/AuthContext';
import { authService, extractAuthError } from '../services/auth.service';

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const data = await authService.login({ email: values.email, password: values.password });
      login(data.token, data.user);
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      setError('root', { message: extractAuthError(err) });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6 select-none">
      {/* Header */}
      <div className="space-y-1">
        {/* Mobile-only brand mark */}
        <div className="flex lg:hidden items-center gap-2 mb-6">
          <div className="flex items-center justify-center h-9 w-9 rounded-2xl bg-indigo-600 text-white shrink-0 shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-extrabold text-slate-900 text-lg tracking-tight font-display">
            CareerPilot
          </span>
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-display">
          Welcome back
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Sign in to continue to your career workspace.
        </p>
      </div>

      {/* Root / API error banner */}
      {errors.root && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-xs font-bold text-rose-800 animate-in fade-in duration-150"
        >
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-600" />
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
              className="block text-xs font-bold text-slate-700"
            >
              Password
            </label>
            <a
              href="#"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
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
                value: 4,
                message: 'Password must be at least 4 characters.',
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
          className="w-full py-3 mt-1 group bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl shadow-xs cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
            </span>
          ) : (
            <span className="flex items-center justify-center gap-1">
              Sign in <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center gap-3 text-xs text-slate-400 font-medium">
        <div className="h-px flex-1 bg-slate-100" />
        <span className="shrink-0">Don't have an account?</span>
        <div className="h-px flex-1 bg-slate-100" />
      </div>

      {/* Register link */}
      <Link
        to="/register"
        id="go-to-register"
        className="flex items-center justify-center gap-2 w-full rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-extrabold py-3 transition-colors cursor-pointer"
      >
        Create a free account
      </Link>
    </div>
  );
};

export default Login;
