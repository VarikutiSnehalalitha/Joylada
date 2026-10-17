'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Search,
  BookOpen,
  Feather,
  Bell,
  Sun,
  Moon,
  Bookmark,
  Shield,
  User as UserIcon,
  CheckCheck,
  ChevronDown,
  Sparkles,
  BarChart3,
  PenTool,
  LogOut,
  X,
  Compass
} from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const {
    currentUser,
    switchUser,
    notifications,
    unreadCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    theme,
    toggleTheme
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifDropdown(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchModal(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-card/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-ink-950 shadow-md group-hover:scale-105 transition-transform">
              <Feather className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-wider text-ink-900 dark:text-ink-50 group-hover:text-amber-500 transition-colors">
                VELUMBRA
              </span>
              <span className="text-[9px] tracking-widest uppercase font-medium text-amber-600/90 dark:text-amber-400/80 -mt-1">
                Literary Universe
              </span>
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/discover"
              className="text-ink-600 dark:text-ink-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4" />
              <span>Discover</span>
            </Link>
            <Link
              href="/browse"
              className="text-ink-600 dark:text-ink-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse</span>
            </Link>
            <Link
              href="/library"
              className="text-ink-600 dark:text-ink-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Bookmark className="w-4 h-4" />
              <span>Library</span>
            </Link>
            <Link
              href="/studio"
              className="text-ink-600 dark:text-ink-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <PenTool className="w-4 h-4" />
              <span>Studio</span>
            </Link>
            <Link
              href="/community"
              className="text-ink-600 dark:text-ink-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Community</span>
            </Link>
          </nav>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden lg:flex items-center flex-1 max-w-xs xl:max-w-sm">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 70 stories, authors, tags..."
              className="w-full pl-9 pr-4 py-1.5 rounded-full text-xs bg-ink-100/70 dark:bg-ink-900/70 border border-border/70 focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/80 focus:outline-none transition-all placeholder:text-ink-400"
            />
            <Search className="w-4 h-4 text-ink-400 absolute left-3 top-2.5" />
          </form>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Button */}
          <button
            onClick={() => setShowSearchModal(true)}
            className="lg:hidden p-2 rounded-lg text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-ink-700" />
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="relative p-2 rounded-lg text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-card" />
              )}
            </button>

            {showNotifDropdown && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-border/70 bg-card p-3 shadow-elevated z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-ink-900 dark:text-ink-100">
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-rose-500 text-white">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <CheckCheck className="w-3 h-3" /> Mark all read
                    </button>
                  )}
                </div>

                <div className="mt-2 max-h-72 overflow-y-auto space-y-2">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-xs text-ink-400">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <Link
                        key={n.id}
                        href={n.link}
                        onClick={() => {
                          markNotificationAsRead(n.id);
                          setShowNotifDropdown(false);
                        }}
                        className={`block p-2.5 rounded-lg text-xs transition-colors ${
                          n.read
                            ? 'hover:bg-ink-100/50 dark:hover:bg-ink-900/50 opacity-80'
                            : 'bg-amber-500/10 hover:bg-amber-500/20 font-medium'
                        }`}
                      >
                        <div className="text-ink-900 dark:text-ink-100 font-semibold mb-0.5">
                          {n.title}
                        </div>
                        <div className="text-ink-600 dark:text-ink-300 leading-snug">
                          {n.message}
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Write CTA */}
          <Link
            href="/studio"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500 text-ink-950 hover:bg-amber-400 transition-colors shadow-sm"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Write</span>
          </Link>

          {/* User Persona & Profile Dropdown */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full border border-border/70 hover:border-amber-500/50 hover:bg-card transition-all"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-amber-500/30"
              />
              <span className="hidden xl:inline text-xs font-medium text-ink-800 dark:text-ink-200 max-w-[100px] truncate">
                {currentUser.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-ink-400" />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl border border-border/70 bg-card p-3 shadow-elevated z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {/* Persona Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-border/50">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/50"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-ink-900 dark:text-ink-100 truncate">
                      {currentUser.name}
                    </div>
                    <div className="text-[11px] text-ink-500 truncate">
                      @{currentUser.username}
                    </div>
                    <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[10px] font-semibold uppercase bg-amber-500/20 text-amber-600 dark:text-amber-400">
                      {currentUser.role}
                    </span>
                  </div>
                </div>

                {/* Quick Persona Switcher for pair-testing */}
                <div className="my-2.5 p-2 rounded-lg bg-ink-100/60 dark:bg-ink-900/60 text-xs">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-400 mb-1.5">
                    Switch Demo Persona:
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      onClick={() => switchUser('reader')}
                      className={`px-2 py-1 rounded text-center text-[11px] font-medium transition-colors ${
                        currentUser.role === 'reader'
                          ? 'bg-amber-500 text-ink-950 font-bold'
                          : 'hover:bg-card text-ink-600 dark:text-ink-300'
                      }`}
                    >
                      Reader
                    </button>
                    <button
                      onClick={() => switchUser('author')}
                      className={`px-2 py-1 rounded text-center text-[11px] font-medium transition-colors ${
                        currentUser.role === 'author'
                          ? 'bg-amber-500 text-ink-950 font-bold'
                          : 'hover:bg-card text-ink-600 dark:text-ink-300'
                      }`}
                    >
                      Author
                    </button>
                    <button
                      onClick={() => switchUser('admin')}
                      className={`px-2 py-1 rounded text-center text-[11px] font-medium transition-colors ${
                        currentUser.role === 'admin'
                          ? 'bg-amber-500 text-ink-950 font-bold'
                          : 'hover:bg-card text-ink-600 dark:text-ink-300'
                      }`}
                    >
                      Admin
                    </button>
                  </div>
                </div>

                {/* Dropdown Menu Links */}
                <div className="space-y-1 text-xs">
                  <Link
                    href={`/profile/${currentUser.username}`}
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-ink-700 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-900 transition-colors"
                  >
                    <UserIcon className="w-4 h-4 text-amber-500" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    href="/library"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-ink-700 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-900 transition-colors"
                  >
                    <Bookmark className="w-4 h-4 text-amber-500" />
                    <span>Reading Library</span>
                  </Link>

                  <Link
                    href="/studio"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-ink-700 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-900 transition-colors"
                  >
                    <PenTool className="w-4 h-4 text-amber-500" />
                    <span>Writing Studio</span>
                  </Link>

                  <Link
                    href="/author/dashboard"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-ink-700 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-900 transition-colors"
                  >
                    <BarChart3 className="w-4 h-4 text-amber-500" />
                    <span>Author Analytics</span>
                  </Link>

                  {currentUser.role === 'admin' && (
                    <Link
                      href="/admin"
                      onClick={() => setShowUserDropdown(false)}
                      className="flex items-center gap-2 px-2.5 py-2 rounded-lg font-medium text-rose-500 hover:bg-rose-500/10 transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Admin Control Center</span>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start pt-20 px-4">
          <div className="w-full max-w-lg mx-auto bg-card rounded-2xl border border-border p-4 shadow-elevated">
            <div className="flex items-center justify-between pb-3 border-b border-border/50">
              <span className="font-serif font-bold text-sm">Search Velumbra</span>
              <button
                onClick={() => setShowSearchModal(false)}
                className="p-1 rounded-lg text-ink-400 hover:text-ink-900 dark:hover:text-ink-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="mt-3">
              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 70 stories, authors, or genres..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-ink-100/80 dark:bg-ink-900/80 border border-border focus:border-amber-500 focus:outline-none"
                />
                <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-3" />
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSearchModal(false)}
                  className="px-3 py-1.5 text-xs text-ink-500 hover:text-ink-900 dark:hover:text-ink-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 text-ink-950 hover:bg-amber-400"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
