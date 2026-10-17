'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Story, Chapter, ChapterStatus } from '@/types';
import { GENRES } from '@/data/genres';
import {
  PenTool,
  Plus,
  BookOpen,
  FileText,
  Save,
  Clock,
  Eye,
  CheckCircle2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  AlertCircle,
  Upload,
  Calendar,
  Layers,
  BarChart3
} from 'lucide-react';

export default function StudioPage() {
  const { currentUser, stories, saveStory, deleteStory } = useApp();

  // Stories authored by the current user or user-created stories
  const userStories = stories.filter(
    (s) => s.authorId === currentUser.id || s.author.username === currentUser.username
  );

  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [showNewStoryModal, setShowNewStoryModal] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [autosaveStatus, setAutosaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');

  // Story Form State (for creating a new story)
  const [newStoryTitle, setNewStoryTitle] = useState('');
  const [newStorySynopsis, setNewStorySynopsis] = useState('');
  const [newStoryGenre, setNewStoryGenre] = useState('Fantasy');
  const [newStoryTags, setNewStoryTags] = useState('Magic, Quest, Adventure');
  const [newStoryCover, setNewStoryCover] = useState(
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
  );
  const [newStoryRating, setNewStoryRating] = useState<'All Ages' | 'Teen (13+)' | 'Mature (18+)'>('All Ages');

  // Chapter Editor State
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [chapterStatus, setChapterStatus] = useState<ChapterStatus>('published');
  const [scheduledDate, setScheduledDate] = useState('');

  // Default to first story if available, or initialize
  useEffect(() => {
    if (userStories.length > 0 && !activeStory) {
      setActiveStory(userStories[0]);
      if (userStories[0].chapters.length > 0) {
        setActiveChapter(userStories[0].chapters[0]);
        setChapterTitle(userStories[0].chapters[0].title);
        setChapterContent(userStories[0].chapters[0].content);
        setChapterStatus(userStories[0].chapters[0].status);
      }
    } else if (stories.length > 0 && !activeStory) {
      // If user has no authored story, allow them to edit or create
      setActiveStory(stories[0]);
      if (stories[0].chapters.length > 0) {
        setActiveChapter(stories[0].chapters[0]);
        setChapterTitle(stories[0].chapters[0].title);
        setChapterContent(stories[0].chapters[0].content);
        setChapterStatus(stories[0].chapters[0].status);
      }
    }
  }, [stories, userStories, activeStory]);

  // Synchronize chapter fields when active chapter changes
  const handleSelectChapter = (ch: Chapter) => {
    setActiveChapter(ch);
    setChapterTitle(ch.title);
    setChapterContent(ch.content);
    setChapterStatus(ch.status);
    setIsPreviewMode(false);
  };

  // Autosave simulation & persistence
  useEffect(() => {
    if (!activeStory || !activeChapter) return;

    if (chapterTitle !== activeChapter.title || chapterContent !== activeChapter.content || chapterStatus !== activeChapter.status) {
      setAutosaveStatus('saving');
      const timer = setTimeout(() => {
        const words = chapterContent.trim().split(/\s+/).filter(Boolean).length;
        const updatedChapters = activeStory.chapters.map((ch) =>
          ch.id === activeChapter.id
            ? {
                ...ch,
                title: chapterTitle,
                content: chapterContent,
                status: chapterStatus,
                wordCount: words,
                readingTimeMinutes: Math.max(1, Math.ceil(words / 150))
              }
            : ch
        );

        const totalWordCount = updatedChapters.reduce((acc, c) => acc + c.wordCount, 0);
        const updatedStory: Story = {
          ...activeStory,
          chapters: updatedChapters,
          wordCount: totalWordCount,
          updatedAt: new Date().toISOString()
        };

        saveStory(updatedStory);
        setActiveStory(updatedStory);
        setActiveChapter(updatedChapters.find((c) => c.id === activeChapter.id) || null);
        setAutosaveStatus('saved');
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [chapterTitle, chapterContent, chapterStatus]);

  // Format insertion tools
  const insertFormatting = (prefix: string, suffix: string = '') => {
    setChapterContent((prev) => `${prev}\n\n${prefix}Text here${suffix}`);
  };

  // Create New Chapter
  const handleCreateChapter = () => {
    if (!activeStory) return;
    const newNum = activeStory.chapters.length + 1;
    const newCh: Chapter = {
      id: `ch-${activeStory.id}-${Date.now()}`,
      storyId: activeStory.id,
      chapterNumber: newNum,
      title: `Chapter ${newNum}: Untitled`,
      slug: `chapter-${newNum}-${Date.now().toString().slice(-4)}`,
      content: 'Write the opening scene of this new chapter here...',
      wordCount: 8,
      readingTimeMinutes: 1,
      publishDate: new Date().toISOString(),
      status: 'draft',
      views: 0,
      likes: 0,
      commentsCount: 0
    };

    const updatedChapters = [...activeStory.chapters, newCh];
    const updatedStory: Story = {
      ...activeStory,
      chapters: updatedChapters,
      chapterCount: updatedChapters.length,
      updatedAt: new Date().toISOString()
    };

    saveStory(updatedStory);
    setActiveStory(updatedStory);
    handleSelectChapter(newCh);
  };

  // Create New Story
  const handleCreateNewStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoryTitle.trim()) return;

    const storyId = `story-custom-${Date.now()}`;
    const slug = newStoryTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const tagsArray = newStoryTags.split(',').map((t) => t.trim()).filter(Boolean);

    const firstChapter: Chapter = {
      id: `ch-${storyId}-1`,
      storyId: storyId,
      chapterNumber: 1,
      title: 'Chapter 1: The Threshold',
      slug: 'the-threshold',
      content: 'Begin your story here...',
      wordCount: 4,
      readingTimeMinutes: 1,
      publishDate: new Date().toISOString(),
      status: 'published',
      views: 0,
      likes: 0,
      commentsCount: 0
    };

    const createdStory: Story = {
      id: storyId,
      slug,
      title: newStoryTitle.trim(),
      authorId: currentUser.id,
      author: currentUser,
      synopsis: newStorySynopsis.trim() || 'A compelling new original work on Velumbra.',
      coverImage: newStoryCover,
      genre: newStoryGenre,
      tags: tagsArray.length > 0 ? tagsArray : ['New Release'],
      wordCount: 4,
      chapterCount: 1,
      readingTimeMinutes: 1,
      reads: 0,
      likes: 0,
      commentsCount: 0,
      bookmarksCount: 0,
      status: 'ongoing',
      rating: newStoryRating,
      contentWarnings: [],
      isFeatured: false,
      isTrending: false,
      isEditorPick: false,
      isRecommended: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      chapters: [firstChapter]
    };

    saveStory(createdStory);
    setActiveStory(createdStory);
    setActiveChapter(firstChapter);
    setChapterTitle(firstChapter.title);
    setChapterContent(firstChapter.content);
    setShowNewStoryModal(false);
    setNewStoryTitle('');
    setNewStorySynopsis('');
  };

  const wordCount = chapterContent.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 150));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/40">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            <PenTool className="w-4 h-4" />
            <span>Author Studio</span>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
            Writing & Publishing Suite
          </h1>
          <p className="text-xs text-ink-500">
            Write serialized prose, format chapters, and publish directly to readers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/author/dashboard"
            className="px-3.5 py-2 rounded-xl border border-border/70 hover:bg-card text-xs font-semibold text-ink-700 dark:text-ink-300 flex items-center gap-1.5 transition-colors"
          >
            <BarChart3 className="w-4 h-4 text-amber-500" />
            <span>Analytics</span>
          </Link>

          <button
            onClick={() => setShowNewStoryModal(true)}
            className="px-4 py-2 rounded-xl bg-amber-500 text-ink-950 hover:bg-amber-400 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Story</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Story & Chapter Manager */}
        <div className="lg:col-span-4 space-y-5">
          {/* Active Story Picker */}
          <div className="p-4 rounded-2xl border border-border/70 bg-card/70 space-y-3">
            <div className="flex items-center justify-between text-xs font-medium text-ink-500">
              <span>Current Story</span>
              <span className="text-[10px] uppercase font-bold text-amber-500">
                {userStories.length} Authored
              </span>
            </div>

            <select
              value={activeStory?.id || ''}
              onChange={(e) => {
                const found = stories.find((s) => s.id === e.target.value);
                if (found) {
                  setActiveStory(found);
                  if (found.chapters.length > 0) {
                    handleSelectChapter(found.chapters[0]);
                  }
                }
              }}
              className="w-full px-3 py-2 text-xs font-serif font-bold rounded-xl bg-card border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500"
            >
              {stories.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.genre})
                </option>
              ))}
            </select>

            {activeStory && (
              <div className="flex gap-3 pt-2">
                <img
                  src={activeStory.coverImage}
                  alt={activeStory.title}
                  className="w-12 h-16 rounded object-cover book-shadow-light shrink-0"
                />
                <div className="min-w-0 flex-1 text-xs">
                  <div className="font-serif font-bold truncate text-ink-900 dark:text-ink-100">
                    {activeStory.title}
                  </div>
                  <div className="text-[11px] text-amber-500">{activeStory.genre}</div>
                  <div className="text-[10px] text-ink-400 mt-1">
                    {activeStory.chapterCount} chapters · {activeStory.reads.toLocaleString()} reads
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chapter Selector & Reorder Manager */}
          {activeStory && (
            <div className="p-4 rounded-2xl border border-border/70 bg-card/70 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-sm text-ink-900 dark:text-ink-100 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-500" />
                  <span>Chapters ({activeStory.chapters.length})</span>
                </h3>
                <button
                  onClick={handleCreateChapter}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-ink-950 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add</span>
                </button>
              </div>

              <div className="space-y-1.5 max-h-80 overflow-y-auto">
                {activeStory.chapters.map((ch) => {
                  const isSelected = activeChapter?.id === ch.id;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => handleSelectChapter(ch)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-colors ${
                        isSelected
                          ? 'bg-amber-500 text-ink-950 font-bold shadow-sm'
                          : 'border border-border/50 hover:bg-ink-100/60 dark:hover:bg-ink-900/60 text-ink-700 dark:text-ink-300'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="text-[10px] uppercase opacity-75">
                          Chapter {ch.chapterNumber}
                        </div>
                        <div className="truncate">{ch.title}</div>
                      </div>

                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-semibold shrink-0 ${
                          ch.status === 'published'
                            ? isSelected
                              ? 'bg-ink-950/20 text-ink-950'
                              : 'bg-emerald-500/20 text-emerald-500'
                            : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {ch.status}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Editor Workspace */}
        <div className="lg:col-span-8 space-y-4">
          {activeChapter ? (
            <div className="rounded-2xl border border-border/70 bg-card overflow-hidden shadow-sm">
              {/* Editor Sub-Header Toolbar */}
              <div className="p-4 border-b border-border/50 flex flex-wrap items-center justify-between gap-3 bg-ink-950/10">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-amber-500">
                    Chapter {activeChapter.chapterNumber}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-ink-400">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>{wordCount} words</span>
                    <span>·</span>
                    <span>{readingTime} min read</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Autosave status indicator */}
                  <span className="text-[10px] text-ink-400 flex items-center gap-1 mr-2">
                    {autosaveStatus === 'saving' ? (
                      <span className="text-amber-500 animate-pulse">Saving...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>All changes saved</span>
                      </>
                    )}
                  </span>

                  {/* Status selector */}
                  <select
                    value={chapterStatus}
                    onChange={(e) => setChapterStatus(e.target.value as ChapterStatus)}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-card border border-border text-ink-900 dark:text-ink-100 focus:outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Private)</option>
                    <option value="scheduled">Scheduled</option>
                  </select>

                  {/* Preview Toggle */}
                  <button
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg border flex items-center gap-1.5 transition-colors ${
                      isPreviewMode
                        ? 'bg-amber-500 text-ink-950 border-amber-500'
                        : 'border-border hover:bg-ink-100 dark:hover:bg-ink-800'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isPreviewMode ? 'Editor' : 'Preview'}</span>
                  </button>
                </div>
              </div>

              {/* Formatting Quick Bar */}
              {!isPreviewMode && (
                <div className="px-4 py-2 border-b border-border/40 flex items-center gap-1 overflow-x-auto text-xs text-ink-600 dark:text-ink-300">
                  <button
                    onClick={() => insertFormatting('**', '**')}
                    className="px-2 py-1 rounded hover:bg-ink-100 dark:hover:bg-ink-800 font-bold"
                    title="Bold"
                  >
                    B
                  </button>
                  <button
                    onClick={() => insertFormatting('*', '*')}
                    className="px-2 py-1 rounded hover:bg-ink-100 dark:hover:bg-ink-800 italic"
                    title="Italic"
                  >
                    I
                  </button>
                  <button
                    onClick={() => insertFormatting('## ')}
                    className="px-2 py-1 rounded hover:bg-ink-100 dark:hover:bg-ink-800 font-bold font-serif"
                    title="Heading 2"
                  >
                    H2
                  </button>
                  <button
                    onClick={() => insertFormatting('> ')}
                    className="px-2 py-1 rounded hover:bg-ink-100 dark:hover:bg-ink-800"
                    title="Blockquote"
                  >
                    " Quote
                  </button>
                  <button
                    onClick={() => insertFormatting('---')}
                    className="px-2 py-1 rounded hover:bg-ink-100 dark:hover:bg-ink-800"
                    title="Scene Divider"
                  >
                    Divider
                  </button>
                  <button
                    onClick={() => insertFormatting('- ')}
                    className="px-2 py-1 rounded hover:bg-ink-100 dark:hover:bg-ink-800"
                    title="Bullet List"
                  >
                    • List
                  </button>
                </div>
              )}

              {/* Editor Core Content Area */}
              <div className="p-6 space-y-4">
                {isPreviewMode ? (
                  <div className="max-w-2xl mx-auto py-6 font-serif space-y-6">
                    <div className="text-center pb-6 border-b border-border/40 space-y-1">
                      <span className="text-xs uppercase text-amber-500 font-semibold tracking-wider">
                        Chapter {activeChapter.chapterNumber}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold">{chapterTitle}</h2>
                    </div>
                    <div className="space-y-4 text-base sm:text-lg leading-relaxed">
                      {chapterContent.split('\n\n').map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-[11px] font-medium text-ink-500 mb-1">
                        Chapter Title
                      </label>
                      <input
                        type="text"
                        value={chapterTitle}
                        onChange={(e) => setChapterTitle(e.target.value)}
                        placeholder="e.g. The Knothole in the Baldwin Tree"
                        className="w-full px-3.5 py-2.5 font-serif font-bold text-lg rounded-xl bg-ink-100/50 dark:bg-ink-900/50 border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-ink-500 mb-1">
                        Manuscript Prose
                      </label>
                      <textarea
                        value={chapterContent}
                        onChange={(e) => setChapterContent(e.target.value)}
                        placeholder="Once upon an autumn morning..."
                        rows={16}
                        className="w-full p-4 font-serif text-sm sm:text-base leading-relaxed rounded-xl bg-ink-100/30 dark:bg-ink-900/30 border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500 resize-y"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="py-20 text-center border border-dashed border-border/70 rounded-2xl bg-card/30">
              <BookOpen className="w-10 h-10 text-amber-500 mx-auto mb-2 opacity-50" />
              <p className="text-xs text-ink-500">
                Select or create a chapter to begin writing.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Create New Story */}
      {showNewStoryModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-card rounded-2xl border border-border p-6 shadow-elevated max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif font-bold text-xl text-ink-900 dark:text-ink-50 mb-1">
              Create New Story
            </h3>
            <p className="text-xs text-ink-500 mb-4">
              Set up your story's metadata, genre, tags, and cover image.
            </p>

            <form onSubmit={handleCreateNewStory} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-ink-700 dark:text-ink-300 mb-1">
                  Story Title *
                </label>
                <input
                  type="text"
                  required
                  value={newStoryTitle}
                  onChange={(e) => setNewStoryTitle(e.target.value)}
                  placeholder="e.g. The Alchemist's Daughter"
                  className="w-full px-3 py-2 rounded-xl bg-ink-100/70 dark:bg-ink-900/70 border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-medium text-ink-700 dark:text-ink-300 mb-1">
                  Genre *
                </label>
                <select
                  value={newStoryGenre}
                  onChange={(e) => setNewStoryGenre(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-ink-100/70 dark:bg-ink-900/70 border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500"
                >
                  {GENRES.map((g) => (
                    <option key={g.id} value={g.name}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-ink-700 dark:text-ink-300 mb-1">
                  Synopsis / Blurb *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newStorySynopsis}
                  onChange={(e) => setNewStorySynopsis(e.target.value)}
                  placeholder="Describe the central conflict, characters, and stakes..."
                  className="w-full px-3 py-2 rounded-xl bg-ink-100/70 dark:bg-ink-900/70 border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div>
                <label className="block font-medium text-ink-700 dark:text-ink-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newStoryTags}
                  onChange={(e) => setNewStoryTags(e.target.value)}
                  placeholder="Slow Burn, Secrets, Magic"
                  className="w-full px-3 py-2 rounded-xl bg-ink-100/70 dark:bg-ink-900/70 border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-medium text-ink-700 dark:text-ink-300 mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  value={newStoryCover}
                  onChange={(e) => setNewStoryCover(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-ink-100/70 dark:bg-ink-900/70 border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-medium text-ink-700 dark:text-ink-300 mb-1">
                  Content Rating
                </label>
                <select
                  value={newStoryRating}
                  onChange={(e) => setNewStoryRating(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-ink-100/70 dark:bg-ink-900/70 border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="All Ages">All Ages</option>
                  <option value="Teen (13+)">Teen (13+)</option>
                  <option value="Mature (18+)">Mature (18+)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/50">
                <button
                  type="button"
                  onClick={() => setShowNewStoryModal(false)}
                  className="px-4 py-2 rounded-xl text-ink-500 hover:text-ink-900 dark:hover:text-ink-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-semibold bg-amber-500 text-ink-950 hover:bg-amber-400 shadow-sm"
                >
                  Create Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
