'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageService } from '@/services/storage';
import { Story, User, ReadingProgress, ReadingList, Report, NotificationItem } from '@/types';
import rawStories from '@/data/stories.json';

interface AppContextType {
  currentUser: User;
  switchUser: (role: 'reader' | 'author' | 'admin') => void;
  updateUserProfile: (updates: Partial<User>) => void;
  stories: Story[];
  bookmarks: string[];
  toggleBookmark: (storyId: string) => void;
  isBookmarked: (storyId: string) => boolean;
  likedStories: string[];
  toggleLikeStory: (storyId: string) => void;
  isStoryLiked: (storyId: string) => boolean;
  followedAuthors: string[];
  toggleFollowAuthor: (authorId: string) => void;
  isFollowingAuthor: (authorId: string) => boolean;
  readingProgress: Record<string, ReadingProgress>;
  saveReadingProgress: (storyId: string, chapterId: string, chapterNumber: number, percent: number) => void;
  readingLists: ReadingList[];
  createReadingList: (name: string, description: string) => ReadingList;
  addStoryToList: (listId: string, storyId: string) => void;
  removeStoryFromList: (listId: string, storyId: string) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadCount: number;
  reports: Report[];
  submitReport: (report: Omit<Report, 'id' | 'createdAt' | 'status'>) => void;
  updateReportStatus: (reportId: string, status: 'resolved' | 'dismissed') => void;
  bannedUsers: string[];
  toggleBanUser: (userId: string) => void;
  saveStory: (story: Story) => void;
  deleteStory: (storyId: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(() => StorageService.getCurrentUser());
  const [stories, setStories] = useState<Story[]>(() => rawStories as unknown as Story[]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [likedStories, setLikedStories] = useState<string[]>([]);
  const [followedAuthors, setFollowedAuthors] = useState<string[]>([]);
  const [readingProgress, setReadingProgress] = useState<Record<string, ReadingProgress>>({});
  const [readingLists, setReadingLists] = useState<ReadingList[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [bannedUsers, setBannedUsers] = useState<string[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const syncState = () => {
    StorageService.initialize();
    setCurrentUser(StorageService.getCurrentUser());
    setStories(StorageService.getStories());
    setBookmarks(StorageService.getBookmarks());
    setLikedStories(StorageService.getLikedStories());
    setFollowedAuthors(StorageService.getFollowedAuthors());
    setReadingProgress(StorageService.getAllReadingProgress());
    setReadingLists(StorageService.getReadingLists());
    setNotifications(StorageService.getNotifications());
    setReports(StorageService.getReports());
    setBannedUsers(StorageService.getBannedUsers());
  };

  useEffect(() => {
    syncState();

    const storedTheme = window.localStorage.getItem('velumbra_theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme);
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Default to dark for premium editorial look
      document.documentElement.classList.add('dark');
    }

    const handleStorageChange = () => {
      syncState();
    };

    window.addEventListener('velumbra_storage_change', handleStorageChange);
    return () => {
      window.removeEventListener('velumbra_storage_change', handleStorageChange);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    window.localStorage.setItem('velumbra_theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSwitchUser = (role: 'reader' | 'author' | 'admin') => {
    StorageService.switchUser(role);
    syncState();
  };

  const handleUpdateProfile = (updates: Partial<User>) => {
    const updated = StorageService.updateUserProfile(updates);
    setCurrentUser(updated);
  };

  const handleToggleBookmark = (storyId: string) => {
    StorageService.toggleBookmark(storyId);
    syncState();
  };

  const handleToggleLikeStory = (storyId: string) => {
    StorageService.toggleLikeStory(storyId);
    syncState();
  };

  const handleToggleFollowAuthor = (authorId: string) => {
    StorageService.toggleFollowAuthor(authorId);
    syncState();
  };

  const handleSaveReadingProgress = (storyId: string, chapterId: string, chapterNumber: number, percent: number) => {
    StorageService.saveReadingProgress(storyId, chapterId, chapterNumber, percent);
    syncState();
  };

  const handleCreateReadingList = (name: string, description: string) => {
    const list = StorageService.createReadingList(name, description);
    syncState();
    return list;
  };

  const handleAddStoryToList = (listId: string, storyId: string) => {
    StorageService.addStoryToReadingList(listId, storyId);
    syncState();
  };

  const handleRemoveStoryFromList = (listId: string, storyId: string) => {
    StorageService.removeStoryFromReadingList(listId, storyId);
    syncState();
  };

  const handleMarkNotificationAsRead = (id: string) => {
    StorageService.markNotificationAsRead(id);
    syncState();
  };

  const handleMarkAllNotificationsAsRead = () => {
    StorageService.markAllNotificationsAsRead();
    syncState();
  };

  const handleSubmitReport = (report: Omit<Report, 'id' | 'createdAt' | 'status'>) => {
    StorageService.createReport(report);
    syncState();
  };

  const handleUpdateReportStatus = (reportId: string, status: 'resolved' | 'dismissed') => {
    StorageService.updateReportStatus(reportId, status);
    syncState();
  };

  const handleToggleBanUser = (userId: string) => {
    StorageService.toggleBanUser(userId);
    syncState();
  };

  const handleSaveStory = (story: Story) => {
    StorageService.saveStory(story);
    syncState();
  };

  const handleDeleteStory = (storyId: string) => {
    StorageService.deleteStory(storyId);
    syncState();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchUser: handleSwitchUser,
        updateUserProfile: handleUpdateProfile,
        stories,
        bookmarks,
        toggleBookmark: handleToggleBookmark,
        isBookmarked: (id) => bookmarks.includes(id),
        likedStories,
        toggleLikeStory: handleToggleLikeStory,
        isStoryLiked: (id) => likedStories.includes(id),
        followedAuthors,
        toggleFollowAuthor: handleToggleFollowAuthor,
        isFollowingAuthor: (id) => followedAuthors.includes(id),
        readingProgress,
        saveReadingProgress: handleSaveReadingProgress,
        readingLists,
        createReadingList: handleCreateReadingList,
        addStoryToList: handleAddStoryToList,
        removeStoryFromList: handleRemoveStoryFromList,
        notifications,
        markNotificationAsRead: handleMarkNotificationAsRead,
        markAllNotificationsAsRead: handleMarkAllNotificationsAsRead,
        unreadCount,
        reports,
        submitReport: handleSubmitReport,
        updateReportStatus: handleUpdateReportStatus,
        bannedUsers,
        toggleBanUser: handleToggleBanUser,
        saveStory: handleSaveStory,
        deleteStory: handleDeleteStory,
        theme,
        toggleTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
