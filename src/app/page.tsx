'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { GENRES } from '@/data/genres';
import StoryCarousel from '@/components/story/StoryCarousel';
import StoryCard from '@/components/story/StoryCard';
import {
  Feather,
  BookOpen,
  Sparkles,
  ArrowRight,
  Search,
  PenTool,
  Award,
  Users,
  Compass,
  CheckCircle2,
  Quote,
  Flame,
  Bookmark
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const { stories } = useApp();
  const [heroSearch, setHeroSearch] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      router.push(`/browse?q=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  // Curated story selections
  const editorPicks = stories.filter((s) => s.isEditorPick).slice(0, 8);
  const trendingStories = stories.filter((s) => s.isTrending).slice(0, 8);
  const romanceStories = stories.filter((s) => s.genre === 'Romance').slice(0, 8);
  const fantasyStories = stories.filter((s) => s.genre === 'Fantasy').slice(0, 8);
  const mysteryStories = stories.filter((s) => s.genre === 'Mystery & Thriller').slice(0, 8);
  const yaStories = stories.filter((s) => s.genre === 'Young Adult').slice(0, 8);

  // Featured hero spotlight story
  const heroStory = stories.find((s) => s.slug === 'letters-from-the-orchard') || stories[0];

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 pb-12 border-b border-border/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Editorial Storytelling Experience</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink-900 dark:text-ink-50 leading-[1.12]">
                Where Every Word <br />
                <span className="italic font-normal text-amber-600 dark:text-amber-400">
                  Holds Resonance.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-ink-600 dark:text-ink-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
                Discover 70 original novels across 12 genres. Read chapter-by-chapter in distraction-free clarity, follow visionary authors, or author your next masterpiece.
              </p>

              {/* Universal Search Bar */}
              <form
                onSubmit={handleHeroSearch}
                className="max-w-lg mx-auto lg:mx-0 relative flex items-center shadow-elevated rounded-2xl overflow-hidden border border-border/80 bg-card p-1.5 focus-within:border-amber-500"
              >
                <Search className="w-5 h-5 text-ink-400 ml-3" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Search titles, authors, gothic mysteries, slow burn..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-transparent text-ink-900 dark:text-ink-100 placeholder:text-ink-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-amber-500 text-ink-950 hover:bg-amber-400 transition-colors shrink-0 shadow-sm"
                >
                  Explore
                </button>
              </form>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/discover"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-ink-900 text-white dark:bg-white dark:text-ink-950 hover:bg-ink-800 dark:hover:bg-ink-100 transition-all shadow-md group"
                >
                  <BookOpen className="w-4 h-4 text-amber-500" />
                  <span>Start Reading</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/studio"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-border/80 bg-card/60 hover:bg-card hover:border-amber-500/50 text-ink-800 dark:text-ink-200 transition-all shadow-sm"
                >
                  <PenTool className="w-4 h-4 text-amber-500" />
                  <span>Author a Story</span>
                </Link>
              </div>

              {/* Social Proof Tags */}
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-ink-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 70 Complete Seed Novels
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 210+ Literary Chapters
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Zero Ad Intrusions
                </span>
              </div>
            </div>

            {/* Right Hero Spotlight Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 to-rose-500 rounded-3xl blur-xl opacity-20 dark:opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                
                <div className="relative rounded-2xl border border-border bg-card p-5 shadow-elevated">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                      Curator Spotlight
                    </span>
                    <span className="text-ink-400 font-medium">Trending #1</span>
                  </div>

                  <Link href={`/story/${heroStory.slug}`} className="block relative aspect-[2/3] rounded-xl overflow-hidden book-shadow mb-4 group">
                    <img
                      src={heroStory.coverImage}
                      alt={heroStory.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                      <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
                        {heroStory.genre}
                      </span>
                      <h3 className="font-serif text-xl font-bold leading-tight mt-0.5">
                        {heroStory.title}
                      </h3>
                      <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                        {heroStory.synopsis}
                      </p>
                    </div>
                  </Link>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={heroStory.author.avatar}
                        alt={heroStory.author.name}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-amber-500/50"
                      />
                      <div>
                        <div className="font-serif font-bold text-xs text-ink-900 dark:text-ink-100">
                          {heroStory.author.name}
                        </div>
                        <div className="text-[10px] text-ink-400">
                          {heroStory.author.followersCount.toLocaleString()} followers
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/read/${heroStory.slug}/${heroStory.chapters[0].slug}`}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 text-ink-950 hover:bg-amber-400 transition-colors shadow-sm"
                    >
                      Read Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CURATOR PICKS & FEATURED CAROUSEL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StoryCarousel
          badge="Curated Selection"
          title="Editor's Picks"
          subtitle="Hand-selected by our literary panel for exceptional prose, intricate worldbuilding, and emotional depth."
          stories={editorPicks}
          viewAllHref="/browse?sort=editor-pick"
        />
      </div>

      {/* 3. TRENDING NOW SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StoryCarousel
          badge="Popular Right Now"
          title="Trending Today"
          subtitle="Stories captivating readers across the globe this week."
          stories={trendingStories}
          viewAllHref="/browse?sort=trending"
        />
      </div>

      {/* 4. GENRE EXPLORER GRID */}
      <section className="py-8 bg-card/30 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-amber-600 dark:text-amber-400 block mb-1">
                Explore Genres
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
                A Universe of Twelve Distinct Realms
              </h2>
              <p className="text-xs sm:text-sm text-ink-500 mt-1">
                Find exactly the mood, tempo, and storytelling style you crave.
              </p>
            </div>
            <Link
              href="/browse"
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-500 flex items-center gap-1 group shrink-0"
            >
              <span>View All 70 Stories</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3.5 sm:gap-4">
            {GENRES.map((genre) => (
              <Link
                key={genre.id}
                href={`/browse?genre=${encodeURIComponent(genre.name)}`}
                className="group relative p-4 rounded-xl border border-border/60 bg-card/60 hover:bg-card hover:border-amber-500/50 hover:shadow-elevated transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="font-serif font-bold text-sm text-ink-900 dark:text-ink-100 group-hover:text-amber-500 transition-colors">
                    {genre.name}
                  </div>
                  <p className="text-[11px] text-ink-500 mt-1 line-clamp-2 leading-relaxed">
                    {genre.description}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-border/30 flex items-center justify-between text-[11px] text-ink-400">
                  <span className="font-semibold text-amber-500/90">{genre.storyCount} Stories</span>
                  <span className="text-xs group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ROMANCE READERS LOVE CAROUSEL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StoryCarousel
          badge="12 Masterpieces"
          title="Romance Readers Love"
          subtitle="Enemies to lovers, slow burns, seaside second chances, and unforgettable love letters."
          stories={romanceStories}
          viewAllHref="/browse?genre=Romance"
        />
      </div>

      {/* 6. FANTASY WORLDS CAROUSEL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StoryCarousel
          badge="10 Epics"
          title="Fantasy Worlds"
          subtitle="Dragons, alchemical gardens, forgotten memory silk, and sunken underwater spires."
          stories={fantasyStories}
          viewAllHref="/browse?genre=Fantasy"
        />
      </div>

      {/* 7. MYSTERY & SUSPENSE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StoryCarousel
          badge="8 Thrillers"
          title="Mystery & Suspense"
          subtitle="Atmospheric whodunits, cold cases, cyber espionages, and locked room puzzles."
          stories={mysteryStories}
          viewAllHref="/browse?genre=Mystery%20%26%20Thriller"
        />
      </div>

      {/* 8. YOUNG ADULT FAVORITES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StoryCarousel
          badge="8 Adventures"
          title="Young Adult Favorites"
          subtitle="Coming-of-age journeys, secret academy rebellions, and summer constellations."
          stories={yaStories}
          viewAllHref="/browse?genre=Young%20Adult"
        />
      </div>

      {/* 9. AUTHOR SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <span className="text-xs font-semibold tracking-wider uppercase text-amber-600 dark:text-amber-400 block mb-1">
            Featured Voices
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
            Meet the Authors
          </h2>
          <p className="text-xs sm:text-sm text-ink-500 mt-1">
            Follow authors to receive notifications whenever they publish new chapters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: 'Clara Vane',
              username: 'clara_vane',
              genre: 'Gothic Romance & Drama',
              followers: '14.2k',
              stories: 6,
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
              bio: 'Author of "Letters from the Orchard". Winner of the 2024 Folio Quill Award.'
            },
            {
              name: 'Julian Cross',
              username: 'julian_cross',
              genre: 'High Fantasy & Worldbuilding',
              followers: '28.9k',
              stories: 8,
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
              bio: 'Architect of forgotten magic systems. Author of "The Crown of Pale Ash".'
            },
            {
              name: 'Arthur Pendleton',
              username: 'arthur_pendleton',
              genre: 'Historical Mystery & Noir',
              followers: '12.3k',
              stories: 4,
              avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
              bio: 'Author of "The Edinburgh Cipher". Atmospheric Victorian investigator.'
            },
            {
              name: 'Elena Solís',
              username: 'elena_solis',
              genre: 'Contemporary & Slow Burn',
              followers: '34.1k',
              stories: 9,
              avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
              bio: 'Author of "The Parisian Manuscript". Enemies-to-lovers devotee.'
            }
          ].map((author) => (
            <div
              key={author.username}
              className="p-5 rounded-2xl border border-border/60 bg-card/60 flex flex-col justify-between hover:border-amber-500/50 hover:shadow-elevated transition-all"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-500/40"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-ink-900 dark:text-ink-100">
                      {author.name}
                    </h4>
                    <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                      {author.genre}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed mb-4">
                  {author.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-border/40 flex items-center justify-between">
                <span className="text-[11px] text-ink-400">
                  {author.followers} readers · {author.stories} works
                </span>
                <Link
                  href={`/profile/${author.username}`}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-ink-950 transition-colors"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. EDITORIAL TESTIMONIALS */}
      <section className="py-12 bg-ink-950/20 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-600 dark:text-amber-400 block mb-1">
              Voices of the Community
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
              Praise for the Reading Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-border/60 bg-card/60 space-y-4">
              <Quote className="w-6 h-6 text-amber-500/60" />
              <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 leading-relaxed italic font-serif">
                "Velumbra feels like walking into an exquisite private library. The distraction-free typography and chapter-by-chapter pacing make me fall in love with reading novels all over again."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                  alt="Reader"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-xs text-ink-900 dark:text-ink-100">Seraphina Ross</div>
                  <div className="text-[10px] text-ink-400">Avid Romance Reader</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-border/60 bg-card/60 space-y-4">
              <Quote className="w-6 h-6 text-amber-500/60" />
              <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 leading-relaxed italic font-serif">
                "As an author, the writing studio gives me pure clarity. The autosave, scheduled publishing, and reader feedback on every chapter create an authentic bond with my audience."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  alt="Author"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-xs text-ink-900 dark:text-ink-100">Julian Cross</div>
                  <div className="text-[10px] text-ink-400">Fantasy Author</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-border/60 bg-card/60 space-y-4">
              <Quote className="w-6 h-6 text-amber-500/60" />
              <p className="text-xs sm:text-sm text-ink-700 dark:text-ink-300 leading-relaxed italic font-serif">
                "The 70 seed stories are extraordinarily rich. I spent all night immersed in 'The Edinburgh Cipher'. The dark mode and sepia tones are effortlessly easy on the eyes."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80"
                  alt="Reader"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-xs text-ink-900 dark:text-ink-100">Marcus Sterling</div>
                  <div className="text-[10px] text-ink-400">Literary Critic & Reader</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. START WRITING / START READING BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-amber-500/15 p-8 sm:p-12 text-center overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
              Ready to Share Your Narrative Universe?
            </h2>
            <p className="text-xs sm:text-sm text-ink-600 dark:text-ink-300 leading-relaxed">
              Join thousands of readers and writers crafting serialized fiction, poetic suites, and epic sagas. Begin drafting your first chapter in seconds.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/studio"
                className="px-6 py-3 rounded-xl text-sm font-semibold bg-amber-500 text-ink-950 hover:bg-amber-400 transition-colors shadow-md flex items-center gap-2"
              >
                <PenTool className="w-4 h-4" />
                <span>Launch Author Studio</span>
              </Link>
              <Link
                href="/browse"
                className="px-6 py-3 rounded-xl text-sm font-semibold border border-border/80 bg-card hover:bg-card/90 text-ink-800 dark:text-ink-200 transition-colors"
              >
                <span>Browse All 70 Novels</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
