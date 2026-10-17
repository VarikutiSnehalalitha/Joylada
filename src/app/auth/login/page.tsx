'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Feather, Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { switchUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your email and password.');
      return;
    }
    // Authenticate and redirect
    switchUser('reader');
    router.push('/discover');
  };

  const handlePersonaLogin = (role: 'reader' | 'author' | 'admin') => {
    switchUser(role);
    router.push('/discover');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-card rounded-3xl border border-border/80 p-8 shadow-elevated space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-ink-950 shadow-sm">
              <Feather className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-wider text-ink-900 dark:text-ink-50">
              VELUMBRA
            </span>
          </Link>
          <h2 className="font-serif text-2xl font-bold text-ink-900 dark:text-ink-50">
            Welcome Back
          </h2>
          <p className="text-xs text-ink-500">
            Enter your credentials or choose a demo persona to explore.
          </p>
        </div>

        {/* Quick Demo Persona Switch Buttons */}
        <div className="p-3 rounded-2xl bg-ink-100/60 dark:bg-ink-900/60 border border-border/50 space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-500 text-center">
            Instant Demo Sign In:
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => handlePersonaLogin('reader')}
              className="py-1.5 px-2 rounded-xl text-xs font-semibold bg-card border border-border/70 hover:border-amber-500 transition-colors text-ink-800 dark:text-ink-200"
            >
              Reader
            </button>
            <button
              onClick={() => handlePersonaLogin('author')}
              className="py-1.5 px-2 rounded-xl text-xs font-semibold bg-card border border-border/70 hover:border-amber-500 transition-colors text-ink-800 dark:text-ink-200"
            >
              Author
            </button>
            <button
              onClick={() => handlePersonaLogin('admin')}
              className="py-1.5 px-2 rounded-xl text-xs font-semibold bg-card border border-border/70 hover:border-amber-500 transition-colors text-ink-800 dark:text-ink-200"
            >
              Admin
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-500 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-ink-700 dark:text-ink-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-ink-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="reader@velumbra.com"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-ink-100/70 dark:bg-ink-900/70 border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-medium text-ink-700 dark:text-ink-300">
                Password
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-ink-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-ink-100/70 dark:bg-ink-900/70 border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl font-semibold bg-amber-500 text-ink-950 hover:bg-amber-400 transition-colors shadow-sm flex items-center justify-center gap-1.5"
          >
            <span>Sign In</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-center text-xs text-ink-500 pt-2 border-t border-border/40">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
