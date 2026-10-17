'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Sparkles,
  MessageSquare,
  Heart,
  Feather,
  BookOpen,
  Award,
  Users,
  Send,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface CommunityPost {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    badge?: string;
  };
  content: string;
  taggedStory?: {
    title: string;
    slug: string;
  };
  likes: number;
  commentsCount: number;
  createdAt: string;
}

const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    author: {
      name: 'Clara Vane',
      username: 'clara_vane',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      badge: "Author"
    },
    content: "Writing the final scene of 'Letters from the Orchard' Chapter 3 was deeply emotional for me. To everyone who noticed the parallel between the Baldwin apple tree and the grandmother's diary: your close reading means everything to an author.",
    taggedStory: {
      title: "Letters from the Orchard",
      slug: "letters-from-the-orchard"
    },
    likes: 312,
    commentsCount: 48,
    createdAt: '2 hours ago'
  },
  {
    id: 'post-2',
    author: {
      name: 'Julian Cross',
      username: 'julian_cross',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      badge: "Author"
    },
    content: "The worldbuilding lore for 'The Crown of Pale Ash' is expanding! Chapter 4 drafts are underway, diving deep into the obsidian mines of Oakhaven. What elemental magic system should I explore next?",
    taggedStory: {
      title: "The Crown of Pale Ash",
      slug: "the-crown-of-pale-ash"
    },
    likes: 489,
    commentsCount: 92,
    createdAt: '5 hours ago'
  },
  {
    id: 'post-3',
    author: {
      name: 'Elena Vance',
      username: 'elena_vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      badge: "Scholar"
    },
    content: "Just finished Chapter 3 of 'The Edinburgh Cipher'. The historical accuracy of Victorian Edinburgh's subterranean vaults is staggering! Highly recommend this to all mystery lovers.",
    taggedStory: {
      title: "The Edinburgh Cipher",
      slug: "the-edinburgh-cipher"
    },
    likes: 128,
    commentsCount: 16,
    createdAt: '1 day ago'
  }
];

export default function CommunityPage() {
  const { currentUser } = useApp();
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_POSTS);
  const [newPostText, setNewPostText] = useState('');
  const [likedPostIds, setLikedPostIds] = useState<string[]>([]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: {
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
        badge: currentUser.role === 'author' ? 'Author' : 'Reader'
      },
      content: newPostText.trim(),
      likes: 0,
      commentsCount: 0,
      createdAt: 'Just now'
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  const handleToggleLike = (postId: string) => {
    setLikedPostIds((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Literary Circle</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
          Community & Discourse
        </h1>
        <p className="text-xs sm:text-sm text-ink-500">
          Connect with fellow authors and readers, share writing breakthroughs, and discuss serialized prose.
        </p>
      </div>

      {/* Post Creator */}
      <form onSubmit={handleCreatePost} className="p-4 rounded-2xl border border-border/70 bg-card shadow-sm space-y-3">
        <div className="flex items-center gap-2.5">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover ring-1 ring-amber-500/40"
          />
          <span className="font-serif font-bold text-xs text-ink-900 dark:text-ink-100">
            {currentUser.name}
          </span>
          <span className="text-[10px] text-ink-400 capitalize">({currentUser.role})</span>
        </div>

        <textarea
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          placeholder="Share a thought, writing update, or favorite story excerpt..."
          rows={3}
          className="w-full bg-transparent text-xs sm:text-sm text-ink-900 dark:text-ink-100 placeholder:text-ink-400 focus:outline-none resize-none leading-relaxed"
        />

        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          <span className="text-[11px] text-ink-400">
            Keep discussions respectful and spoiler-free.
          </span>
          <button
            type="submit"
            disabled={!newPostText.trim()}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 text-ink-950 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish Reflection</span>
          </button>
        </div>
      </form>

      {/* Community Feed */}
      <div className="space-y-4">
        {posts.map((post) => {
          const isLiked = likedPostIds.includes(post.id);
          return (
            <div
              key={post.id}
              className="p-5 rounded-2xl border border-border/60 bg-card/70 space-y-3 hover:border-amber-500/40 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between">
                <Link
                  href={`/profile/${post.author.username}`}
                  className="flex items-center gap-3 group"
                >
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-border group-hover:ring-amber-500/50 transition-all"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif font-bold text-sm text-ink-900 dark:text-ink-100 group-hover:text-amber-500 transition-colors">
                        {post.author.name}
                      </span>
                      {post.author.badge && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-500">
                          {post.author.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-ink-400">
                      @{post.author.username} · {post.createdAt}
                    </div>
                  </div>
                </Link>
              </div>

              <p className="text-xs sm:text-sm text-ink-800 dark:text-ink-200 leading-relaxed font-sans">
                {post.content}
              </p>

              {post.taggedStory && (
                <Link
                  href={`/story/${post.taggedStory.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ink-100/60 dark:bg-ink-900/60 border border-border/60 text-xs text-amber-600 dark:text-amber-400 font-medium hover:border-amber-500 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Discussing: {post.taggedStory.title}</span>
                </Link>
              )}

              <div className="pt-2 border-t border-border/40 flex items-center gap-6 text-xs text-ink-400">
                <button
                  onClick={() => handleToggleLike(post.id)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    isLiked ? 'text-rose-500 font-semibold' : 'hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{post.likes + (isLiked ? 1 : 0)} Likes</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-amber-500" />
                  <span>{post.commentsCount} Comments</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
