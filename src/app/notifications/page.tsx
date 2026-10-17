'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Bell,
  CheckCheck,
  BookOpen,
  UserPlus,
  Heart,
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function NotificationsPage() {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadCount
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'chapters'>('all');

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'unread') return !n.read;
    if (activeTab === 'chapters') return n.type === 'chapter';
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'chapter':
        return <BookOpen className="w-4 h-4 text-amber-500" />;
      case 'follower':
        return <UserPlus className="w-4 h-4 text-emerald-500" />;
      case 'like':
        return <Heart className="w-4 h-4 text-rose-500" />;
      case 'comment':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/40">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            <Bell className="w-4 h-4" />
            <span>Activity Stream</span>
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
            Notifications Center
          </h1>
          <p className="text-xs text-ink-500">
            Real-time releases from followed authors, comments, and milestones.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-ink-950 transition-colors flex items-center gap-1.5 self-start sm:self-center"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All As Read</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border/50 gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-3 transition-colors border-b-2 ${
            activeTab === 'all'
              ? 'border-amber-500 text-amber-500'
              : 'border-transparent text-ink-500 hover:text-ink-900 dark:hover:text-ink-100'
          }`}
        >
          All Alerts ({notifications.length})
        </button>

        <button
          onClick={() => setActiveTab('unread')}
          className={`pb-3 transition-colors border-b-2 ${
            activeTab === 'unread'
              ? 'border-amber-500 text-amber-500'
              : 'border-transparent text-ink-500 hover:text-ink-900 dark:hover:text-ink-100'
          }`}
        >
          Unread ({unreadCount})
        </button>

        <button
          onClick={() => setActiveTab('chapters')}
          className={`pb-3 transition-colors border-b-2 ${
            activeTab === 'chapters'
              ? 'border-amber-500 text-amber-500'
              : 'border-transparent text-ink-500 hover:text-ink-900 dark:hover:text-ink-100'
          }`}
        >
          Chapter Releases
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-border/70 rounded-2xl bg-card/30">
            <Bell className="w-8 h-8 text-ink-400 mx-auto mb-2 opacity-50" />
            <p className="text-xs text-ink-500">No notifications to display in this view.</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => (
            <Link
              key={notif.id}
              href={notif.link}
              onClick={() => markNotificationAsRead(notif.id)}
              className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                notif.read
                  ? 'border-border/50 bg-card/60 hover:bg-card text-ink-700 dark:text-ink-300'
                  : 'border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/15 text-ink-900 dark:text-ink-50 shadow-sm'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-card border border-border/60 flex items-center justify-center shrink-0">
                {getIcon(notif.type)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-serif font-bold text-sm truncate">{notif.title}</h3>
                  <span className="text-[10px] text-ink-400 shrink-0">
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-ink-600 dark:text-ink-300 mt-0.5 leading-relaxed">
                  {notif.message}
                </p>
              </div>

              <div className="self-center">
                <ArrowRight className="w-4 h-4 text-ink-400" />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
