'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { GENRES } from '@/data/genres';
import {
  Shield,
  AlertTriangle,
  Users,
  BookOpen,
  Award,
  CheckCircle2,
  XCircle,
  Trash2,
  Eye,
  Sliders,
  Flame,
  Search,
  Filter
} from 'lucide-react';

export default function AdminPage() {
  const {
    currentUser,
    stories,
    saveStory,
    deleteStory,
    reports,
    updateReportStatus,
    bannedUsers,
    toggleBanUser
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'stories' | 'users'>('overview');
  const [storySearch, setStorySearch] = useState('');

  // Story filtering
  const filteredStories = stories.filter(
    (s) =>
      s.title.toLowerCase().includes(storySearch.toLowerCase()) ||
      s.author.name.toLowerCase().includes(storySearch.toLowerCase()) ||
      s.genre.toLowerCase().includes(storySearch.toLowerCase())
  );

  const toggleFeatureStory = (storyId: string) => {
    const s = stories.find((item) => item.id === storyId);
    if (s) {
      saveStory({ ...s, isFeatured: !s.isFeatured });
    }
  };

  const toggleTrendingStory = (storyId: string) => {
    const s = stories.find((item) => item.id === storyId);
    if (s) {
      saveStory({ ...s, isTrending: !s.isTrending });
    }
  };

  const toggleEditorPickStory = (storyId: string) => {
    const s = stories.find((item) => item.id === storyId);
    if (s) {
      saveStory({ ...s, isEditorPick: !s.isEditorPick });
    }
  };

  const pendingReports = reports.filter((r) => r.status === 'pending');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/40">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-500 mb-1">
            <Shield className="w-4 h-4" />
            <span>Admin Control Center</span>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
            Platform Moderation & Curation
          </h1>
          <p className="text-xs sm:text-sm text-ink-500 mt-1">
            Review reported items, manage 70 seed stories, feature manuscripts, and maintain platform safety.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-500 font-bold border border-rose-500/30">
            {pendingReports.length} Pending Flags
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border/50 gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3.5 transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'border-rose-500 text-rose-500 font-bold'
              : 'border-transparent text-ink-500 hover:text-ink-900 dark:hover:text-ink-100'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Platform Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`pb-3.5 transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'reports'
              ? 'border-rose-500 text-rose-500 font-bold'
              : 'border-transparent text-ink-500 hover:text-ink-900 dark:hover:text-ink-100'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Moderation Queue ({pendingReports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('stories')}
          className={`pb-3.5 transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'stories'
              ? 'border-rose-500 text-rose-500 font-bold'
              : 'border-transparent text-ink-500 hover:text-ink-900 dark:hover:text-ink-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Story Curation ({stories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3.5 transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'users'
              ? 'border-rose-500 text-rose-500 font-bold'
              : 'border-transparent text-ink-500 hover:text-ink-900 dark:hover:text-ink-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Enforcement</span>
        </button>
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl border border-border/60 bg-card space-y-1">
              <span className="text-xs text-ink-500">Seeded Novels</span>
              <div className="font-serif text-3xl font-bold text-amber-500">70</div>
              <div className="text-[11px] text-emerald-500">100% active and readable</div>
            </div>

            <div className="p-5 rounded-2xl border border-border/60 bg-card space-y-1">
              <span className="text-xs text-ink-500">Published Chapters</span>
              <div className="font-serif text-3xl font-bold text-ink-900 dark:text-ink-100">210+</div>
              <div className="text-[11px] text-ink-400">Original literary prose</div>
            </div>

            <div className="p-5 rounded-2xl border border-border/60 bg-card space-y-1">
              <span className="text-xs text-ink-500">Active Genres</span>
              <div className="font-serif text-3xl font-bold text-ink-900 dark:text-ink-100">12</div>
              <div className="text-[11px] text-ink-400">Balanced distribution</div>
            </div>

            <div className="p-5 rounded-2xl border border-border/60 bg-card space-y-1">
              <span className="text-xs text-ink-500">Pending Reports</span>
              <div className="font-serif text-3xl font-bold text-rose-500">{pendingReports.length}</div>
              <div className="text-[11px] text-rose-500">Requires editorial review</div>
            </div>
          </div>

          {/* Quick Genre Distribution breakdown */}
          <div className="p-6 rounded-2xl border border-border/70 bg-card space-y-4">
            <h3 className="font-serif font-bold text-base text-ink-900 dark:text-ink-100">
              Catalog Genre Balance
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
              {GENRES.map((g) => (
                <div key={g.id} className="p-3 rounded-xl border border-border/50 bg-ink-100/40 dark:bg-ink-900/40 flex justify-between items-center">
                  <span className="font-medium text-ink-800 dark:text-ink-200">{g.name}</span>
                  <span className="px-2 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400">
                    {g.storyCount} stories
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. MODERATION QUEUE TAB */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          {reports.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-border/70 rounded-2xl bg-card/30">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2 opacity-50" />
              <p className="text-xs text-ink-500">Moderation queue is clean. Zero reported items.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="p-5 rounded-2xl border border-border/70 bg-card space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-500/20 text-rose-500">
                        {report.targetType}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-ink-900 dark:text-ink-100">
                        {report.targetTitle}
                      </h4>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase self-start sm:self-auto ${
                        report.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                          : report.status === 'resolved'
                          ? 'bg-emerald-500/20 text-emerald-500'
                          : 'bg-ink-200 dark:bg-ink-800 text-ink-500'
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>

                  <div className="text-xs space-y-1">
                    <div>
                      <strong className="text-ink-700 dark:text-ink-300">Reason: </strong>
                      <span className="text-rose-500 font-medium">{report.reason}</span>
                    </div>
                    {report.details && (
                      <div className="text-ink-500">
                        <strong>Details: </strong> {report.details}
                      </div>
                    )}
                    <div className="text-[10px] text-ink-400">
                      Reported by @{report.reportedBy} · {new Date(report.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {report.status === 'pending' && (
                    <div className="flex items-center gap-2 pt-2 border-t border-border/40 justify-end">
                      <button
                        onClick={() => updateReportStatus(report.id, 'dismissed')}
                        className="px-3 py-1.5 rounded-lg border border-border text-xs text-ink-600 dark:text-ink-400 hover:bg-card"
                      >
                        Dismiss Flag
                      </button>
                      <button
                        onClick={() => updateReportStatus(report.id, 'resolved')}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500"
                      >
                        Resolve & Moderate
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. STORY CURATION TAB */}
      {activeTab === 'stories' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={storySearch}
                onChange={(e) => setStorySearch(e.target.value)}
                placeholder="Filter stories to manage featured, trending, or editorial picks..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-ink-100/70 dark:bg-ink-900/70 border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="divide-y divide-border/40 border border-border/60 rounded-2xl bg-card overflow-hidden">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-ink-100/30 dark:hover:bg-ink-900/30 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-10 h-14 rounded object-cover book-shadow-light shrink-0"
                  />
                  <div className="min-w-0">
                    <Link
                      href={`/story/${story.slug}`}
                      className="font-serif font-bold text-sm text-ink-900 dark:text-ink-100 hover:text-amber-500 transition-colors truncate block"
                    >
                      {story.title}
                    </Link>
                    <div className="text-[11px] text-ink-500">
                      By {story.author.name} · {story.genre} · {story.chapterCount} ch
                    </div>
                  </div>
                </div>

                {/* Curator Badges Toggles */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => toggleEditorPickStory(story.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1 ${
                      story.isEditorPick
                        ? 'bg-amber-500 text-ink-950 border-amber-500'
                        : 'border-border/60 text-ink-500 hover:bg-card'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Pick</span>
                  </button>

                  <button
                    onClick={() => toggleTrendingStory(story.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1 ${
                      story.isTrending
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'border-border/60 text-ink-500 hover:bg-card'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>Trending</span>
                  </button>

                  <Link
                    href={`/story/${story.slug}`}
                    className="p-1.5 rounded-lg border border-border/60 hover:bg-card text-ink-500"
                    title="View"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${story.title}"?`)) {
                        deleteStory(story.id);
                      }
                    }}
                    className="p-1.5 rounded-lg border border-border/60 hover:bg-rose-500/10 hover:text-rose-500 text-ink-400"
                    title="Delete Story"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. USER ENFORCEMENT TAB */}
      {activeTab === 'users' && (
        <div className="p-6 rounded-2xl border border-border/70 bg-card space-y-4">
          <h3 className="font-serif font-bold text-base text-ink-900 dark:text-ink-100">
            User Enforcement & Platform Security
          </h3>
          <p className="text-xs text-ink-500">
            Manage user suspensions, review banned status, or restrict abusive accounts.
          </p>

          <div className="space-y-3 pt-2 text-xs">
            {[
              { id: 'user-bot-99', username: 'spambot_303', name: 'Commercial Scraper', role: 'reader' },
              { id: 'user-flag-1', username: 'troll_user_1', name: 'Repeat Harasser', role: 'reader' },
              { id: 'author-1', username: 'clara_vane', name: 'Clara Vane', role: 'author' }
            ].map((u) => {
              const isBanned = bannedUsers.includes(u.id);
              return (
                <div key={u.id} className="p-3 rounded-xl border border-border/50 bg-ink-100/40 dark:bg-ink-900/40 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-ink-900 dark:text-ink-100">
                      {u.name} <span className="font-normal text-ink-400">(@{u.username})</span>
                    </div>
                    <span className="text-[10px] text-ink-500 capitalize">{u.role}</span>
                  </div>

                  <button
                    onClick={() => toggleBanUser(u.id)}
                    className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors ${
                      isBanned
                        ? 'bg-rose-600 text-white'
                        : 'border border-border/70 hover:bg-rose-500/10 hover:text-rose-500'
                    }`}
                  >
                    {isBanned ? 'Banned (Click to Unban)' : 'Ban User'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
