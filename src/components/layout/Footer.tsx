'use client';

import React from 'react';
import Link from 'next/link';
import { Feather, Heart, Globe, Sparkles, ShieldCheck } from 'lucide-react';
import { GENRES } from '@/data/genres';

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/40 text-ink-600 dark:text-ink-400 text-xs">
      {/* Top Banner Stats */}
      <div className="border-b border-border/40 py-6 bg-ink-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-serif text-2xl font-bold text-amber-500">70</div>
            <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-0.5">Original Stories</div>
          </div>
          <div>
            <div className="font-serif text-2xl font-bold text-amber-500">210+</div>
            <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-0.5">Chapters Available</div>
          </div>
          <div>
            <div className="font-serif text-2xl font-bold text-amber-500">12</div>
            <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-0.5">Curated Genres</div>
          </div>
          <div>
            <div className="font-serif text-2xl font-bold text-amber-500">100k+</div>
            <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-0.5">Literary Community</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-ink-950 shadow-sm">
                <Feather className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-lg font-bold tracking-wider text-ink-900 dark:text-ink-100">
                VELUMBRA
              </span>
            </Link>
            <p className="text-xs text-ink-500 leading-relaxed max-w-sm">
              An editorial literary sanctuary for dedicated readers and visionary storytellers. 
              Immerse yourself in chapter-by-chapter prose, engage with original authors, and craft your own narrative universe.
            </p>
            <div className="flex items-center gap-3 text-ink-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Editorial Quality Assured
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Original Fiction
              </span>
            </div>
          </div>

          {/* Genres */}
          <div>
            <h4 className="font-serif font-bold text-ink-900 dark:text-ink-100 mb-3 text-sm">
              Genres
            </h4>
            <ul className="space-y-2">
              {GENRES.slice(0, 6).map((g) => (
                <li key={g.id}>
                  <Link
                    href={`/browse?genre=${encodeURIComponent(g.name)}`}
                    className="hover:text-amber-500 transition-colors"
                  >
                    {g.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-ink-900 dark:text-ink-100 mb-3 text-sm">
              More Categories
            </h4>
            <ul className="space-y-2">
              {GENRES.slice(6, 12).map((g) => (
                <li key={g.id}>
                  <Link
                    href={`/browse?genre=${encodeURIComponent(g.name)}`}
                    className="hover:text-amber-500 transition-colors"
                  >
                    {g.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links & Studio */}
          <div>
            <h4 className="font-serif font-bold text-ink-900 dark:text-ink-100 mb-3 text-sm">
              Writers & Readers
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/studio" className="hover:text-amber-500 transition-colors">
                  Author Studio
                </Link>
              </li>
              <li>
                <Link href="/author/dashboard" className="hover:text-amber-500 transition-colors">
                  Author Analytics
                </Link>
              </li>
              <li>
                <Link href="/library" className="hover:text-amber-500 transition-colors">
                  Personal Library
                </Link>
              </li>
              <li>
                <Link href="/browse" className="hover:text-amber-500 transition-colors">
                  Story Explorer
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-500 transition-colors">
                  Curator / Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-ink-500">
          <div className="flex items-center gap-2">
            <span>© 2026 Velumbra Inc. All stories are original fictional works.</span>
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <Link href="/browse" className="hover:text-amber-500">Terms of Reading</Link>
            <Link href="/browse" className="hover:text-amber-500">Privacy Policy</Link>
            <Link href="/community" className="hover:text-amber-500">Content Guidelines</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
