'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import StoryCard from '@/components/story/StoryCard';
import {
  Bookmark,
  Clock,
  CheckCircle2,
  ListPlus,
  Plus,
  BookOpen,
  Trash2,
  FolderOpen
} from 'lucide-react';

export default function LibraryPage() {
  const {
    stories,
    bookmarks,
    readingProgress,
    readingLists,
    createReadingList,
    removeStoryFromList
  } = useApp();

  const [activeTab, setActiveTab] = useState<'reading' | 'finished' | 'bookmarked' | 'lists'>('reading');
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [showNewListForm, setShowNewListForm] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListDesc, setNewListDesc] = useState('');

  // 1. Currently Reading stories
  const inProgressIds = Object.keys(readingProgress);
  const currentlyReadingStories = stories
    .filter((s) => inProgressIds.includes(s.id))
    .map((s) => ({
      story: s,
      progress: readingProgress[s.id]
    }));

  // 2. Finished stories (100% progress or marked completed)
  const finishedStories = currentlyReadingStories
    .filter((item) => item.progress.progressPercent >= 100)
    .map((item) => item.story);

  // 3. Bookmarked stories
  const bookmarkedStories = stories.filter((s) => bookmarks.includes(s.id));

  // 4. Stories in selected reading list
  const activeReadingList = readingLists.find((l) => l.id === selectedListId);
  const listStories = activeReadingList
    ? stories.filter((s) => activeReadingList.storyIds.includes(s.id))
    : [];

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    createReadingList(newListName.trim(), newListDesc.trim());
    setNewListName('');
    setNewListDesc('');
    setShowNewListForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/40">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            <Bookmark className="w-4 h-4" />
            <span>Personal Collection</span>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
            My Reading Library
          </h1>
          <p className="text-xs sm:text-sm text-ink-500 mt-1">
            Organize ongoing serials, finished novels, bookmarks, and curated lists.
          </p>
        </div>

        <button
          onClick={() => setShowNewListForm(true)}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 text-ink-950 hover:bg-amber-400 flex items-center gap-1.5 transition-colors shadow-sm self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>New Reading List</span>
        </button>
      </div>

      {/* Library Tabs */}
      <div className="flex border-b border-border/50 gap-6 text-xs font-semibold overflow-x-auto no-scrollbar">
        <button
          onClick={() => {
            setActiveTab('reading');
            setSelectedListId(null);
          }}
          className={`pb-3.5 transition-colors border-b-2 flex items-center gap-2 shrink-0 ${
            activeTab === 'reading'
              ? 'border-amber-500 text-amber-500'
              : 'border-transparent text-ink-500 hover:text-ink-900 dark:hover:text-ink-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Currently Reading ({currentlyReadingStories.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('bookmarked');
            setSelectedListId(null);
          }}
          className={`pb-3.5 transition-colors border-b-2 flex items-center gap-2 shrink-0 ${
            activeTab === 'bookmarked'
              ? 'border-amber-500 text-amber-500'
              : 'border-transparent text-ink-500 hover:text-ink-900 dark:hover:text-ink-100'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Bookmarked ({bookmarkedStories.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('finished');
            setSelectedListId(null);
          }}
          className={`pb-3.5 transition-colors border-b-2 flex items-center gap-2 shrink-0 ${
            activeTab === 'finished'
              ? 'border-amber-500 text-amber-500'
              : 'border-transparent text-ink-500 hover:text-ink-900 dark:hover:text-ink-100'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Finished Stories ({finishedStories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('lists')}
          className={`pb-3.5 transition-colors border-b-2 flex items-center gap-2 shrink-0 ${
            activeTab === 'lists'
              ? 'border-amber-500 text-amber-500'
              : 'border-transparent text-ink-500 hover:text-ink-900 dark:hover:text-ink-100'
          }`}
        >
          <ListPlus className="w-4 h-4" />
          <span>Custom Lists ({readingLists.length})</span>
        </button>
      </div>

      {/* 1. CURRENTLY READING TAB */}
      {activeTab === 'reading' && (
        <div className="space-y-4">
          {currentlyReadingStories.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-border/70 rounded-2xl bg-card/30">
              <BookOpen className="w-10 h-10 text-amber-500 mx-auto mb-2 opacity-50" />
              <h3 className="font-serif font-bold text-base mb-1">Your reading queue is empty</h3>
              <p className="text-xs text-ink-500 mb-4">
                Explore our catalog of 70 novels to begin reading.
              </p>
              <Link
                href="/browse"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 text-ink-950 hover:bg-amber-400"
              >
                Browse Stories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentlyReadingStories.map(({ story, progress }) => {
                const currentChapter =
                  story.chapters.find((c) => c.id === progress.chapterId) || story.chapters[0];
                return (
                  <div
                    key={story.id}
                    className="p-4 rounded-2xl border border-border/70 bg-card hover:border-amber-500/50 transition-all flex flex-col justify-between shadow-sm space-y-4"
                  >
                    <div className="flex gap-4">
                      <Link href={`/story/${story.slug}`}>
                        <img
                          src={story.coverImage}
                          alt={story.title}
                          className="w-16 h-24 rounded-lg object-cover book-shadow-light hover:scale-105 transition-transform"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-semibold text-amber-500 uppercase">
                          {story.genre}
                        </span>
                        <Link href={`/story/${story.slug}`}>
                          <h4 className="font-serif font-bold text-sm text-ink-900 dark:text-ink-100 hover:text-amber-500 transition-colors truncate">
                            {story.title}
                          </h4>
                        </Link>
                        <p className="text-xs text-ink-500 truncate mt-0.5">
                          By {story.author.name}
                        </p>
                        <div className="text-[11px] text-ink-400 mt-2">
                          Current: Ch. {progress.chapterNumber} ({currentChapter.title})
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-border/40">
                      <div className="flex justify-between text-xs text-ink-400">
                        <span>Progress</span>
                        <span className="font-semibold text-amber-500">
                          {progress.progressPercent}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-ink-200 dark:bg-ink-800 overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${progress.progressPercent}%` }}
                        />
                      </div>
                      <Link
                        href={`/read/${story.slug}/${currentChapter.slug}`}
                        className="w-full py-2 rounded-xl text-xs font-semibold bg-amber-500 text-ink-950 hover:bg-amber-400 text-center block transition-colors shadow-sm"
                      >
                        Continue Reading →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. BOOKMARKED STORIES */}
      {activeTab === 'bookmarked' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {bookmarkedStories.length === 0 ? (
            <div className="col-span-full py-20 text-center border border-dashed border-border/70 rounded-2xl bg-card/30">
              <Bookmark className="w-10 h-10 text-amber-500 mx-auto mb-2 opacity-50" />
              <p className="text-xs text-ink-500">No bookmarked stories yet.</p>
            </div>
          ) : (
            bookmarkedStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))
          )}
        </div>
      )}

      {/* 3. FINISHED STORIES */}
      {activeTab === 'finished' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {finishedStories.length === 0 ? (
            <div className="col-span-full py-20 text-center border border-dashed border-border/70 rounded-2xl bg-card/30">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2 opacity-50" />
              <p className="text-xs text-ink-500">
                You haven't finished any stories yet. Keep reading to build your completed archive!
              </p>
            </div>
          ) : (
            finishedStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))
          )}
        </div>
      )}

      {/* 4. CUSTOM READING LISTS */}
      {activeTab === 'lists' && (
        <div className="space-y-6">
          {selectedListId && activeReadingList ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-border/40">
                <div>
                  <button
                    onClick={() => setSelectedListId(null)}
                    className="text-xs text-amber-500 hover:underline mb-1 flex items-center gap-1"
                  >
                    ← Back to All Lists
                  </button>
                  <h2 className="font-serif text-2xl font-bold text-ink-900 dark:text-ink-50">
                    {activeReadingList.name}
                  </h2>
                  <p className="text-xs text-ink-500 mt-0.5">{activeReadingList.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {listStories.length === 0 ? (
                  <div className="col-span-full py-16 text-center border border-dashed border-border/70 rounded-2xl bg-card/30">
                    <p className="text-xs text-ink-500">This reading list is currently empty.</p>
                  </div>
                ) : (
                  listStories.map((story) => (
                    <div key={story.id} className="relative group">
                      <StoryCard story={story} />
                      <button
                        onClick={() => removeStoryFromList(activeReadingList.id, story.id)}
                        className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-rose-600 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                        title="Remove from list"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {readingLists.map((list) => (
                <div
                  key={list.id}
                  onClick={() => setSelectedListId(list.id)}
                  className="p-5 rounded-2xl border border-border/70 bg-card hover:border-amber-500/50 hover:shadow-elevated transition-all cursor-pointer space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                      <FolderOpen className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-amber-500">
                      {list.storyIds.length} stories
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-base text-ink-900 dark:text-ink-100">
                      {list.name}
                    </h3>
                    <p className="text-xs text-ink-500 line-clamp-2 mt-1">
                      {list.description || 'Custom curated story list.'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/40 text-xs font-semibold text-amber-600 dark:text-amber-400">
                    Open List →
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal: Create Reading List */}
      {showNewListForm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-card rounded-2xl border border-border p-6 shadow-elevated">
            <h3 className="font-serif font-bold text-lg mb-1">Create Reading List</h3>
            <p className="text-xs text-ink-500 mb-4">
              Give your list a thematic title and description.
            </p>

            <form onSubmit={handleCreateList} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-ink-700 dark:text-ink-300 mb-1">
                  List Title *
                </label>
                <input
                  type="text"
                  required
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="e.g. Victorian Nocturnes"
                  className="w-full px-3 py-2 rounded-xl bg-ink-100/70 dark:bg-ink-900/70 border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-medium text-ink-700 dark:text-ink-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newListDesc}
                  onChange={(e) => setNewListDesc(e.target.value)}
                  placeholder="Atmospheric stories for stormy evenings..."
                  className="w-full px-3 py-2 rounded-xl bg-ink-100/70 dark:bg-ink-900/70 border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/50">
                <button
                  type="button"
                  onClick={() => setShowNewListForm(false)}
                  className="px-4 py-2 text-ink-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-semibold bg-amber-500 text-ink-950 hover:bg-amber-400"
                >
                  Create List
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
