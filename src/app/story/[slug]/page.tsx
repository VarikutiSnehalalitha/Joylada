'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  BookOpen,
  Heart,
  Bookmark,
  Share2,
  Clock,
  Calendar,
  AlertTriangle,
  Award,
  Flame,
  CheckCircle2,
  UserCheck,
  UserPlus,
  ArrowRight,
  ListPlus,
  Flag,
  Sparkles
} from 'lucide-react';
import ShareModal from '@/components/modals/ShareModal';
import ReportModal from '@/components/modals/ReportModal';
import ReadingListModal from '@/components/modals/ReadingListModal';
import CommentSection from '@/components/comments/CommentSection';
import StoryCarousel from '@/components/story/StoryCarousel';

export default function StoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const {
    stories,
    isBookmarked,
    toggleBookmark,
    isStoryLiked,
    toggleLikeStory,
    isFollowingAuthor,
    toggleFollowAuthor,
    readingProgress
  } = useApp();

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  const story = stories.find((s) => s.slug === slug);

  if (!story) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold mb-3">Story Not Found</h2>
        <p className="text-sm text-ink-500 mb-6">
          The manuscript you are searching for does not exist or may have been archived.
        </p>
        <Link
          href="/browse"
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-ink-950 font-semibold text-xs"
        >
          Return to Story Explorer
        </Link>
      </div>
    );
  }

  const bookmarked = isBookmarked(story.id);
  const liked = isStoryLiked(story.id);
  const followingAuthor = isFollowingAuthor(story.authorId);
  const progress = readingProgress[story.id];

  // Similar stories in the same genre
  const similarStories = stories
    .filter((s) => s.genre === story.genre && s.id !== story.id)
    .slice(0, 8);

  // Other works by same author
  const authorOtherWorks = stories
    .filter((s) => s.authorId === story.authorId && s.id !== story.id)
    .slice(0, 4);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  const initialChapter =
    progress && story.chapters.find((c) => c.id === progress.chapterId)
      ? story.chapters.find((c) => c.id === progress.chapterId)!
      : story.chapters[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* 1. HERO STORY PRESENTATION */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start pb-10 border-b border-border/40">
        {/* Cover Column */}
        <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center">
          <div className="relative w-full max-w-[280px] aspect-[2/3] rounded-2xl overflow-hidden book-shadow">
            <img
              src={story.coverImage}
              alt={story.title}
              className="w-full h-full object-cover"
            />
            {story.isEditorPick && (
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-500 text-ink-950 flex items-center gap-1 shadow-md">
                <Award className="w-3.5 h-3.5" /> Editor's Pick
              </span>
            )}
            {story.isTrending && (
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-600 text-white flex items-center gap-1 shadow-md">
                <Flame className="w-3.5 h-3.5" /> Trending
              </span>
            )}
          </div>

          {/* Quick Actions Under Cover */}
          <div className="w-full max-w-[280px] grid grid-cols-3 gap-2 mt-4">
            <button
              onClick={() => toggleLikeStory(story.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs transition-colors ${
                liked
                  ? 'bg-rose-500/10 border-rose-500/40 text-rose-500 font-semibold'
                  : 'border-border/60 hover:bg-card text-ink-600 dark:text-ink-300'
              }`}
            >
              <Heart className={`w-4 h-4 mb-0.5 ${liked ? 'fill-current' : ''}`} />
              <span>{formatNumber(story.likes)}</span>
            </button>

            <button
              onClick={() => toggleBookmark(story.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs transition-colors ${
                bookmarked
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-500 font-semibold'
                  : 'border-border/60 hover:bg-card text-ink-600 dark:text-ink-300'
              }`}
            >
              <Bookmark className={`w-4 h-4 mb-0.5 ${bookmarked ? 'fill-current' : ''}`} />
              <span>{bookmarked ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={() => setIsShareOpen(true)}
              className="flex flex-col items-center justify-center p-2 rounded-xl border border-border/60 hover:bg-card text-xs text-ink-600 dark:text-ink-300 transition-colors"
            >
              <Share2 className="w-4 h-4 mb-0.5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Story Metadata & Summary Column */}
        <div className="md:col-span-8 lg:col-span-9 space-y-6">
          <div>
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
              <Link
                href={`/browse?genre=${encodeURIComponent(story.genre)}`}
                className="px-3 py-1 rounded-full font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 transition-colors"
              >
                {story.genre}
              </Link>
              <span className="px-2.5 py-1 rounded-full bg-ink-100 dark:bg-ink-900 text-ink-500 border border-border/50">
                {story.rating}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-ink-100 dark:bg-ink-900 text-ink-500 border border-border/50 capitalize">
                {story.status === 'completed' ? '✓ Completed Novel' : '⏳ Ongoing Serial'}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink-900 dark:text-ink-50 leading-tight">
              {story.title}
            </h1>

            {/* Author Line */}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <Link
                href={`/profile/${story.author.username}`}
                className="flex items-center gap-2.5 group"
              >
                <img
                  src={story.author.avatar}
                  alt={story.author.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/40"
                />
                <div>
                  <div className="font-serif font-bold text-sm text-ink-900 dark:text-ink-100 group-hover:text-amber-500 transition-colors">
                    {story.author.name}
                  </div>
                  <div className="text-[11px] text-ink-400">
                    @{story.author.username}
                  </div>
                </div>
              </Link>

              <button
                onClick={() => toggleFollowAuthor(story.authorId)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  followingAuthor
                    ? 'bg-ink-200 dark:bg-ink-800 text-ink-800 dark:text-ink-200'
                    : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-ink-950 border border-amber-500/30'
                }`}
              >
                {followingAuthor ? (
                  <>
                    <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Follow Author</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Reading Statistics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-ink-100/50 dark:bg-ink-900/50 border border-border/50 text-center">
            <div>
              <div className="text-xs text-ink-400">Total Reads</div>
              <div className="font-serif font-bold text-lg text-amber-500 mt-0.5">
                {formatNumber(story.reads)}
              </div>
            </div>
            <div>
              <div className="text-xs text-ink-400">Chapters</div>
              <div className="font-serif font-bold text-lg text-ink-900 dark:text-ink-100 mt-0.5">
                {story.chapterCount}
              </div>
            </div>
            <div>
              <div className="text-xs text-ink-400">Word Count</div>
              <div className="font-serif font-bold text-lg text-ink-900 dark:text-ink-100 mt-0.5">
                {story.wordCount.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-xs text-ink-400">Est. Reading</div>
              <div className="font-serif font-bold text-lg text-ink-900 dark:text-ink-100 mt-0.5">
                {story.readingTimeMinutes} mins
              </div>
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <h3 className="font-serif font-bold text-sm text-ink-900 dark:text-ink-100 mb-2">
              Synopsis
            </h3>
            <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 leading-relaxed font-sans">
              {story.synopsis}
            </p>
          </div>

          {/* Tags */}
          <div>
            <div className="text-[11px] font-medium text-ink-500 mb-2">Story Tags</div>
            <div className="flex flex-wrap gap-2">
              {story.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/browse?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 rounded-lg text-xs bg-card border border-border/60 hover:border-amber-500 text-ink-600 dark:text-ink-300 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Content Warnings (if any) */}
          {story.contentWarnings && story.contentWarnings.length > 0 && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Content Notice: </span>
                <span>{story.contentWarnings.join(', ')}</span>
              </div>
            </div>
          )}

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={`/read/${story.slug}/${initialChapter.slug}`}
              className="px-6 py-3 rounded-xl text-sm font-semibold bg-amber-500 text-ink-950 hover:bg-amber-400 transition-all shadow-md flex items-center gap-2 group"
            >
              <BookOpen className="w-4 h-4" />
              <span>
                {progress ? `Continue Reading Ch. ${progress.chapterNumber}` : 'Start Reading Chapter 1'}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => setIsListModalOpen(true)}
              className="px-4 py-3 rounded-xl text-xs font-semibold border border-border/80 bg-card hover:bg-card/80 text-ink-800 dark:text-ink-200 transition-colors flex items-center gap-2 shadow-sm"
            >
              <ListPlus className="w-4 h-4 text-amber-500" />
              <span>Add to Reading List</span>
            </button>

            <button
              onClick={() => setIsReportOpen(true)}
              className="p-3 rounded-xl border border-border/60 hover:bg-rose-500/10 hover:text-rose-500 text-ink-400 transition-colors"
              title="Report Story"
            >
              <Flag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. COMPLETE CHAPTER TABLE OF CONTENTS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink-900 dark:text-ink-50">
              Table of Contents ({story.chapters.length} Chapters)
            </h2>
            <p className="text-xs text-ink-500">
              Read serialized chapters in distraction-free reader mode.
            </p>
          </div>
        </div>

        <div className="divide-y divide-border/50 border border-border/60 rounded-2xl bg-card overflow-hidden">
          {story.chapters.map((ch) => {
            const isCurrentlyReading = progress?.chapterId === ch.id;
            return (
              <Link
                key={ch.id}
                href={`/read/${story.slug}/${ch.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-ink-100/50 dark:hover:bg-ink-900/50 transition-colors gap-2"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 font-serif font-bold text-sm flex items-center justify-center shrink-0">
                    {ch.chapterNumber}
                  </div>
                  <div className="min-w-0">
                    <div className="font-serif font-bold text-sm text-ink-900 dark:text-ink-100 group-hover:text-amber-500 transition-colors truncate">
                      {ch.title}
                    </div>
                    <div className="text-[11px] text-ink-400 mt-0.5">
                      {ch.wordCount} words · {ch.readingTimeMinutes} min read
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center text-xs text-ink-400">
                  {isCurrentlyReading && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-600 dark:text-amber-400">
                      Current Position
                    </span>
                  )}
                  <span className="font-medium group-hover:text-amber-500 transition-colors">
                    Read Chapter →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. AUTHOR PROFILE SPOTLIGHT CARD */}
      <section className="p-6 rounded-2xl border border-border/60 bg-card/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/40">
          <div className="flex items-center gap-4">
            <img
              src={story.author.avatar}
              alt={story.author.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-amber-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg text-ink-900 dark:text-ink-50">
                  {story.author.name}
                </h3>
                {story.author.badges?.map((b) => (
                  <span
                    key={b}
                    className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-500"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <p className="text-xs text-ink-500 max-w-lg mt-1">{story.author.bio}</p>
            </div>
          </div>

          <Link
            href={`/profile/${story.author.username}`}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-ink-950 transition-colors self-start sm:self-center shrink-0"
          >
            Author Profile
          </Link>
        </div>

        {authorOtherWorks.length > 0 && (
          <div className="mt-6">
            <h4 className="font-serif font-bold text-xs text-ink-500 uppercase tracking-wider mb-4">
              More by {story.author.name}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {authorOtherWorks.map((work) => (
                <Link
                  key={work.id}
                  href={`/story/${work.slug}`}
                  className="group flex gap-3 p-2.5 rounded-xl border border-border/50 bg-card hover:border-amber-500/40 transition-colors"
                >
                  <img
                    src={work.coverImage}
                    alt={work.title}
                    className="w-10 h-14 rounded object-cover book-shadow-light shrink-0"
                  />
                  <div className="min-w-0 flex flex-col justify-center">
                    <h5 className="font-serif font-bold text-xs text-ink-900 dark:text-ink-100 truncate group-hover:text-amber-500 transition-colors">
                      {work.title}
                    </h5>
                    <span className="text-[10px] text-ink-400 mt-0.5">{work.genre}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 4. COMMENTS & DISCUSSION */}
      <CommentSection
        storyId={story.id}
        onReportComment={(id, snippet) => setIsReportOpen(true)}
      />

      {/* 5. SIMILAR STORIES IN GENRE */}
      {similarStories.length > 0 && (
        <StoryCarousel
          badge="More In This Realm"
          title={`More ${story.genre} Stories`}
          subtitle="Other captivating tales exploring similar emotional depths and narrative worlds."
          stories={similarStories}
          viewAllHref={`/browse?genre=${encodeURIComponent(story.genre)}`}
        />
      )}

      {/* Modals */}
      <ShareModal
        story={story}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        targetType="story"
        targetId={story.id}
        targetTitle={story.title}
      />

      <ReadingListModal
        story={story}
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
      />
    </div>
  );
}
