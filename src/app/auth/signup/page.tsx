'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Feather, Lock, Mail, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const { switchUser } = useApp();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate user creation and login
    switchUser('reader');
    router.push('/discover');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
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
            Create Your Account
          </h2>
          <p className="text-xs text-ink-500">
            Join a distinguished community of readers and storytellers.
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-ink-700 dark:text-ink-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-ink-400 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Elena Vance"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-ink-100/70 dark:bg-ink-900/70 border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-ink-700 dark:text-ink-300 mb-1">
              Username
            </label>
            <div className="relative">
              <span className="text-ink-400 absolute left-3 top-2 font-bold">@</span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="elena_vance"
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-ink-100/70 dark:bg-ink-900/70 border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

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
                placeholder="elena@example.com"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-ink-100/70 dark:bg-ink-900/70 border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-ink-700 dark:text-ink-300 mb-1">
              Password
            </label>
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
            <span>Create Account</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="text-center text-xs text-ink-500 pt-2 border-t border-border/40">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
