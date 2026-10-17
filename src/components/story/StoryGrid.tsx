'use client';

import React from 'react';
import { Story } from '@/types';
import StoryCard from './StoryCard';
import { BookOpen } from 'lucide-react';

interface StoryGridProps {
  stories: Story[];
  layout?: 'grid' | 'horizontal';
  emptyMessage?: string;
}

export default function StoryGrid({
  stories,
  layout = 'grid',
  emptyMessage = "No stories match your search criteria. Try adjusting your filters."
}: StoryGridProps) {
  if (stories.length === 0) {
    return (
      <div className="py-16 text-center border border-dashed border-border/70 rounded-2xl p-8 bg-card/30">
        <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-3">
          <BookOpen className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-lg font-bold text-ink-800 dark:text-ink-200">
          No stories found
        </h3>
        <p className="text-sm text-ink-500 max-w-md mx-auto mt-1">
          {emptyMessage}
        </p>
      </div>
    );
  }

  if (layout === 'horizontal') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} layout="horizontal" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} layout="grid" />
      ))}
    </div>
  );
}
