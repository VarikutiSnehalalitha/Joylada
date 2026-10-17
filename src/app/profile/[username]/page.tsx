'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { DEMO_USERS } from '@/data/mockUsers';
import { User, Story } from '@/types';
import StoryCard from '@/components/story/StoryCard';
import {
  User as UserIcon,
  Users,
  BookOpen,
  Award,
  Bookmark,
  Heart,
  Globe,
  Calendar,
  PenTool,
  Edit3,
  UserCheck,
  UserPlus,
  Check,
  X
} from 'lucide-react';

export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const {
    currentUser,
    updateUserProfile,
    stories,
    readingLists,
    likedStories,
    followedAuthors,
    toggleFollowAuthor
  } = useApp();

  const [activeTab, setActiveTab] = useState<'stories' | 'lists' | 'likes' | 'achievements'>('stories');
  const [showEditModal, setShowEditModal] = useState(false);

  // Profile edit form state
  const [editName, setEditName] = useState(currentUser.name);
  const [editBio, setEditBio] = useState(currentUser.bio);
  const [editAvatar, setEditAvatar] = useState(currentUser.avatar);

  // Check if this profile belongs to logged-in user or another author
  const isSelf = currentUser.username === username;

  // Find user data
  let targetUser: User = isSelf ? currentUser : DEMO_USERS.reader;
  if (!isSelf) {
    const matchedAuthor = stories.find((s) => s.author.username === username)?.author;
    if (matchedAuthor) {
      targetUser = matchedAuthor;
    } else {
      const demoMatch = Object.values(DEMO_USERS).find((u) => u.username === username);
      if (demoMatch) targetUser = demoMatch;
    }
  }

  // Published stories
  const userPublishedStories = stories.filter(
    (s) => s.author.username === targetUser.username || s.authorId === targetUser.id
  );

  // Liked stories
  const userLikedStories = stories.filter((s) => likedStories.includes(s.id));

  const isFollowing = followedAuthors.includes(targetUser.id);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: editName,
      bio: editBio,
      avatar: editAvatar
    });
    setShowEditModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header Banner */}
      <div className="rounded-3xl border border-border/70 bg-card overflow-hidden shadow-sm">
        {/* Decorative Top Accent Bar */}
        <div className="h-32 sm:h-44 bg-gradient-to-r from-amber-600/30 via-rose-600/20 to-amber-600/30" />

        <div className="px-6 sm:px-8 pb-8 -mt-16 sm:-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
              <img
                src={targetUser.avatar}
                alt={targetUser.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover ring-4 ring-card shadow-elevated bg-card"
              />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ink-900 dark:text-ink-50">
                    {targetUser.name}
                  </h1>
                  <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400">
                    {targetUser.role}
                  </span>
                </div>
                <div className="text-xs text-ink-400">@{targetUser.username}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isSelf ? (
                <button
                  onClick={() => setShowEditModal(true)}
                  className="px-4 py-2 rounded-xl border border-border/80 hover:bg-ink-100 dark:hover:bg-ink-900 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <button
                  onClick={() => toggleFollowAuthor(targetUser.id)}
                  className={`px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isFollowing
                      ? 'bg-ink-200 dark:bg-ink-800 text-ink-800 dark:text-ink-200'
                      : 'bg-amber-500 text-ink-950 hover:bg-amber-400 shadow-sm'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Follow</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Bio & Details */}
          <div className="mt-6 pt-6 border-t border-border/40 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 leading-relaxed font-sans">
                {targetUser.bio || 'Avid reader and storyteller on Velumbra.'}
              </p>

              {/* Badges */}
              {targetUser.badges && targetUser.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {targetUser.badges.map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25"
                    >
                      <Award className="w-3 h-3" /> {b}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats Column */}
            <div className="flex sm:justify-end gap-6 text-xs text-ink-500">
              <div>
                <div className="font-serif font-bold text-lg text-ink-900 dark:text-ink-100">
                  {targetUser.followersCount.toLocaleString()}
                </div>
                <div className="text-[11px]">Followers</div>
              </div>
              <div>
                <div className="font-serif font-bold text-lg text-ink-900 dark:text-ink-100">
                  {targetUser.followingCount.toLocaleString()}
                </div>
                <div className="text-[11px]">Following</div>
              </div>
              <div>
                <div className="font-serif font-bold text-lg text-ink-900 dark:text-ink-100">
                  {userPublishedStories.length}
                </div>
                <div className="text-[11px]">Stories</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border/50 gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('stories')}
          className={`pb-3 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'stories'
              ? 'border-amber-500 text-amber-500'
              : 'border-transparent text-ink-500 hover:text-ink-900 dark:hover:text-ink-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Published Stories ({userPublishedStories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('lists')}
          className={`pb-3 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'lists'
              ? 'border-amber-500 text-amber-500'
              : 'border-transparent text-ink-500 hover:text-ink-900 dark:hover:text-ink-100'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Reading Lists ({readingLists.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('likes')}
          className={`pb-3 transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'likes'
              ? 'border-amber-500 text-amber-500'
              : 'border-transparent text-ink-500 hover:text-ink-900 dark:hover:text-ink-100'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Liked Stories ({userLikedStories.length})</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'stories' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {userPublishedStories.length === 0 ? (
            <div className="col-span-full py-16 text-center border border-dashed border-border/70 rounded-2xl bg-card/40">
              <BookOpen className="w-8 h-8 text-amber-500 mx-auto mb-2 opacity-50" />
              <p className="text-xs text-ink-500">No published stories yet.</p>
            </div>
          ) : (
            userPublishedStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))
          )}
        </div>
      )}

      {activeTab === 'lists' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {readingLists.map((list) => (
            <div key={list.id} className="p-5 rounded-2xl border border-border/70 bg-card space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-ink-900 dark:text-ink-100">
                  {list.name}
                </h3>
                <span className="text-xs text-amber-500 font-semibold">
                  {list.storyIds.length} stories
                </span>
              </div>
              <p className="text-xs text-ink-500">{list.description}</p>
              <div className="pt-2 border-t border-border/40 flex justify-end">
                <Link
                  href="/library"
                  className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                >
                  Manage in Library →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'likes' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {userLikedStories.length === 0 ? (
            <div className="col-span-full py-16 text-center border border-dashed border-border/70 rounded-2xl bg-card/40">
              <Heart className="w-8 h-8 text-rose-500 mx-auto mb-2 opacity-50" />
              <p className="text-xs text-ink-500">No liked stories yet.</p>
            </div>
          ) : (
            userLikedStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))
          )}
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-card rounded-2xl border border-border p-6 shadow-elevated">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <h3 className="font-serif font-bold text-base">Edit Profile</h3>
              <button onClick={() => setShowEditModal(false)}>
                <X className="w-5 h-5 text-ink-400" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-medium text-ink-700 dark:text-ink-300 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-ink-100/70 dark:bg-ink-900/70 border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-medium text-ink-700 dark:text-ink-300 mb-1">
                  Bio / Literary Statement
                </label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-ink-100/70 dark:bg-ink-900/70 border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div>
                <label className="block font-medium text-ink-700 dark:text-ink-300 mb-1">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={editAvatar}
                  onChange={(e) => setEditAvatar(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-ink-100/70 dark:bg-ink-900/70 border border-border text-ink-900 dark:text-ink-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/50">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-ink-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-semibold bg-amber-500 text-ink-950 hover:bg-amber-400"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
