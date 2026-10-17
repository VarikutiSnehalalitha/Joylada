'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import StoryCarousel from '@/components/story/StoryCarousel';
import StoryCard from '@/components/story/StoryCard';
import { GENRES } from '@/data/genres';
import {
  Compass,
  BookOpen,
  Sparkles,
  Flame,
  Clock,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';

export default function DiscoverPage() {
  const { stories, readingProgress, followedAuthors } = useApp();
  const [selectedGenreTab, setSelectedGenreTab] = useState<string>('All');

  // Find stories that the user has in-progress reading
  const inProgressStoryIds = Object.keys(readingProgress);
  const continueReadingStories = stories
    .filter((s) => inProgressStoryIds.includes(s.id))
    .map((s) => ({
      story: s,
      progress: readingProgress[s.id]
    }));

  // Followed authors stories
  const followedStories = stories.filter((s) => followedAuthors.includes(s.authorId));

  // Dynamic lists
  const trendingToday = stories.filter((s) => s.isTrending).slice(0, 10);
  const popularThisWeek = stories
    .slice()
    .sort((a, b) => b.reads - a.reads)
    .slice(0, 10);
  const newReleases = stories
    .slice()
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 10);
  const recommendedForYou = stories.filter((s) => s.isRecommended).slice(0, 10);

  // Filtered stories for genre tab
  const filteredGenreStories =
    selectedGenreTab === 'All'
      ? stories.slice(0, 12)
      : stories.filter((s) => s.genre.toLowerCase() === selectedGenreTab.toLowerCase()).slice(0, 12);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border/40">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            <Compass className="w-4 h-4" />
            <span>Personalized Feed</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
            Discover Your Next Read
          </h1>
          <p className="text-xs sm:text-sm text-ink-500 mt-1 max-w-xl">
            Curated narratives tailored to your literary tastes, followed authors, and real-time reading progress.
          </p>
        </div>

        <Link
          href="/browse"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 text-ink-950 hover:bg-amber-400 transition-colors shadow-sm self-start md:self-end"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Advanced Story Search</span>
        </Link>
      </div>

      {/* 1. CONTINUE READING SECTION (If any progress exists) */}
      {continueReadingStories.length > 0 && (
        <section className="p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-card to-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <h2 className="font-serif text-xl font-bold text-ink-900 dark:text-ink-50">
                Continue Reading
              </h2>
            </div>
            <Link
              href="/library"
              className="text-xs font-medium text-amber-600 dark:text-amber-400 hover:underline"
            >
              View Library
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {continueReadingStories.map(({ story, progress }) => {
              const currentChapter =
                story.chapters.find((c) => c.id === progress.chapterId) || story.chapters[0];
              return (
                <div
                  key={story.id}
                  className="flex gap-4 p-3.5 rounded-xl border border-border/70 bg-card/80 hover:bg-card hover:border-amber-500/50 transition-all shadow-sm group"
                >
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-16 h-24 rounded-lg object-cover book-shadow-light shrink-0"
                  />
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <span className="text-[10px] font-semibold text-amber-500 uppercase">
                        {story.genre}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-ink-900 dark:text-ink-100 truncate group-hover:text-amber-500 transition-colors">
                        {story.title}
                      </h4>
                      <p className="text-xs text-ink-500 truncate">
                        Ch. {progress.chapterNumber}: {currentChapter.title}
                      </p>
                    </div>

                    <div className="mt-2 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-ink-400">
                        <span>Progress</span>
                        <span className="font-semibold text-amber-500">
                          {progress.progressPercent}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-ink-200 dark:bg-ink-800 overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full transition-all duration-300"
                          style={{ width: `${progress.progressPercent}%` }}
                        />
                      </div>
                      <Link
                        href={`/read/${story.slug}/${currentChapter.slug}`}
                        className="inline-block mt-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-500"
                      >
                        Resume Reading →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 2. STORIES FROM FOLLOWED AUTHORS */}
      {followedStories.length > 0 && (
        <StoryCarousel
          badge="Your Authors"
          title="From Writers You Follow"
          subtitle="Latest updates from authors currently in your personal circle."
          stories={followedStories}
          viewAllHref="/library"
        />
      )}

      {/* 3. RECOMMENDED FOR YOU */}
      <StoryCarousel
        badge="Tailored For You"
        title="Recommended For You"
        subtitle="Stories resonating with your reading interests and high engagement."
        stories={recommendedForYou}
        viewAllHref="/browse?sort=recommended"
      />

      {/* 4. TRENDING TODAY */}
      <StoryCarousel
        badge="High Velocity"
        title="Trending Today"
        subtitle="Novels experiencing an influx of reads, comments, and community enthusiasm."
        stories={trendingToday}
        viewAllHref="/browse?sort=trending"
      />

      {/* 5. POPULAR THIS WEEK */}
      <StoryCarousel
        badge="Most Read"
        title="Popular This Week"
        subtitle="The highest read counts across our 70-novel catalog."
        stories={popularThisWeek}
        viewAllHref="/browse?sort=popular"
      />

      {/* 6. GENRE EXPLORER QUICK TABS */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink-900 dark:text-ink-50">
              Explore by Genre
            </h2>
            <p className="text-xs sm:text-sm text-ink-500">
              Quickly switch between realms of storytelling.
            </p>
          </div>
        </div>

        {/* Horizontal tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedGenreTab('All')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              selectedGenreTab === 'All'
                ? 'bg-amber-500 text-ink-950 shadow-sm'
                : 'border border-border/70 hover:bg-card text-ink-600 dark:text-ink-300'
            }`}
          >
            All Genres (70)
          </button>
          {GENRES.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGenreTab(g.name)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                selectedGenreTab === g.name
                  ? 'bg-amber-500 text-ink-950 shadow-sm'
                  : 'border border-border/70 hover:bg-card text-ink-600 dark:text-ink-300'
              }`}
            >
              {g.name} ({g.storyCount})
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredGenreStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* 7. NEW RELEASES */}
      <StoryCarousel
        badge="Fresh Chapters"
        title="Recently Updated"
        subtitle="Authors who have penned fresh chapters and serialized additions."
        stories={newReleases}
        viewAllHref="/browse?sort=recent"
      />
    </div>
  );
}
