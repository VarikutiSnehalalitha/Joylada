'use client';

import React from 'react';
import Link from 'next/link';
import { Story } from '@/types';
import { useApp } from '@/context/AppContext';
import { Bookmark, Heart, BookOpen, Clock, CheckCircle2, Flame, Award } from 'lucide-react';

interface StoryCardProps {
  story: Story;
  layout?: 'grid' | 'horizontal' | 'compact';
}

export default function StoryCard({ story, layout = 'grid' }: StoryCardProps) {
  const { isBookmarked, toggleBookmark } = useApp();
  const bookmarked = isBookmarked(story.id);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  if (layout === 'horizontal') {
    return (
      <div className="group relative flex flex-col sm:flex-row gap-5 p-4 rounded-xl border border-border/60 bg-card/60 hover:bg-card/90 transition-all duration-300 hover:shadow-elevated hover:border-amber-500/30">
        <Link href={`/story/${story.slug}`} className="relative shrink-0 w-full sm:w-36 h-52 overflow-hidden rounded-lg book-shadow-light group-hover:book-shadow transition-shadow">
          <img
            src={story.coverImage}
            alt={story.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {story.isEditorPick && (
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/90 text-ink-950 flex items-center gap-1 backdrop-blur-sm shadow-sm">
              <Award className="w-3 h-3" /> Pick
            </span>
          )}
        </Link>

        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap text-xs">
              <span className="px-2 py-0.5 rounded-full font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                {story.genre}
              </span>
              <span className="text-ink-400">·</span>
              <span className="text-ink-400">{story.rating}</span>
              {story.status === 'completed' && (
                <span className="text-emerald-500 flex items-center gap-1 text-[11px] font-medium">
                  <CheckCircle2 className="w-3 h-3" /> Completed
                </span>
              )}
            </div>

            <Link href={`/story/${story.slug}`}>
              <h3 className="font-serif text-lg font-bold tracking-tight text-ink-900 dark:text-ink-50 group-hover:text-amber-500 transition-colors line-clamp-1">
                {story.title}
              </h3>
            </Link>

            <Link href={`/profile/${story.author.username}`} className="inline-flex items-center gap-2 mt-1 mb-2 text-xs text-ink-500 hover:text-ink-900 dark:hover:text-ink-200">
              <img src={story.author.avatar} alt={story.author.name} className="w-4 h-4 rounded-full object-cover" />
              <span>{story.author.name}</span>
            </Link>

            <p className="text-xs text-ink-600 dark:text-ink-300 line-clamp-2 leading-relaxed">
              {story.synopsis}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border/40 text-xs text-ink-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-amber-500/80" />
                {story.chapterCount} ch
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500/80" />
                {formatNumber(story.likes)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {story.readingTimeMinutes}m
              </span>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                toggleBookmark(story.id);
              }}
              className={`p-1.5 rounded-lg border transition-colors ${
                bookmarked
                  ? 'bg-amber-500 text-ink-950 border-amber-500'
                  : 'hover:bg-ink-100 dark:hover:bg-ink-800 text-ink-400 border-border/50'
              }`}
              title={bookmarked ? "Remove Bookmark" : "Bookmark Story"}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col rounded-xl border border-border/50 bg-card/40 hover:bg-card/90 transition-all duration-300 hover:shadow-elevated hover:border-amber-500/30 overflow-hidden">
      {/* Cover container */}
      <Link href={`/story/${story.slug}`} className="relative aspect-[2/3] w-full overflow-hidden bg-ink-900/10">
        <img
          src={story.coverImage}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Badges on cover */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {story.isTrending && (
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-600/90 text-white flex items-center gap-1 backdrop-blur-md shadow-sm">
              <Flame className="w-3 h-3" /> Trending
            </span>
          )}
          {story.isEditorPick && !story.isTrending && (
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/90 text-ink-950 flex items-center gap-1 backdrop-blur-md shadow-sm">
              <Award className="w-3 h-3" /> Editor's Pick
            </span>
          )}
        </div>

        {/* Quick bookmark action */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleBookmark(story.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            bookmarked
              ? 'bg-amber-500 text-ink-950 shadow-md'
              : 'bg-black/50 text-white hover:bg-black/80'
          }`}
          title={bookmarked ? "Remove Bookmark" : "Bookmark Story"}
        >
          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
        </button>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
          <span className="text-xs text-white font-medium">Read {story.chapterCount} Chapters →</span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="font-medium text-amber-600 dark:text-amber-400">{story.genre}</span>
            <span className="text-ink-400">{story.rating}</span>
          </div>

          <Link href={`/story/${story.slug}`}>
            <h3 className="font-serif font-bold text-base leading-snug tracking-tight text-ink-900 dark:text-ink-50 group-hover:text-amber-500 transition-colors line-clamp-1">
              {story.title}
            </h3>
          </Link>

          <Link href={`/profile/${story.author.username}`} className="inline-flex items-center gap-1.5 mt-1 text-xs text-ink-500 hover:text-ink-900 dark:hover:text-ink-200">
            <img src={story.author.avatar} alt={story.author.name} className="w-3.5 h-3.5 rounded-full object-cover" />
            <span className="truncate">{story.author.name}</span>
          </Link>

          <p className="mt-2 text-xs text-ink-600 dark:text-ink-400 line-clamp-2 leading-relaxed">
            {story.synopsis}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-ink-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1" title={`${story.reads} reads`}>
              <BookOpen className="w-3 h-3 text-amber-500/80" />
              {formatNumber(story.reads)}
            </span>
            <span className="flex items-center gap-1" title={`${story.likes} likes`}>
              <Heart className="w-3 h-3 text-rose-500/80" />
              {formatNumber(story.likes)}
            </span>
          </div>
          <span className="text-[11px] text-ink-500">
            {story.chapterCount} Ch
          </span>
        </div>
      </div>
    </div>
  );
}
