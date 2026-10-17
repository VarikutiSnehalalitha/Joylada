'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Story } from '@/types';
import { X, Bookmark, Plus, Check } from 'lucide-react';

interface ReadingListModalProps {
  story: Story;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReadingListModal({ story, isOpen, onClose }: ReadingListModalProps) {
  const { readingLists, createReadingList, addStoryToList, removeStoryFromList } = useApp();
  const [showCreate, setShowCreate] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListDesc, setNewListDesc] = useState('');

  if (!isOpen) return null;

  const handleToggleList = (listId: string, isCurrentlyIn: boolean) => {
    if (isCurrentlyIn) {
      removeStoryFromList(listId, story.id);
    } else {
      addStoryToList(listId, story.id);
    }
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    const created = createReadingList(newListName.trim(), newListDesc.trim());
    addStoryToList(created.id, story.id);
    setNewListName('');
    setNewListDesc('');
    setShowCreate(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-2xl border border-border/80 p-5 shadow-elevated animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-500" />
            <h3 className="font-serif font-bold text-base text-ink-900 dark:text-ink-50">
              Save to Reading List
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-ink-400 hover:text-ink-900 dark:hover:text-ink-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3 p-2.5 rounded-xl bg-ink-100/50 dark:bg-ink-900/50 border border-border/40">
          <img
            src={story.coverImage}
            alt={story.title}
            className="w-10 h-14 rounded object-cover"
          />
          <div className="min-w-0 flex-1">
            <h4 className="font-serif font-bold text-xs text-ink-900 dark:text-ink-100 truncate">
              {story.title}
            </h4>
            <p className="text-[11px] text-ink-500 truncate">By {story.author.name}</p>
          </div>
        </div>

        {/* Existing Reading Lists */}
        <div className="mt-4 space-y-2 max-h-56 overflow-y-auto">
          {readingLists.length === 0 ? (
            <p className="text-xs text-ink-500 py-4 text-center">
              You have no reading lists yet.
            </p>
          ) : (
            readingLists.map((list) => {
              const containsStory = list.storyIds.includes(story.id);
              return (
                <button
                  key={list.id}
                  onClick={() => handleToggleList(list.id, containsStory)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    containsStory
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400'
                      : 'border-border/60 hover:bg-ink-100/60 dark:hover:bg-ink-900/60 text-ink-800 dark:text-ink-200'
                  }`}
                >
                  <div className="min-w-0 pr-3">
                    <div className="font-serif font-semibold text-xs truncate">
                      {list.name}
                    </div>
                    {list.description && (
                      <div className="text-[11px] text-ink-500 truncate mt-0.5">
                        {list.description}
                      </div>
                    )}
                    <span className="text-[10px] text-ink-400">
                      {list.storyIds.length} stories
                    </span>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                      containsStory
                        ? 'bg-amber-500 border-amber-500 text-ink-950'
                        : 'border-border text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Create New List toggle */}
        {!showCreate ? (
          <button
            onClick={() => setShowCreate(true)}
            className="mt-4 w-full py-2.5 px-3 rounded-xl border border-dashed border-border/80 hover:border-amber-500/60 hover:bg-amber-500/5 text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Reading List</span>
          </button>
        ) : (
          <form onSubmit={handleCreateNew} className="mt-4 p-3 rounded-xl border border-border/80 bg-ink-100/40 dark:bg-ink-900/40 space-y-3">
            <div>
              <label className="block text-[11px] font-medium text-ink-700 dark:text-ink-300 mb-1">
                List Title
              </label>
              <input
                type="text"
                required
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="e.g. Rainy Day Comfort Reads"
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-card border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-ink-700 dark:text-ink-300 mb-1">
                Description (optional)
              </label>
              <input
                type="text"
                value={newListDesc}
                onChange={(e) => setNewListDesc(e.target.value)}
                placeholder="Short description..."
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-card border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="px-2.5 py-1 text-xs text-ink-500 hover:text-ink-900 dark:hover:text-ink-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-xs font-semibold rounded-lg bg-amber-500 text-ink-950 hover:bg-amber-400"
              >
                Create & Add
              </button>
            </div>
          </form>
        )}

        <div className="mt-4 pt-3 border-t border-border/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded-xl bg-ink-200 dark:bg-ink-800 text-ink-800 dark:text-ink-200 hover:bg-ink-300 dark:hover:bg-ink-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
