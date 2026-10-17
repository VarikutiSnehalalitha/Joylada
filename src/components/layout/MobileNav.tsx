'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, BookOpen, PenTool, Bookmark, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function MobileNav() {
  const pathname = usePathname();
  const { currentUser } = useApp();

  const navItems = [
    { label: 'Discover', href: '/discover', icon: Compass },
    { label: 'Browse', href: '/browse', icon: BookOpen },
    { label: 'Studio', href: '/studio', icon: PenTool },
    { label: 'Library', href: '/library', icon: Bookmark },
    { label: 'Profile', href: `/profile/${currentUser.username}`, icon: User },
  ];

  // Don't show bottom nav while inside distraction-free reading mode
  if (pathname.startsWith('/read/')) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/80 bg-card/90 backdrop-blur-md md:hidden px-2 py-1.5 flex items-center justify-around shadow-elevated">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href === '/discover' && pathname === '/');
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-medium transition-all ${
              isActive
                ? 'text-amber-500 font-semibold'
                : 'text-ink-500 hover:text-ink-900 dark:hover:text-ink-200'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : ''}`} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
