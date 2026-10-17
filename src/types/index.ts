export type UserRole = 'reader' | 'author' | 'admin';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  role: UserRole;
  followersCount: number;
  followingCount: number;
  storiesCount: number;
  joinedDate: string;
  badges?: string[];
  website?: string;
  isBanned?: boolean;
}

export type StoryStatus = 'ongoing' | 'completed';
export type ContentRating = 'All Ages' | 'Teen (13+)' | 'Mature (18+)';
export type ChapterStatus = 'published' | 'draft' | 'scheduled';

export interface Chapter {
  id: string;
  storyId: string;
  chapterNumber: number;
  title: string;
  slug: string;
  content: string;
  wordCount: number;
  readingTimeMinutes: number;
  publishDate: string;
  status: ChapterStatus;
  views: number;
  likes: number;
  commentsCount: number;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  authorId: string;
  author: User;
  synopsis: string;
  coverImage: string;
  genre: string;
  tags: string[];
  wordCount: number;
  chapterCount: number;
  readingTimeMinutes: number;
  reads: number;
  likes: number;
  commentsCount: number;
  bookmarksCount: number;
  status: StoryStatus;
  rating: ContentRating;
  contentWarnings: string[];
  isFeatured: boolean;
  isTrending: boolean;
  isEditorPick: boolean;
  isRecommended: boolean;
  createdAt: string;
  updatedAt: string;
  chapters: Chapter[];
}

export interface Comment {
  id: string;
  storyId: string;
  chapterId?: string;
  chapterNumber?: number;
  user: {
    id: string;
    username: string;
    name: string;
    avatar: string;
    role?: UserRole;
  };
  content: string;
  createdAt: string;
  likes: number;
  replies?: Comment[];
}

export interface ReadingProgress {
  storyId: string;
  chapterId: string;
  chapterNumber: number;
  progressPercent: number;
  lastReadAt: string;
}

export interface ReadingList {
  id: string;
  userId: string;
  name: string;
  description: string;
  isPrivate: boolean;
  storyIds: string[];
  createdAt: string;
}

export type ReportTargetType = 'story' | 'chapter' | 'comment' | 'user';
export type ReportStatus = 'pending' | 'resolved' | 'dismissed';

export interface Report {
  id: string;
  targetType: ReportTargetType;
  targetId: string;
  targetTitle: string;
  reason: string;
  details: string;
  reportedBy: string;
  status: ReportStatus;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: 'chapter' | 'follower' | 'comment' | 'like' | 'milestone' | 'announcement';
  title: string;
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
}

export interface ReaderPreferences {
  fontFamily: 'serif' | 'sans' | 'mono' | 'merriweather';
  fontSize: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  lineHeight: 'compact' | 'normal' | 'relaxed';
  contentWidth: 'narrow' | 'medium' | 'wide' | 'full';
  theme: 'light' | 'dark' | 'sepia' | 'midnight';
}

export interface GenreItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  storyCount: number;
  accentColor: string;
  iconName: string;
  bannerImage: string;
}
