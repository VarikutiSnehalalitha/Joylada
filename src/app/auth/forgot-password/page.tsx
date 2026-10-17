'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Feather, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
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
            Reset Password
          </h2>
          <p className="text-xs text-ink-500">
            Enter your email to receive recovery instructions.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h4 className="font-serif font-bold text-sm text-ink-900 dark:text-ink-100">
              Reset Link Dispatched
            </h4>
            <p className="text-xs text-ink-600 dark:text-ink-300">
              We've dispatched recovery steps to <strong>{email}</strong>. Please check your inbox.
            </p>
            <div className="pt-2">
              <Link
                href="/auth/login"
                className="text-xs font-semibold text-amber-500 hover:underline"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-ink-700 dark:text-ink-300 mb-1">
                Registered Email
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

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-semibold bg-amber-500 text-ink-950 hover:bg-amber-400 transition-colors shadow-sm"
            >
              Send Reset Instructions
            </button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-border/40">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 text-xs text-ink-500 hover:text-ink-900 dark:hover:text-ink-100"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
