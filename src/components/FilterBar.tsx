import React from 'react';
import { 
  Filter, 
  Tag, 
  Grid3X3, 
  List, 
  SlidersHorizontal, 
  X, 
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';
import { CATEGORIES, FUNCTIONAL_TAGS } from '../data/aiTechnologies';
import { TechCategory, MaturityLevel } from '../types';

interface FilterBarProps {
  selectedCategory: TechCategory;
  onSelectCategory: (cat: TechCategory) => void;
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  selectedMaturity: MaturityLevel | 'all';
  onSelectMaturity: (m: MaturityLevel | 'all') => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  totalFilteredCount: number;
}

export function FilterBar({
  selectedCategory,
  onSelectCategory,
  selectedTags,
  onToggleTag,
  selectedMaturity,
  onSelectMaturity,
  viewMode,
  onViewModeChange,
  onClearFilters,
  hasActiveFilters,
  totalFilteredCount,
}: FilterBarProps) {
  return (
    <div className="space-y-4 pt-6 pb-2">
      
      {/* Category Tabs & View Mode */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        
        {/* Left: Category Navigation */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as TechCategory)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Reset Filters & View Switcher */}
        <div className="flex items-center justify-between lg:justify-end gap-2 shrink-0">
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-semibold hover:bg-rose-500/20 flex items-center gap-1.5 transition-colors border border-rose-500/20"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>CLEAR FILTERS</span>
            </button>
          )}

          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
              title="Grid View"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
              title="Compact List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Functional Tag Pills & Maturity Selector Panel */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5 backdrop-blur-xs">
        
        {/* Functional Tags row */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-2.5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 shrink-0 pt-1">
            <Tag className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            <span>FUNCTION TAGS:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 flex-1">
            {FUNCTIONAL_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => onToggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-500/25 border border-indigo-400'
                      : 'bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span>{tag}</span>
                  {isSelected && <X className="w-3 h-3 ml-0.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Maturity selector & Result counter row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">MATURITY:</span>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/80 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800">
              {(['all', '入門應用級', '實用工程級', '前沿探索級'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => onSelectMaturity(m)}
                  className={`px-2.5 py-0.5 rounded-md text-xs font-medium transition-colors ${
                    selectedMaturity === m
                      ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-bold shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {m === 'all' ? '全部' : m}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span className="text-xs">
              MATCHING ARCHITECTURES: <strong className="text-slate-900 dark:text-white font-mono text-xs">{totalFilteredCount}</strong>
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
