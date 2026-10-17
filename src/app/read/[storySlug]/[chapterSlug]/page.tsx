'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { StorageService } from '@/services/storage';
import { ReaderPreferences, Chapter, Story } from '@/types';
import ReaderControls from '@/components/reader/ReaderControls';
import CommentSection from '@/components/comments/CommentSection';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Bookmark,
  Heart,
  MessageSquare,
  BookOpen,
  Share2,
  Menu,
  X,
  Check
} from 'lucide-react';
import ShareModal from '@/components/modals/ShareModal';

export default function ReaderPage() {
  const params = useParams();
  const router = useRouter();
  const storySlug = params.storySlug as string;
  const chapterSlug = params.chapterSlug as string;

  const {
    stories,
    saveReadingProgress,
    isBookmarked,
    toggleBookmark,
    isStoryLiked,
    toggleLikeStory
  } = useApp();

  const [story, setStory] = useState<Story | null>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [showCommentsDrawer, setShowCommentsDrawer] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Reader typography & appearance preferences
  const [preferences, setPreferences] = useState<ReaderPreferences>({
    fontFamily: 'serif',
    fontSize: 'base',
    lineHeight: 'normal',
    contentWidth: 'medium',
    theme: 'dark'
  });

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('velumbra_reader_prefs');
      if (stored) {
        setPreferences(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handlePreferencesChange = (updates: Partial<ReaderPreferences>) => {
    setPreferences((prev) => {
      const next = { ...prev, ...updates };
      try {
        window.localStorage.setItem('velumbra_reader_prefs', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  // Find story and chapter
  useEffect(() => {
    const foundStory = stories.find((s) => s.slug === storySlug);
    if (foundStory) {
      setStory(foundStory);
      const foundChapter =
        foundStory.chapters.find((c) => c.slug === chapterSlug) || foundStory.chapters[0];
      setCurrentChapter(foundChapter);

      // Auto save reading progress
      if (foundChapter) {
        saveReadingProgress(foundStory.id, foundChapter.id, foundChapter.chapterNumber, 100);
      }
    }
  }, [storySlug, chapterSlug, stories]);

  // Track scroll reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = Math.min(
          100,
          Math.max(0, Math.round((window.scrollY / totalHeight) * 100))
        );
        setScrollProgress(currentProgress);

        if (story && currentChapter) {
          saveReadingProgress(story.id, currentChapter.id, currentChapter.chapterNumber, currentProgress);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [story, currentChapter]);

  // Keyboard navigation for chapters
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (!story || !currentChapter) return;
      const currentIndex = story.chapters.findIndex((c) => c.id === currentChapter.id);

      if (e.key === 'ArrowRight' || e.key === 'j') {
        if (currentIndex < story.chapters.length - 1) {
          router.push(`/read/${story.slug}/${story.chapters[currentIndex + 1].slug}`);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'k') {
        if (currentIndex > 0) {
          router.push(`/read/${story.slug}/${story.chapters[currentIndex - 1].slug}`);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [story, currentChapter, router]);

  if (!story || !currentChapter) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <BookOpen className="w-8 h-8 text-amber-500 mx-auto mb-2 animate-pulse" />
          <p className="text-xs text-ink-500">Loading manuscript...</p>
        </div>
      </div>
    );
  }

  const currentIndex = story.chapters.findIndex((c) => c.id === currentChapter.id);
  const prevChapter = currentIndex > 0 ? story.chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < story.chapters.length - 1 ? story.chapters[currentIndex + 1] : null;
  const bookmarked = isBookmarked(story.id);
  const liked = isStoryLiked(story.id);

  // Theme style classes
  const themeClasses = {
    light: 'bg-[#faf8f5] text-[#1c1917]',
    sepia: 'bg-[#f4ecd8] text-[#433422]',
    dark: 'bg-[#14141c] text-[#e2e8f0]',
    midnight: 'bg-black text-gray-200'
  }[preferences.theme];

  // Font family classes
  const fontClasses = {
    serif: 'font-serif',
    sans: 'font-sans',
    mono: 'font-mono',
    merriweather: 'font-serif'
  }[preferences.fontFamily];

  // Font size classes
  const fontSizeClasses = {
    sm: 'text-sm leading-relaxed sm:text-base',
    base: 'text-base leading-relaxed sm:text-lg',
    lg: 'text-lg leading-loose sm:text-xl',
    xl: 'text-xl leading-loose sm:text-2xl',
    '2xl': 'text-2xl leading-loose'
  }[preferences.fontSize];

  // Line spacing
  const lineHeightClasses = {
    compact: 'leading-normal',
    normal: 'leading-relaxed',
    relaxed: 'leading-loose'
  }[preferences.lineHeight];

  // Page width classes
  const widthClasses = {
    narrow: 'max-w-xl',
    medium: 'max-w-2xl',
    wide: 'max-w-3xl',
    full: 'max-w-4xl'
  }[preferences.contentWidth];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${themeClasses}`}>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-black/10 dark:bg-white/10 z-50">
        <div
          className="h-full bg-amber-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Reader Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 backdrop-blur-md bg-opacity-90 transition-colors">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href={`/story/${story.slug}`}
              className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors shrink-0"
              title="Return to Story Details"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="min-w-0">
              <h1 className="font-serif font-bold text-xs sm:text-sm truncate">
                {story.title}
              </h1>
              <div className="text-[11px] opacity-75 truncate">
                Chapter {currentChapter.chapterNumber}: {currentChapter.title}
              </div>
            </div>
          </div>

          {/* Reader Controls Toolbar */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Table of Contents Button */}
            <button
              onClick={() => setShowToc(!showToc)}
              className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-xs flex items-center gap-1.5 font-medium"
              title="Table of Contents"
            >
              <Menu className="w-4 h-4" />
              <span className="hidden sm:inline">Contents</span>
            </button>

            {/* Reading Settings Button */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-xs flex items-center gap-1.5 font-medium"
              title="Reading Theme & Typography"
            >
              <Sliders className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Aa</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => toggleBookmark(story.id)}
              className={`p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${
                bookmarked ? 'text-amber-500' : 'opacity-80'
              }`}
              title={bookmarked ? 'Bookmarked' : 'Bookmark story'}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Chapter comments drawer toggle */}
            <button
              onClick={() => setShowCommentsDrawer(!showCommentsDrawer)}
              className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors opacity-80 hover:opacity-100"
              title="Comments on Chapter"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Prose Reading Area */}
      <main className="px-4 sm:px-6 py-12 sm:py-16">
        <article className={`mx-auto ${widthClasses} ${fontClasses} space-y-8`}>
          {/* Chapter Heading */}
          <header className="pb-8 border-b border-border/40 text-center space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-500">
              Chapter {currentChapter.chapterNumber}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              {currentChapter.title}
            </h2>
            <div className="text-xs opacity-60">
              By {story.author.name} · {currentChapter.readingTimeMinutes} min read ({currentChapter.wordCount} words)
            </div>
          </header>

          {/* Formatted multi-paragraph prose */}
          <div className={`space-y-6 ${fontSizeClasses} ${lineHeightClasses} tracking-normal`}>
            {currentChapter.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="first-letter:text-2xl first-letter:font-bold">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Chapter Footer Actions & Navigation */}
          <footer className="pt-12 mt-12 border-t border-border/40 space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-border/40">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleLikeStory(story.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                    liked
                      ? 'bg-rose-500/10 border-rose-500/40 text-rose-500'
                      : 'border-border/60 hover:bg-card'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                  <span>Like Chapter ({story.likes + (liked ? 1 : 0)})</span>
                </button>

                <button
                  onClick={() => setShowCommentsDrawer(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border/60 hover:bg-card text-xs font-semibold transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-amber-500" />
                  <span>Chapter Comments</span>
                </button>
              </div>

              <div className="text-xs opacity-75">
                Keyboard shortcuts: <strong>←</strong> Prev · <strong>→</strong> Next
              </div>
            </div>

            {/* Prev / Next Chapter Buttons */}
            <div className="grid grid-cols-2 gap-4">
              {prevChapter ? (
                <Link
                  href={`/read/${story.slug}/${prevChapter.slug}`}
                  className="flex items-center gap-2 p-4 rounded-xl border border-border/60 hover:border-amber-500/50 hover:bg-card/40 transition-colors text-left"
                >
                  <ChevronLeft className="w-5 h-5 shrink-0 text-amber-500" />
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-semibold opacity-60">Previous</div>
                    <div className="font-serif font-bold text-xs sm:text-sm truncate">
                      Ch. {prevChapter.chapterNumber}: {prevChapter.title}
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="p-4 rounded-xl border border-dashed border-border/40 opacity-40 text-xs flex items-center">
                  First chapter of manuscript
                </div>
              )}

              {nextChapter ? (
                <Link
                  href={`/read/${story.slug}/${nextChapter.slug}`}
                  className="flex items-center justify-end gap-2 p-4 rounded-xl border border-border/60 hover:border-amber-500/50 hover:bg-card/40 transition-colors text-right"
                >
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-semibold opacity-60">Next</div>
                    <div className="font-serif font-bold text-xs sm:text-sm truncate">
                      Ch. {nextChapter.chapterNumber}: {nextChapter.title}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 shrink-0 text-amber-500" />
                </Link>
              ) : (
                <Link
                  href={`/story/${story.slug}`}
                  className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Story Completed! Return to Overview</span>
                </Link>
              )}
            </div>
          </footer>
        </article>
      </main>

      {/* Table of Contents Drawer */}
      {showToc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-start">
          <div className="w-full max-w-sm h-full bg-card border-r border-border p-5 overflow-y-auto animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-border/50">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <h3 className="font-serif font-bold text-base">Chapters</h3>
              </div>
              <button onClick={() => setShowToc(false)} className="p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-1">
              {story.chapters.map((ch) => {
                const isSelected = ch.id === currentChapter.id;
                return (
                  <Link
                    key={ch.id}
                    href={`/read/${story.slug}/${ch.slug}`}
                    onClick={() => setShowToc(false)}
                    className={`block p-3 rounded-xl text-xs transition-colors ${
                      isSelected
                        ? 'bg-amber-500 text-ink-950 font-bold'
                        : 'hover:bg-ink-100 dark:hover:bg-ink-900 opacity-80'
                    }`}
                  >
                    <div className="text-[10px] uppercase">Chapter {ch.chapterNumber}</div>
                    <div className="font-serif font-bold text-sm truncate">{ch.title}</div>
                    <div className="text-[10px] mt-0.5 opacity-75">{ch.wordCount} words</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Comments Drawer */}
      {showCommentsDrawer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md h-full bg-card border-l border-border p-5 overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-border/50">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-500" />
                <h3 className="font-serif font-bold text-base">
                  Ch. {currentChapter.chapterNumber} Comments
                </h3>
              </div>
              <button onClick={() => setShowCommentsDrawer(false)} className="p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-2">
              <CommentSection
                storyId={story.id}
                chapterId={currentChapter.id}
                chapterNumber={currentChapter.chapterNumber}
              />
            </div>
          </div>
        </div>
      )}

      {/* Reader Typography Controls Panel */}
      <ReaderControls
        preferences={preferences}
        onChange={handlePreferencesChange}
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      {/* Share Modal */}
      <ShareModal
        story={story}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </div>
  );
}
