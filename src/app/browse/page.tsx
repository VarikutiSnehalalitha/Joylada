'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { GENRES } from '@/data/genres';
import StoryCard from '@/components/story/StoryCard';
import StoryGrid from '@/components/story/StoryGrid';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  BookOpen,
  LayoutGrid,
  List,
  Sparkles,
  ArrowUpDown,
  RotateCcw
} from 'lucide-react';

function BrowseContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialGenre = searchParams.get('genre') || 'All';
  const initialSort = searchParams.get('sort') || 'trending';

  const { stories } = useApp();

  // Filters state
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedRating, setSelectedRating] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedSort, setSelectedSort] = useState<string>(initialSort);
  const [layoutMode, setLayoutMode] = useState<'grid' | 'horizontal'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;

  // Extract all unique tags across all 70 stories
  const allTags = useMemo(() => {
    const set = new Set<string>();
    stories.forEach((s) => s.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [stories]);

  // Filter & Search Logic
  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      // Search query (matches title, author, synopsis, tags)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = story.title.toLowerCase().includes(q);
        const matchesAuthor = story.author.name.toLowerCase().includes(q);
        const matchesSynopsis = story.synopsis.toLowerCase().includes(q);
        const matchesTags = story.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesAuthor && !matchesSynopsis && !matchesTags) {
          return false;
        }
      }

      // Genre filter
      if (selectedGenre !== 'All' && story.genre.toLowerCase() !== selectedGenre.toLowerCase()) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'All' && story.status !== selectedStatus.toLowerCase()) {
        return false;
      }

      // Rating filter
      if (selectedRating !== 'All' && story.rating !== selectedRating) {
        return false;
      }

      // Tag filter
      if (selectedTag !== 'All' && !story.tags.includes(selectedTag)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'trending') return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0) || b.reads - a.reads;
      if (selectedSort === 'reads') return b.reads - a.reads;
      if (selectedSort === 'likes') return b.likes - a.likes;
      if (selectedSort === 'editor-pick') return (b.isEditorPick ? 1 : 0) - (a.isEditorPick ? 1 : 0);
      if (selectedSort === 'recent') return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      if (selectedSort === 'chapters') return b.chapterCount - a.chapterCount;
      return 0;
    });
  }, [stories, searchQuery, selectedGenre, selectedStatus, selectedRating, selectedTag, selectedSort]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredStories.length / itemsPerPage);
  const paginatedStories = filteredStories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setSelectedStatus('All');
    setSelectedRating('All');
    setSelectedTag('All');
    setSelectedSort('trending');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedGenre !== 'All' ||
    selectedStatus !== 'All' ||
    selectedRating !== 'All' ||
    selectedTag !== 'All' ||
    selectedSort !== 'trending';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border/40">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
            Story Explorer
          </h1>
          <p className="text-xs sm:text-sm text-ink-500 mt-1">
            Browse our complete library of 70 original fictional works and 210 sample chapters.
          </p>
        </div>

        {/* View Mode & Stats */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-ink-500">
            Showing <strong className="text-amber-500">{filteredStories.length}</strong> of 70 stories
          </span>

          <div className="flex items-center border border-border/70 rounded-lg p-0.5 bg-card">
            <button
              onClick={() => setLayoutMode('grid')}
              className={`p-1.5 rounded text-xs transition-colors ${
                layoutMode === 'grid'
                  ? 'bg-amber-500 text-ink-950 shadow-sm'
                  : 'text-ink-500 hover:text-ink-900 dark:hover:text-ink-100'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayoutMode('horizontal')}
              className={`p-1.5 rounded text-xs transition-colors ${
                layoutMode === 'horizontal'
                  ? 'bg-amber-500 text-ink-950 shadow-sm'
                  : 'text-ink-500 hover:text-ink-900 dark:hover:text-ink-100'
              }`}
              title="Editorial List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 sm:p-5 rounded-2xl border border-border/70 bg-card/70 space-y-4 shadow-sm">
        {/* Main Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by title, author, keyword, or character..."
            className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl bg-ink-100/70 dark:bg-ink-900/70 border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-ink-400 hover:text-ink-700 dark:hover:text-ink-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          {/* Genre */}
          <div>
            <label className="block text-[11px] font-medium text-ink-500 mb-1">Genre</label>
            <select
              value={selectedGenre}
              onChange={(e) => {
                setSelectedGenre(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-2 rounded-xl bg-card border border-border text-ink-800 dark:text-ink-200 focus:outline-none focus:border-amber-500"
            >
              <option value="All">All Genres (12)</option>
              {GENRES.map((g) => (
                <option key={g.id} value={g.name}>
                  {g.name} ({g.storyCount})
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-[11px] font-medium text-ink-500 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-2 rounded-xl bg-card border border-border text-ink-800 dark:text-ink-200 focus:outline-none focus:border-amber-500"
            >
              <option value="All">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="ongoing">Ongoing</option>
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-[11px] font-medium text-ink-500 mb-1">Content Rating</label>
            <select
              value={selectedRating}
              onChange={(e) => {
                setSelectedRating(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-2 rounded-xl bg-card border border-border text-ink-800 dark:text-ink-200 focus:outline-none focus:border-amber-500"
            >
              <option value="All">All Ratings</option>
              <option value="All Ages">All Ages</option>
              <option value="Teen (13+)">Teen (13+)</option>
              <option value="Mature (18+)">Mature (18+)</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-[11px] font-medium text-ink-500 mb-1">Specific Tag</label>
            <select
              value={selectedTag}
              onChange={(e) => {
                setSelectedTag(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-2 rounded-xl bg-card border border-border text-ink-800 dark:text-ink-200 focus:outline-none focus:border-amber-500"
            >
              <option value="All">All Tags ({allTags.length})</option>
              {allTags.map((t) => (
                <option key={t} value={t}>
                  #{t}
                </option>
              ))}
            </select>
          </div>

          {/* Sorting */}
          <div>
            <label className="block text-[11px] font-medium text-ink-500 mb-1">Sort By</label>
            <select
              value={selectedSort}
              onChange={(e) => {
                setSelectedSort(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-2 rounded-xl bg-card border border-border text-ink-800 dark:text-ink-200 focus:outline-none focus:border-amber-500"
            >
              <option value="trending">Trending Today</option>
              <option value="reads">Most Read</option>
              <option value="likes">Most Liked</option>
              <option value="editor-pick">Editor's Picks</option>
              <option value="recent">Recently Updated</option>
              <option value="chapters">Most Chapters</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40 text-xs">
            <span className="text-[11px] text-ink-500">Active filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[11px]">
                Search: "{searchQuery}"
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
              </span>
            )}
            {selectedGenre !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[11px]">
                Genre: {selectedGenre}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedGenre('All')} />
              </span>
            )}
            {selectedStatus !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[11px]">
                Status: {selectedStatus}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedStatus('All')} />
              </span>
            )}
            {selectedRating !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[11px]">
                Rating: {selectedRating}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedRating('All')} />
              </span>
            )}
            {selectedTag !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[11px]">
                Tag: #{selectedTag}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedTag('All')} />
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-[11px] text-rose-500 hover:underline flex items-center gap-1 ml-auto"
            >
              <RotateCcw className="w-3 h-3" /> Reset all
            </button>
          </div>
        )}
      </div>

      {/* Story Grid / List Results */}
      <StoryGrid
        stories={paginatedStories}
        layout={layoutMode}
        emptyMessage="No stories found matching your filter criteria. Try selecting another genre or clearing the search keyword."
      />

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8 border-t border-border/40">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1.5 text-xs rounded-lg border border-border/70 hover:bg-card disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-7 h-7 text-xs rounded-lg font-semibold transition-colors ${
                  currentPage === i + 1
                    ? 'bg-amber-500 text-ink-950'
                    : 'hover:bg-card text-ink-600 dark:text-ink-400'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 text-xs rounded-lg border border-border/70 hover:bg-card disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin mx-auto mb-2" />
          <p className="text-xs text-ink-500">Loading story explorer...</p>
        </div>
      }
    >
      <BrowseContent />
    </Suspense>
  );
}
