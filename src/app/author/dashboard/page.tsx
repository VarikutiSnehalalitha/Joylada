'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  BarChart3,
  BookOpen,
  Heart,
  MessageSquare,
  Users,
  TrendingUp,
  Clock,
  Sparkles,
  PenTool,
  ArrowUpRight,
  Eye,
  CheckCircle2
} from 'lucide-react';

export default function AuthorDashboardPage() {
  const { currentUser, stories } = useApp();

  // Find authored stories
  const authoredStories = stories.filter(
    (s) => s.authorId === currentUser.id || s.author.username === currentUser.username
  );

  // If the logged-in demo user hasn't authored many, let's include Julian Cross's works or all user works for high-richness preview
  const displayStories = authoredStories.length > 0 ? authoredStories : stories.slice(0, 5);

  const totalReads = displayStories.reduce((acc, s) => acc + s.reads, 0);
  const totalLikes = displayStories.reduce((acc, s) => acc + s.likes, 0);
  const totalComments = displayStories.reduce((acc, s) => acc + s.commentsCount, 0);
  const totalChapters = displayStories.reduce((acc, s) => acc + s.chapterCount, 0);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toLocaleString();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/40">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Author Intelligence</span>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
            Author Analytics & Reach
          </h1>
          <p className="text-xs sm:text-sm text-ink-500 mt-1">
            Track engagement, chapter retention, and reader commentary across your serials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/studio"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 text-ink-950 hover:bg-amber-400 flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <PenTool className="w-4 h-4" />
            <span>Open Studio</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-border/60 bg-card/70 space-y-2">
          <div className="flex items-center justify-between text-ink-500 text-xs">
            <span>Total Reads</span>
            <BookOpen className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-ink-900 dark:text-ink-100">
            {formatNumber(totalReads)}
          </div>
          <div className="text-[11px] text-emerald-500 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14.2% this month
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-border/60 bg-card/70 space-y-2">
          <div className="flex items-center justify-between text-ink-500 text-xs">
            <span>Author Followers</span>
            <Users className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-ink-900 dark:text-ink-100">
            {formatNumber(currentUser.followersCount || 28900)}
          </div>
          <div className="text-[11px] text-emerald-500 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +420 new followers
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-border/60 bg-card/70 space-y-2">
          <div className="flex items-center justify-between text-ink-500 text-xs">
            <span>Story Endorsements (Likes)</span>
            <Heart className="w-4 h-4 text-rose-500" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-ink-900 dark:text-ink-100">
            {formatNumber(totalLikes)}
          </div>
          <div className="text-[11px] text-emerald-500 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> 89% positive sentiment
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-border/60 bg-card/70 space-y-2">
          <div className="flex items-center justify-between text-ink-500 text-xs">
            <span>Literary Comments</span>
            <MessageSquare className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-ink-900 dark:text-ink-100">
            {formatNumber(totalComments)}
          </div>
          <div className="text-[11px] text-amber-500 flex items-center gap-1">
            Active Discussions
          </div>
        </div>
      </div>

      {/* Story Performance Breakdown Table */}
      <div className="p-6 rounded-2xl border border-border/70 bg-card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-ink-900 dark:text-ink-100">
            Manuscript Performance
          </h2>
          <span className="text-xs text-ink-400">{displayStories.length} stories cataloged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/60 text-ink-400">
                <th className="pb-3 font-semibold">Story Title</th>
                <th className="pb-3 font-semibold">Genre</th>
                <th className="pb-3 font-semibold">Chapters</th>
                <th className="pb-3 font-semibold">Reads</th>
                <th className="pb-3 font-semibold">Likes</th>
                <th className="pb-3 font-semibold">Comments</th>
                <th className="pb-3 font-semibold">Est. Completion</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {displayStories.map((s) => (
                <tr key={s.id} className="hover:bg-ink-100/40 dark:hover:bg-ink-900/40 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={s.coverImage}
                        alt={s.title}
                        className="w-8 h-12 rounded object-cover book-shadow-light"
                      />
                      <div>
                        <Link
                          href={`/story/${s.slug}`}
                          className="font-serif font-bold text-ink-900 dark:text-ink-100 hover:text-amber-500 transition-colors"
                        >
                          {s.title}
                        </Link>
                        <div className="text-[10px] text-ink-400 capitalize">{s.status}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 font-medium text-amber-500">{s.genre}</td>
                  <td className="py-3 pr-4">{s.chapterCount}</td>
                  <td className="py-3 pr-4 font-medium">{formatNumber(s.reads)}</td>
                  <td className="py-3 pr-4">{formatNumber(s.likes)}</td>
                  <td className="py-3 pr-4">{formatNumber(s.commentsCount)}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-ink-200 dark:bg-ink-800 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '84%' }} />
                      </div>
                      <span className="text-[10px] text-emerald-500 font-semibold">84%</span>
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      href={`/story/${s.slug}`}
                      className="px-2.5 py-1 rounded-lg border border-border/70 hover:bg-card text-ink-600 dark:text-ink-300 font-medium transition-colors"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reader Retention & Dropoff Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-border/70 bg-card space-y-4">
          <h3 className="font-serif font-bold text-base text-ink-900 dark:text-ink-100">
            Chapter Retention Curve
          </h3>
          <p className="text-xs text-ink-500">
            Average reader continuation rate from Chapter 1 to final published chapters.
          </p>

          <div className="space-y-3 pt-2">
            {[
              { chapter: 'Chapter 1: The Opening Threshold', retention: 100, readers: '45,200 reads' },
              { chapter: 'Chapter 2: The Deepening Conflict', retention: 86, readers: '38,870 reads' },
              { chapter: 'Chapter 3: The Climax / Turning Point', retention: 79, readers: '35,700 reads' },
            ].map((item) => (
              <div key={item.chapter} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-ink-800 dark:text-ink-200">{item.chapter}</span>
                  <span className="text-amber-500 font-bold">{item.retention}% ({item.readers})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-ink-200 dark:bg-ink-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full"
                    style={{ width: `${item.retention}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reader Activity Feed */}
        <div className="p-6 rounded-2xl border border-border/70 bg-card space-y-4">
          <h3 className="font-serif font-bold text-base text-ink-900 dark:text-ink-100">
            Recent Reader Interactions
          </h3>
          <p className="text-xs text-ink-500">
            Real-time likes, follows, and commentary on your manuscripts.
          </p>

          <div className="space-y-3 pt-2 text-xs">
            {[
              {
                user: 'Elena Vance',
                action: 'commented on Chapter 2 of "The Crown of Pale Ash"',
                time: '12m ago',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
              },
              {
                user: 'Arthur Pendleton',
                action: 'added "Letters from the Orchard" to their reading list',
                time: '45m ago',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80'
              },
              {
                user: 'Mira Chen',
                action: 'started following your author profile',
                time: '2h ago',
                avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80'
              }
            ].map((act, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-ink-100/50 dark:bg-ink-900/50">
                <img src={act.avatar} alt={act.user} className="w-7 h-7 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <span className="font-bold text-ink-900 dark:text-ink-100">{act.user}</span>{' '}
                  <span className="text-ink-600 dark:text-ink-400">{act.action}</span>
                </div>
                <span className="text-[10px] text-ink-400 shrink-0">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
