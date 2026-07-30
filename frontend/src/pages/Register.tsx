import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AlertCircle, ArrowRight, Sparkles, Loader2 } from 'lucide-react';

import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { PasswordInput } from '../components/auth/PasswordInput';
import { PasswordStrengthMeter } from '../components/auth/PasswordStrengthMeter';
import { useAuth } from '../context/AuthContext';
import { authService, extractAuthError } from '../services/auth.service';

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const onSubmit = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      const data = await authService.register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
      });
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
          Create your account
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Already have a profile?{' '}
          <Link
            to="/login"
            className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Sign in
          </Link>
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
              minLength: { value: 4, message: 'Password must be at least 4 characters.' },
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
        <p className="text-xs text-slate-500 leading-relaxed font-medium">
          By creating an account, you agree to our{' '}
          <a
            href="#"
            className="font-bold text-slate-700 hover:underline underline-offset-2"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href="#"
            className="font-bold text-slate-700 hover:underline underline-offset-2"
          >
            Privacy Policy
          </a>
          .
        </p>

        {/* Submit */}
        <Button
          type="submit"
          id="register-submit"
          className="w-full py-3 group bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl shadow-xs cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Creating account…
            </span>
          ) : (
            <span className="flex items-center justify-center gap-1">
              Create account & launch dashboard <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default Register;
