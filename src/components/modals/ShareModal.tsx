'use client';

import React, { useState } from 'react';
import { Story } from '@/types';
import { X, Copy, Check, Twitter, Send, Share2, Code } from 'lucide-react';

interface ShareModalProps {
  story: Story;
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({ story, isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const storyUrl = typeof window !== 'undefined' ? `${window.location.origin}/story/${story.slug}` : `https://velumbra.com/story/${story.slug}`;

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(storyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareTwitter = () => {
    const text = encodeURIComponent(`Reading "${story.title}" by ${story.author.name} on @Velumbra. Highly recommended!`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(storyUrl)}`, '_blank');
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`Check out this story on Velumbra: "${story.title}" - ${storyUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-2xl border border-border/80 p-5 shadow-elevated animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-amber-500" />
            <h3 className="font-serif font-bold text-base text-ink-900 dark:text-ink-50">
              Share Story
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-ink-400 hover:text-ink-900 dark:hover:text-ink-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-ink-100/50 dark:bg-ink-900/50 border border-border/50">
          <img
            src={story.coverImage}
            alt={story.title}
            className="w-12 h-16 rounded object-cover book-shadow-light"
          />
          <div className="min-w-0 flex-1">
            <h4 className="font-serif font-bold text-sm text-ink-900 dark:text-ink-100 truncate">
              {story.title}
            </h4>
            <p className="text-xs text-ink-500 truncate">By {story.author.name}</p>
            <span className="inline-block mt-1 text-[10px] text-amber-600 dark:text-amber-400 font-medium">
              {story.genre} · {story.chapterCount} chapters
            </span>
          </div>
        </div>

        {/* Copy Link input */}
        <div className="mt-4">
          <label className="block text-xs font-medium text-ink-600 dark:text-ink-300 mb-1.5">
            Story Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={storyUrl}
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-ink-100/80 dark:bg-ink-900/80 border border-border text-ink-600 dark:text-ink-300 select-all focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-500 text-ink-950 hover:bg-amber-400'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <button
            onClick={shareTwitter}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-border/70 hover:bg-ink-100 dark:hover:bg-ink-900 text-xs font-medium text-ink-800 dark:text-ink-200 transition-colors"
          >
            <Twitter className="w-4 h-4 text-sky-400" />
            <span>Share on X</span>
          </button>
          <button
            onClick={shareWhatsApp}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-border/70 hover:bg-ink-100 dark:hover:bg-ink-900 text-xs font-medium text-ink-800 dark:text-ink-200 transition-colors"
          >
            <Send className="w-4 h-4 text-emerald-500" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
