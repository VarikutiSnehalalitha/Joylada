# Velumbra — The Modern Editorial Story Universe

Velumbra is a premier **social storytelling and reading platform** inspired by the serial storytelling model of Wattpad, but built with a completely original, high-end editorial aesthetic.

Designed with an editorial sensibility—classic serif typography, generous spacing, subtle borders, rich dark mode, vintage sepia, and distraction-free reader controls.

---

## Key Features

### 1. Preloaded Library (70 Seed Novels & 210 Chapters)
Strictly adheres to the required editorial distribution:
- **Romance** — 12 novels
- **Fantasy** — 10 novels
- **Mystery & Thriller** — 8 novels
- **Young Adult** — 8 novels
- **Science Fiction** — 6 novels
- **Horror** — 6 novels
- **Adventure** — 5 novels
- **Historical Fiction** — 4 novels
- **Contemporary Fiction** — 4 novels
- **Fan-inspired original fiction** — 3 novels
- **LGBTQ+ Fiction** — 2 novels
- **Poetry & Short Stories** — 2 novels
- **Total: 70 distinct novels** and **210 multi-paragraph original chapters** (400–800 words/chapter).

### 2. Distraction-Free Reading Interface (`/read/[storySlug]/[chapterSlug]`)
- **Theme Switcher**: Light (Ivory Paper), Dark (Onyx Slate), Sepia (Vintage Parchment), Midnight (OLED Black)
- **Typography Controls**: Editorial Serif, Modern Sans, Monospace; 4 font sizes; 3 line-height modes; 4 content widths
- **Chapter Progress & Auto-Save**: Real-time reading progress bar pinned at top, auto-saved to user history and personal library
- **Navigation**: Previous / Next chapter buttons, Table of Contents drawer, and keyboard shortcuts (`←` / `→` or `j` / `k`)
- **Interactive Engagement**: Chapter bookmarks, chapter likes, inline comments drawer, and share modal

### 3. Story Explorer & Advanced Search (`/browse`)
- Full-text search across story titles, authors, synopses, and tags
- Multi-faceted filters for Genre, Status (Ongoing/Completed), Content Rating (All Ages, Teen, Mature), and Specific Tags
- Sorting by Trending, Most Read, Most Liked, Editor's Picks, Recently Updated, and Chapter Count
- Grid View vs. Editorial List View toggle with pagination

### 4. Author Writing Studio (`/studio`)
- Create new stories with cover URL, synopsis, genre, tags, and maturity rating
- Chapter management: Add chapters, reorder, manage draft/published/scheduled status
- Rich text formatting shortcuts (Bold, Italic, Headings, Quotes, Dividers, Bullet Lists)
- Live word count and estimated reading time
- Real-time autosave engine with visual status indicator ("All changes saved" / "Saving...")
- Live Chapter Preview mode

### 5. Author Analytics Dashboard (`/author/dashboard`)
- Key metrics: Total Reads, Followers, Endorsements (Likes), Literary Comments
- Manuscript performance breakdown table with completion rate tracking
- Chapter retention curve and drop-off visualization
- Real-time reader interaction activity stream

### 6. Personal Library (`/library`)
- **Currently Reading**: Shows exact chapter position and progress bar with one-click "Resume Reading"
- **Bookmarked**: Fast access to saved manuscripts
- **Finished Stories**: Archive of completed reads
- **Custom Reading Lists**: Create and manage themed story collections

### 7. Social & Community Discourse (`/community`)
- Community discussion feed with author reflections and story discussions
- Comment threads on every story and chapter with nested replies and author badges
- Author follow/unfollow system with automatic feed updates

### 8. Admin Control Center (`/admin`)
- Platform catalog metrics and genre balance breakdown
- Content moderation queue to review reported stories, chapters, and comments with resolve/dismiss actions
- Story curation: Feature stories, toggle Trending badges, toggle Editor's Picks
- User enforcement: Account suspensions and ban management

### 9. Multi-Persona Authentication (`/auth/login`)
- Instant one-click switch between demo personas:
  - **Reader Persona**: Elena Vance
  - **Author Persona**: Julian Cross
  - **Admin Persona**: Alistair Sterling (Chief Editor)
- User profile editing with custom avatar, bio, and name

---

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Database Seeder
```bash
npm run seed
```
Validates and seeds all 70 stories and 210 chapters with zero duplicates.

### Start Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```
The application will be running at `http://localhost:3000`.
