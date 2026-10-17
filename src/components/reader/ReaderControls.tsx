'use client';

import React from 'react';
import { ReaderPreferences } from '@/types';
import { Type, AlignLeft, Maximize2, Minimize2, Palette, Sliders, X } from 'lucide-react';

interface ReaderControlsProps {
  preferences: ReaderPreferences;
  onChange: (updated: Partial<ReaderPreferences>) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReaderControls({
  preferences,
  onChange,
  isOpen,
  onClose
}: ReaderControlsProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-8 z-50 w-80 sm:w-88 rounded-2xl border border-border/80 bg-card p-4 shadow-elevated animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="flex items-center justify-between pb-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-amber-500" />
          <span className="font-serif font-bold text-sm text-ink-900 dark:text-ink-50">
            Reading Atmosphere
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-ink-400 hover:text-ink-900 dark:hover:text-ink-100"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-4 space-y-4 text-xs">
        {/* Reading Themes */}
        <div>
          <label className="text-ink-500 font-medium block mb-1.5 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-amber-500" />
            <span>Theme</span>
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            <button
              onClick={() => onChange({ theme: 'light' })}
              className={`py-2 px-1 rounded-lg border text-center font-medium transition-all ${
                preferences.theme === 'light'
                  ? 'border-amber-500 ring-2 ring-amber-500/30 font-bold'
                  : 'border-border/60 hover:border-amber-500/40'
              } bg-[#faf8f5] text-ink-950`}
            >
              Light
            </button>
            <button
              onClick={() => onChange({ theme: 'sepia' })}
              className={`py-2 px-1 rounded-lg border text-center font-medium transition-all ${
                preferences.theme === 'sepia'
                  ? 'border-amber-500 ring-2 ring-amber-500/30 font-bold'
                  : 'border-border/60 hover:border-amber-500/40'
              } bg-[#f4ecd8] text-[#433422]`}
            >
              Sepia
            </button>
            <button
              onClick={() => onChange({ theme: 'dark' })}
              className={`py-2 px-1 rounded-lg border text-center font-medium transition-all ${
                preferences.theme === 'dark'
                  ? 'border-amber-500 ring-2 ring-amber-500/30 font-bold'
                  : 'border-border/60 hover:border-amber-500/40'
              } bg-[#181820] text-ink-100`}
            >
              Dark
            </button>
            <button
              onClick={() => onChange({ theme: 'midnight' })}
              className={`py-2 px-1 rounded-lg border text-center font-medium transition-all ${
                preferences.theme === 'midnight'
                  ? 'border-amber-500 ring-2 ring-amber-500/30 font-bold'
                  : 'border-border/60 hover:border-amber-500/40'
              } bg-black text-gray-200`}
            >
              OLED
            </button>
          </div>
        </div>

        {/* Font Family */}
        <div>
          <label className="text-ink-500 font-medium block mb-1.5 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-amber-500" />
            <span>Typography</span>
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => onChange({ fontFamily: 'serif' })}
              className={`py-1.5 rounded-lg border font-serif text-center transition-all ${
                preferences.fontFamily === 'serif'
                  ? 'bg-amber-500 text-ink-950 font-bold border-amber-500'
                  : 'border-border/60 hover:bg-ink-100 dark:hover:bg-ink-900'
              }`}
            >
              Editorial Serif
            </button>
            <button
              onClick={() => onChange({ fontFamily: 'sans' })}
              className={`py-1.5 rounded-lg border font-sans text-center transition-all ${
                preferences.fontFamily === 'sans'
                  ? 'bg-amber-500 text-ink-950 font-bold border-amber-500'
                  : 'border-border/60 hover:bg-ink-100 dark:hover:bg-ink-900'
              }`}
            >
              Modern Sans
            </button>
            <button
              onClick={() => onChange({ fontFamily: 'mono' })}
              className={`py-1.5 rounded-lg border font-mono text-center transition-all ${
                preferences.fontFamily === 'mono'
                  ? 'bg-amber-500 text-ink-950 font-bold border-amber-500'
                  : 'border-border/60 hover:bg-ink-100 dark:hover:bg-ink-900'
              }`}
            >
              Monospace
            </button>
          </div>
        </div>

        {/* Font Size */}
        <div>
          <div className="flex items-center justify-between text-ink-500 mb-1.5">
            <span className="font-medium">Font Size</span>
            <span className="uppercase text-[10px] text-amber-500 font-bold">
              {preferences.fontSize}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {(['sm', 'base', 'lg', 'xl'] as const).map((size) => (
              <button
                key={size}
                onClick={() => onChange({ fontSize: size })}
                className={`py-1 rounded-lg border text-center transition-all ${
                  preferences.fontSize === size
                    ? 'bg-amber-500 text-ink-950 font-bold border-amber-500'
                    : 'border-border/60 hover:bg-ink-100 dark:hover:bg-ink-900'
                }`}
              >
                {size === 'sm' ? 'A-' : size === 'base' ? 'A' : size === 'lg' ? 'A+' : 'A++'}
              </button>
            ))}
          </div>
        </div>

        {/* Line Height & Content Width */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-ink-500 font-medium block mb-1 flex items-center gap-1">
              <AlignLeft className="w-3 h-3 text-amber-500" />
              <span>Line Spacing</span>
            </label>
            <div className="grid grid-cols-3 gap-1">
              {(['compact', 'normal', 'relaxed'] as const).map((lh) => (
                <button
                  key={lh}
                  onClick={() => onChange({ lineHeight: lh })}
                  className={`py-1 text-[10px] rounded border capitalize text-center ${
                    preferences.lineHeight === lh
                      ? 'bg-amber-500 text-ink-950 font-bold border-amber-500'
                      : 'border-border/60'
                  }`}
                >
                  {lh.slice(0, 4)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-ink-500 font-medium block mb-1">
              Page Width
            </label>
            <div className="grid grid-cols-3 gap-1">
              {(['narrow', 'medium', 'wide'] as const).map((w) => (
                <button
                  key={w}
                  onClick={() => onChange({ contentWidth: w })}
                  className={`py-1 text-[10px] rounded border capitalize text-center ${
                    preferences.contentWidth === w
                      ? 'bg-amber-500 text-ink-950 font-bold border-amber-500'
                      : 'border-border/60'
                  }`}
                >
                  {w.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
