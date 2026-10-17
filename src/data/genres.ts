import { GenreItem } from '@/types';

export const GENRES: GenreItem[] = [
  {
    id: "genre-romance",
    name: "Romance",
    slug: "romance",
    description: "Heartwarming, slow-burn, enemies-to-lovers, and unforgettable emotional journeys.",
    storyCount: 12,
    accentColor: "from-rose-500/20 to-pink-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/40",
    iconName: "Heart",
    bannerImage: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "genre-fantasy",
    name: "Fantasy",
    slug: "fantasy",
    description: "High magic, ancient dragons, forgotten realms, and epic mythical quests.",
    storyCount: 10,
    accentColor: "from-amber-500/20 to-violet-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/40",
    iconName: "Sparkles",
    bannerImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "genre-mystery",
    name: "Mystery & Thriller",
    slug: "mystery-thriller",
    description: "Noir investigators, psychological twists, cold cases, and atmospheric whodunits.",
    storyCount: 8,
    accentColor: "from-indigo-500/20 to-slate-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/40",
    iconName: "Search",
    bannerImage: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "genre-ya",
    name: "Young Adult",
    slug: "young-adult",
    description: "Coming-of-age adventures, academy rivalries, rebellion, and first loves.",
    storyCount: 8,
    accentColor: "from-teal-500/20 to-emerald-500/10 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-900/40",
    iconName: "Compass",
    bannerImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "genre-scifi",
    name: "Science Fiction",
    slug: "science-fiction",
    description: "Cyberpunk megacities, deep space fleets, artificial consciousness, and time loops.",
    storyCount: 6,
    accentColor: "from-cyan-500/20 to-blue-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-900/40",
    iconName: "Zap",
    bannerImage: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "genre-horror",
    name: "Horror",
    slug: "horror",
    description: "Folk legends, gothic mansions, cosmic dread, and unsettling psychological chills.",
    storyCount: 6,
    accentColor: "from-red-900/30 to-zinc-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/40",
    iconName: "Eye",
    bannerImage: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "genre-adventure",
    name: "Adventure",
    slug: "adventure",
    description: "Uncharted jungles, sunken galleons, polar expeditions, and high-stakes survival.",
    storyCount: 5,
    accentColor: "from-emerald-500/20 to-lime-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40",
    iconName: "MapPin",
    bannerImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "genre-historical",
    name: "Historical Fiction",
    slug: "historical-fiction",
    description: "Renaissance intrigues, Silk Road trade caravans, and wartime heroism.",
    storyCount: 4,
    accentColor: "from-amber-600/20 to-stone-500/10 text-amber-700 dark:text-amber-500 border-amber-300 dark:border-amber-800/40",
    iconName: "BookOpen",
    bannerImage: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "genre-contemporary",
    name: "Contemporary Fiction",
    slug: "contemporary-fiction",
    description: "Nuanced modern lives, career crossroads, urban connections, and family truths.",
    storyCount: 4,
    accentColor: "from-sky-500/20 to-blue-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-900/40",
    iconName: "Coffee",
    bannerImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "genre-fanfiction",
    name: "Fan-inspired original fiction",
    slug: "fan-inspired",
    description: "Original tributes honoring beloved magical academies, space westerns, and epic fellowships.",
    storyCount: 3,
    accentColor: "from-purple-500/20 to-pink-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/40",
    iconName: "Flame",
    bannerImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "genre-lgbtq",
    name: "LGBTQ+ Fiction",
    slug: "lgbtq-fiction",
    description: "Diverse queer romances, Parisian studios, coastal healings, and authentic identities.",
    storyCount: 2,
    accentColor: "from-fuchsia-500/20 to-rose-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-200 dark:border-fuchsia-900/40",
    iconName: "Sun",
    bannerImage: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "genre-poetry",
    name: "Poetry & Short Stories",
    slug: "poetry-short-stories",
    description: "Lyrical verses, intimate nocturnal reflections, and miniature neighborhood tales.",
    storyCount: 2,
    accentColor: "from-violet-500/20 to-indigo-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-900/40",
    iconName: "Feather",
    bannerImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80"
  }
];
