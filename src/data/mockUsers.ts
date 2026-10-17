import { User, NotificationItem, Report, ReadingList } from '@/types';

export const DEMO_USERS: Record<string, User> = {
  reader: {
    id: "user-reader-1",
    username: "elena_vance",
    name: "Elena Vance",
    email: "elena@velumbra.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    bio: "Voracious reader of historical mysteries and slow-burn gothic romance. Annotator of late-night thoughts.",
    role: "reader",
    followersCount: 142,
    followingCount: 38,
    storiesCount: 0,
    joinedDate: "2024-02-14",
    badges: ["Avid Reader", "Midnight Scroller", "Community Star"],
    website: "https://elenavance.reading"
  },
  author: {
    id: "author-2",
    username: "julian_cross",
    name: "Julian Cross",
    email: "julian@velumbra.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    bio: "High fantasy architect, worldbuilder, and creator of forgotten magic systems. Author of The Crown of Pale Ash.",
    role: "author",
    followersCount: 28900,
    followingCount: 112,
    storiesCount: 8,
    joinedDate: "2022-11-03",
    badges: ["Prolific Scribe", "Fantasy Maestro", "Bestseller"],
    website: "https://juliancross.lore"
  },
  admin: {
    id: "user-admin-1",
    username: "editor_in_chief",
    name: "Alistair Sterling",
    email: "chief.editor@velumbra.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    bio: "Head Curator and Platform Moderator at Velumbra. Ensuring high literary standards and reader safety.",
    role: "admin",
    followersCount: 8520,
    followingCount: 420,
    storiesCount: 3,
    joinedDate: "2022-01-01",
    badges: ["Platform Guardian", "Founding Editor"]
  }
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    userId: "user-reader-1",
    type: "chapter",
    title: "New Chapter Published",
    message: "Julian Cross released Chapter 3: 'The Breath of Old Flame' in The Crown of Pale Ash.",
    link: "/read/the-crown-of-pale-ash/the-breath-of-old-flame",
    read: false,
    createdAt: "2024-09-02T14:20:00Z"
  },
  {
    id: "notif-2",
    userId: "user-reader-1",
    type: "follower",
    title: "New Follower",
    message: "Clara Vane started following your reading lists.",
    link: "/profile/clara_vane",
    read: false,
    createdAt: "2024-09-01T10:15:00Z"
  },
  {
    id: "notif-3",
    userId: "user-reader-1",
    type: "like",
    title: "Comment Liked",
    message: "Arthur Pendleton liked your review on 'The Edinburgh Cipher'.",
    link: "/story/the-edinburgh-cipher",
    read: true,
    createdAt: "2024-08-30T19:40:00Z"
  },
  {
    id: "notif-4",
    userId: "user-reader-1",
    type: "announcement",
    title: "Velumbra Autumn Reading Challenge",
    message: "Read 5 completed stories this month to unlock the gilded Autumn Scholar badge.",
    link: "/browse",
    read: true,
    createdAt: "2024-08-28T09:00:00Z"
  }
];

export const INITIAL_REPORTS: Report[] = [
  {
    id: "rep-1",
    targetType: "comment",
    targetId: "comm-842",
    targetTitle: "Comment on Chapter 2 of 'Synthetic Dawn'",
    reason: "Offensive language & spam link",
    details: "User posted unauthorized promotion in discussion thread.",
    reportedBy: "clara_vane",
    status: "pending",
    createdAt: "2024-09-02T08:14:00Z"
  },
  {
    id: "rep-2",
    targetType: "story",
    targetId: "story-5",
    targetTitle: "The Parisian Manuscript",
    reason: "Tag mismatch",
    details: "Story was tagged as Sci-Fi instead of Romance.",
    reportedBy: "mira_chen",
    status: "resolved",
    createdAt: "2024-08-25T11:30:00Z"
  },
  {
    id: "rep-3",
    targetType: "user",
    targetId: "user-bot-99",
    targetTitle: "User @spambot_303",
    reason: "Automated scraping bot",
    details: "Rapid suspicious profile activity detected across multiple stories.",
    reportedBy: "system_detector",
    status: "pending",
    createdAt: "2024-09-01T22:05:00Z"
  }
];

export const INITIAL_READING_LISTS: ReadingList[] = [
  {
    id: "list-1",
    userId: "user-reader-1",
    name: "Nocturnal Gothic & Mysteries",
    description: "Atmospheric stories to be read exclusively after midnight with hot tea.",
    isPrivate: false,
    storyIds: ["story-13", "story-23", "story-37", "story-2"],
    createdAt: "2024-08-15T12:00:00Z"
  },
  {
    id: "list-2",
    userId: "user-reader-1",
    name: "Heart-Stopping Slow Burns",
    description: "Tension so sharp you can slice parchment with it.",
    isPrivate: false,
    storyIds: ["story-1", "story-5", "story-11", "story-69"],
    createdAt: "2024-08-20T16:00:00Z"
  }
];
