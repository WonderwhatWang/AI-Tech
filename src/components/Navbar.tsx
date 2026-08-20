import React from 'react';
import { 
  Cpu, 
  Moon, 
  Sun, 
  Bookmark, 
  Scale, 
  BookOpen, 
  Search,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  bookmarkCount: number;
  onOpenBookmarks: () => void;
  comparisonCount: number;
  onOpenComparison: () => void;
  onOpenGlossary: () => void;
}

export function Navbar({
  searchQuery,
  onSearchChange,
  bookmarkCount,
  onOpenBookmarks,
  comparisonCount,
  onOpenComparison,
  onOpenGlossary,
}: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#020617]/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 border border-indigo-400/30">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 tracking-tight">
                AI Tech Atlas
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                v2025+ Atlas
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              Mainstream Intelligence Directory
            </p>
          </div>
        </div>

        {/* Global Search Input */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tech, architectures, tags or models..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs px-1"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Glossary */}
          <button
            onClick={onOpenGlossary}
            className="px-3 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-800"
            title="術語速查辭典"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            <span className="hidden sm:inline">術語辭典</span>
          </button>

          {/* Comparison Modal */}
          <button
            onClick={onOpenComparison}
            className="relative px-3 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-800"
            title="技術橫向對比"
          >
            <Scale className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
            <span className="hidden sm:inline">矩陣比對</span>
            {comparisonCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-indigo-600 text-white text-[10px] font-bold">
                {comparisonCount}
              </span>
            )}
          </button>

          {/* Bookmarks */}
          <button
            onClick={onOpenBookmarks}
            className="relative p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors border border-slate-200 dark:border-slate-800"
            title="已收藏技術"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-500" />
            {bookmarkCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold">
                {bookmarkCount}
              </span>
            )}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors border border-slate-200 dark:border-slate-800 flex items-center gap-1.5"
            title={theme === 'dark' ? '切換淺色模式' : '切換深色模式'}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
