'use client';

import rawStories from '@/data/stories.json';
import { Story, Chapter, User, Comment, ReadingProgress, ReadingList, Report, NotificationItem } from '@/types';
import { DEMO_USERS, INITIAL_NOTIFICATIONS, INITIAL_REPORTS, INITIAL_READING_LISTS } from '@/data/mockUsers';

const STORAGE_KEYS = {
  STORIES: 'velumbra_stories_v1',
  CURRENT_USER: 'velumbra_current_user_v1',
  BOOKMARKS: 'velumbra_bookmarks_v1',
  LIKED_STORIES: 'velumbra_liked_stories_v1',
  LIKED_CHAPTERS: 'velumbra_liked_chapters_v1',
  FOLLOWED_AUTHORS: 'velumbra_followed_authors_v1',
  READING_PROGRESS: 'velumbra_reading_progress_v1',
  READING_LISTS: 'velumbra_reading_lists_v1',
  COMMENTS: 'velumbra_comments_v1',
  REPORTS: 'velumbra_reports_v1',
  NOTIFICATIONS: 'velumbra_notifications_v1',
  BANNED_USERS: 'velumbra_banned_users_v1'
};

function getLocalData<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
}

function setLocalData<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event('velumbra_storage_change'));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
}

export class StorageService {
  // Initialize / Seed
  static initialize() {
    if (typeof window === 'undefined') return;
    if (!window.localStorage.getItem(STORAGE_KEYS.STORIES)) {
      window.localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(rawStories));
    }
    if (!window.localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      window.localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEMO_USERS.reader));
    }
    if (!window.localStorage.getItem(STORAGE_KEYS.READING_LISTS)) {
      window.localStorage.setItem(STORAGE_KEYS.READING_LISTS, JSON.stringify(INITIAL_READING_LISTS));
    }
    if (!window.localStorage.getItem(STORAGE_KEYS.REPORTS)) {
      window.localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(INITIAL_REPORTS));
    }
    if (!window.localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      window.localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
    }
    if (!window.localStorage.getItem(STORAGE_KEYS.BOOKMARKS)) {
      window.localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(["story-1", "story-13", "story-23"]));
    }
    if (!window.localStorage.getItem(STORAGE_KEYS.READING_PROGRESS)) {
      const initialProgress: Record<string, ReadingProgress> = {
        "story-1": {
          storyId: "story-1",
          chapterId: "ch-story-1-2",
          chapterNumber: 2,
          progressPercent: 65,
          lastReadAt: new Date(Date.now() - 3600000 * 4).toISOString()
        },
        "story-13": {
          storyId: "story-13",
          chapterId: "ch-story-13-1",
          chapterNumber: 1,
          progressPercent: 90,
          lastReadAt: new Date(Date.now() - 3600000 * 24).toISOString()
        }
      };
      window.localStorage.setItem(STORAGE_KEYS.READING_PROGRESS, JSON.stringify(initialProgress));
    }
  }

  // Stories
  static getStories(): Story[] {
    return getLocalData<Story[]>(STORAGE_KEYS.STORIES, rawStories as unknown as Story[]);
  }

  static getStoryBySlug(slug: string): Story | undefined {
    const stories = this.getStories();
    return stories.find(s => s.slug === slug);
  }

  static getStoryById(id: string): Story | undefined {
    const stories = this.getStories();
    return stories.find(s => s.id === id);
  }

  static getChapter(storySlug: string, chapterSlug: string): { story?: Story; chapter?: Chapter } {
    const story = this.getStoryBySlug(storySlug);
    if (!story) return {};
    const chapter = story.chapters.find(c => c.slug === chapterSlug);
    return { story, chapter };
  }

  static saveStory(story: Story): void {
    const stories = this.getStories();
    const index = stories.findIndex(s => s.id === story.id);
    if (index >= 0) {
      stories[index] = story;
    } else {
      stories.unshift(story);
    }
    setLocalData(STORAGE_KEYS.STORIES, stories);
  }

  static deleteStory(storyId: string): void {
    const stories = this.getStories().filter(s => s.id !== storyId);
    setLocalData(STORAGE_KEYS.STORIES, stories);
  }

  // Users & Session
  static getCurrentUser(): User {
    return getLocalData<User>(STORAGE_KEYS.CURRENT_USER, DEMO_USERS.reader);
  }

  static switchUser(roleOrUser: 'reader' | 'author' | 'admin' | User): void {
    if (typeof roleOrUser === 'string') {
      setLocalData(STORAGE_KEYS.CURRENT_USER, DEMO_USERS[roleOrUser]);
    } else {
      setLocalData(STORAGE_KEYS.CURRENT_USER, roleOrUser);
    }
  }

  static updateUserProfile(updates: Partial<User>): User {
    const current = this.getCurrentUser();
    const updated = { ...current, ...updates };
    setLocalData(STORAGE_KEYS.CURRENT_USER, updated);
    return updated;
  }

  // Bookmarks
  static getBookmarks(): string[] {
    return getLocalData<string[]>(STORAGE_KEYS.BOOKMARKS, ["story-1", "story-13"]);
  }

  static isBookmarked(storyId: string): boolean {
    return this.getBookmarks().includes(storyId);
  }

  static toggleBookmark(storyId: string): boolean {
    const bookmarks = this.getBookmarks();
    const exists = bookmarks.includes(storyId);
    const updated = exists ? bookmarks.filter(id => id !== storyId) : [...bookmarks, storyId];
    setLocalData(STORAGE_KEYS.BOOKMARKS, updated);
    
    // Update story bookmark count
    const story = this.getStoryById(storyId);
    if (story) {
      story.bookmarksCount = Math.max(0, story.bookmarksCount + (exists ? -1 : 1));
      this.saveStory(story);
    }
    return !exists;
  }

  // Likes
  static getLikedStories(): string[] {
    return getLocalData<string[]>(STORAGE_KEYS.LIKED_STORIES, []);
  }

  static isStoryLiked(storyId: string): boolean {
    return this.getLikedStories().includes(storyId);
  }

  static toggleLikeStory(storyId: string): boolean {
    const likes = this.getLikedStories();
    const exists = likes.includes(storyId);
    const updated = exists ? likes.filter(id => id !== storyId) : [...likes, storyId];
    setLocalData(STORAGE_KEYS.LIKED_STORIES, updated);

    const story = this.getStoryById(storyId);
    if (story) {
      story.likes = Math.max(0, story.likes + (exists ? -1 : 1));
      this.saveStory(story);
    }
    return !exists;
  }

  // Following Authors
  static getFollowedAuthors(): string[] {
    return getLocalData<string[]>(STORAGE_KEYS.FOLLOWED_AUTHORS, ["author-2"]);
  }

  static isFollowingAuthor(authorId: string): boolean {
    return this.getFollowedAuthors().includes(authorId);
  }

  static toggleFollowAuthor(authorId: string): boolean {
    const follows = this.getFollowedAuthors();
    const exists = follows.includes(authorId);
    const updated = exists ? follows.filter(id => id !== authorId) : [...follows, authorId];
    setLocalData(STORAGE_KEYS.FOLLOWED_AUTHORS, updated);
    return !exists;
  }

  // Reading Progress
  static getAllReadingProgress(): Record<string, ReadingProgress> {
    return getLocalData<Record<string, ReadingProgress>>(STORAGE_KEYS.READING_PROGRESS, {});
  }

  static getStoryProgress(storyId: string): ReadingProgress | undefined {
    const all = this.getAllReadingProgress();
    return all[storyId];
  }

  static saveReadingProgress(storyId: string, chapterId: string, chapterNumber: number, progressPercent: number): void {
    const all = this.getAllReadingProgress();
    all[storyId] = {
      storyId,
      chapterId,
      chapterNumber,
      progressPercent: Math.min(100, Math.max(0, progressPercent)),
      lastReadAt: new Date().toISOString()
    };
    setLocalData(STORAGE_KEYS.READING_PROGRESS, all);
  }

  // Reading Lists
  static getReadingLists(): ReadingList[] {
    return getLocalData<ReadingList[]>(STORAGE_KEYS.READING_LISTS, INITIAL_READING_LISTS);
  }

  static createReadingList(name: string, description: string, isPrivate: boolean = false): ReadingList {
    const lists = this.getReadingLists();
    const user = this.getCurrentUser();
    const newList: ReadingList = {
      id: `list-${Date.now()}`,
      userId: user.id,
      name,
      description,
      isPrivate,
      storyIds: [],
      createdAt: new Date().toISOString()
    };
    lists.push(newList);
    setLocalData(STORAGE_KEYS.READING_LISTS, lists);
    return newList;
  }

  static addStoryToReadingList(listId: string, storyId: string): void {
    const lists = this.getReadingLists();
    const target = lists.find(l => l.id === listId);
    if (target && !target.storyIds.includes(storyId)) {
      target.storyIds.push(storyId);
      setLocalData(STORAGE_KEYS.READING_LISTS, lists);
    }
  }

  static removeStoryFromReadingList(listId: string, storyId: string): void {
    const lists = this.getReadingLists();
    const target = lists.find(l => l.id === listId);
    if (target) {
      target.storyIds = target.storyIds.filter(id => id !== storyId);
      setLocalData(STORAGE_KEYS.READING_LISTS, lists);
    }
  }

  // Comments
  static getComments(storyId: string, chapterId?: string): Comment[] {
    const all = getLocalData<Comment[]>(STORAGE_KEYS.COMMENTS, [
      {
        id: "comm-demo-1",
        storyId: "story-1",
        chapterId: "ch-story-1-1",
        chapterNumber: 1,
        user: {
          id: "user-reader-1",
          username: "elena_vance",
          name: "Elena Vance",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
          role: "reader"
        },
        content: "The imagery of the cold cider wood and the unsent letters in the knothole is utterly breathtaking. I already need chapter two immediately!",
        createdAt: "2024-08-11T14:32:00Z",
        likes: 18,
        replies: [
          {
            id: "comm-demo-2",
            storyId: "story-1",
            user: {
              id: "author-1",
              username: "clara_vane",
              name: "Clara Vane",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
              role: "author"
            },
            content: "Thank you so much Elena! Chapter 2 explores the grandfather's ledger in detail.",
            createdAt: "2024-08-11T16:04:00Z",
            likes: 9
          }
        ]
      }
    ]);

    if (chapterId) {
      return all.filter(c => c.storyId === storyId && c.chapterId === chapterId);
    }
    return all.filter(c => c.storyId === storyId);
  }

  static addComment(storyId: string, content: string, chapterId?: string, chapterNumber?: number): Comment {
    const all = getLocalData<Comment[]>(STORAGE_KEYS.COMMENTS, []);
    const user = this.getCurrentUser();
    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      storyId,
      chapterId,
      chapterNumber,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        avatar: user.avatar,
        role: user.role
      },
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: []
    };
    all.unshift(newComment);
    setLocalData(STORAGE_KEYS.COMMENTS, all);

    // Update story comments count
    const story = this.getStoryById(storyId);
    if (story) {
      story.commentsCount += 1;
      this.saveStory(story);
    }
    return newComment;
  }

  // Reports (Admin & Moderation)
  static getReports(): Report[] {
    return getLocalData<Report[]>(STORAGE_KEYS.REPORTS, INITIAL_REPORTS);
  }

  static createReport(report: Omit<Report, 'id' | 'createdAt' | 'status'>): Report {
    const reports = this.getReports();
    const newReport: Report = {
      ...report,
      id: `rep-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    reports.unshift(newReport);
    setLocalData(STORAGE_KEYS.REPORTS, reports);
    return newReport;
  }

  static updateReportStatus(reportId: string, status: 'resolved' | 'dismissed'): void {
    const reports = this.getReports();
    const target = reports.find(r => r.id === reportId);
    if (target) {
      target.status = status;
      setLocalData(STORAGE_KEYS.REPORTS, reports);
    }
  }

  // Notifications
  static getNotifications(): NotificationItem[] {
    return getLocalData<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }

  static markNotificationAsRead(id: string): void {
    const notifs = this.getNotifications();
    const target = notifs.find(n => n.id === id);
    if (target) {
      target.read = true;
      setLocalData(STORAGE_KEYS.NOTIFICATIONS, notifs);
    }
  }

  static markAllNotificationsAsRead(): void {
    const notifs = this.getNotifications().map(n => ({ ...n, read: true }));
    setLocalData(STORAGE_KEYS.NOTIFICATIONS, notifs);
  }

  // Admin ban
  static getBannedUsers(): string[] {
    return getLocalData<string[]>(STORAGE_KEYS.BANNED_USERS, []);
  }

  static toggleBanUser(userId: string): boolean {
    const banned = this.getBannedUsers();
    const isBanned = banned.includes(userId);
    const updated = isBanned ? banned.filter(id => id !== userId) : [...banned, userId];
    setLocalData(STORAGE_KEYS.BANNED_USERS, updated);
    return !isBanned;
  }
}
