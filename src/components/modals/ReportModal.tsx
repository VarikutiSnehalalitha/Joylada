'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ReportTargetType } from '@/types';
import { AlertTriangle, X, Check } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: ReportTargetType;
  targetId: string;
  targetTitle: string;
}

const REPORT_REASONS = [
  'Inappropriate or explicit content without warning',
  'Plagiarism or copyright violation',
  'Harassment or hate speech',
  'Spam or deceptive links',
  'Misleading genre or tags',
  'Other policy violation'
];

export default function ReportModal({
  isOpen,
  onClose,
  targetType,
  targetId,
  targetTitle
}: ReportModalProps) {
  const { currentUser, submitReport } = useApp();
  const [reason, setReason] = useState(REPORT_REASONS[0]);
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport({
      targetType,
      targetId,
      targetTitle,
      reason,
      details,
      reportedBy: currentUser.username
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-2xl border border-border/80 p-5 shadow-elevated animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div className="flex items-center gap-2 text-rose-500">
            <AlertTriangle className="w-4 h-4" />
            <h3 className="font-serif font-bold text-base text-ink-900 dark:text-ink-50">
              Report Content
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-ink-400 hover:text-ink-900 dark:hover:text-ink-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-2">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-base text-ink-900 dark:text-ink-100">
              Report Submitted
            </h4>
            <p className="text-xs text-ink-500 max-w-xs mx-auto">
              Thank you for keeping Velumbra safe. Our editorial moderation team will review this shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <span className="text-[11px] text-ink-500 block mb-1">Target:</span>
              <div className="p-2.5 rounded-lg bg-ink-100/60 dark:bg-ink-900/60 border border-border/50 text-xs text-ink-700 dark:text-ink-300 font-medium truncate">
                <span className="capitalize font-bold text-amber-500 mr-1.5">[{targetType}]</span>
                {targetTitle}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-700 dark:text-ink-300 mb-1">
                Reason for report
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-ink-100/70 dark:bg-ink-900/70 border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500"
              >
                {REPORT_REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-700 dark:text-ink-300 mb-1">
                Additional context (optional)
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe where the issue occurs or why it violates guidelines..."
                rows={3}
                className="w-full px-3 py-2 text-xs rounded-xl bg-ink-100/70 dark:bg-ink-900/70 border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500 placeholder:text-ink-400 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/40">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 text-xs text-ink-500 hover:text-ink-900 dark:hover:text-ink-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-rose-600 text-white hover:bg-rose-500 transition-colors shadow-sm"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
