'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Story } from '@/types';
import StoryCard from './StoryCard';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface StoryCarouselProps {
  title: string;
  subtitle?: string;
  stories: Story[];
  viewAllHref?: string;
  badge?: string;
}

export default function StoryCarousel({
  title,
  subtitle,
  stories,
  viewAllHref,
  badge
}: StoryCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!stories || stories.length === 0) return null;

  return (
    <section className="py-6">
      <div className="flex items-end justify-between mb-5">
        <div>
          {badge && (
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-600 dark:text-amber-400 mb-1 block">
              {badge}
            </span>
          )}
          <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-xs md:text-sm text-ink-500 max-w-xl">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-xs font-medium text-amber-600 dark:text-amber-400 hover:text-amber-500 flex items-center gap-1 mr-3 group transition-colors"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}

          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-border/60 hover:bg-card hover:border-amber-500/50 text-ink-600 dark:text-ink-300 transition-colors shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-border/60 hover:bg-card hover:border-amber-500/50 text-ink-600 dark:text-ink-300 transition-colors shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar scroll-smooth"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {stories.map((story) => (
          <div
            key={story.id}
            className="w-[200px] sm:w-[220px] md:w-[240px] shrink-0"
            style={{ scrollSnapAlign: 'start' }}
          >
            <StoryCard story={story} />
          </div>
        ))}
      </div>
    </section>
  );
}
