import React, { useState, useMemo, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { TechCard } from './components/TechCard';
import { TechDetailModal } from './components/TechDetailModal';
import { TechComparisonModal } from './components/TechComparisonModal';
import { GlossaryModal } from './components/GlossaryModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { AI_TECHNOLOGIES } from './data/aiTechnologies';
import { AITechnology, TechCategory, MaturityLevel } from './types';
import { SearchX, RotateCcw, Compass, BookOpen, Layers } from 'lucide-react';

export function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TechCategory>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedMaturity, setSelectedMaturity] = useState<MaturityLevel | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modals & Drawers
  const [selectedTechModal, setSelectedTechModal] = useState<AITechnology | null>(null);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [isGlossaryModalOpen, setIsGlossaryModalOpen] = useState(false);
  const [isBookmarksDrawerOpen, setIsBookmarksDrawerOpen] = useState(false);

  // Persistence for Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ai_radar_bookmarks');
      return saved ? JSON.parse(saved) : ['llm', 'rag', 'ai-agents'];
    } catch {
      return ['llm', 'rag', 'ai-agents'];
    }
  });

  useEffect(() => {
    localStorage.setItem('ai_radar_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // Comparison items
  const [comparedIds, setComparedIds] = useState<string[]>(['llm', 'rag']);

  // Filter logic
  const filteredTechs = useMemo(() => {
    return AI_TECHNOLOGIES.filter((tech) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = tech.name.toLowerCase().includes(q);
        const matchesEnglish = tech.englishName.toLowerCase().includes(q);
        const matchesDef = tech.shortDefinition.toLowerCase().includes(q);
        const matchesPrinciple = tech.corePrinciple.toLowerCase().includes(q);
        const matchesTag = tech.tags.some(t => t.toLowerCase().includes(q));
        const matchesTools = tech.representativeTools.some(tool => tool.name.toLowerCase().includes(q));
        
        if (!matchesName && !matchesEnglish && !matchesDef && !matchesPrinciple && !matchesTag && !matchesTools) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== 'all' && tech.category !== selectedCategory) {
        return false;
      }

      // 3. Functional Tags (AND or OR filter - if tags selected, item must contain all selected tags)
      if (selectedTags.length > 0) {
        const hasAllTags = selectedTags.every(tag => tech.tags.includes(tag));
        if (!hasAllTags) {
          return false;
        }
      }

      // 4. Maturity
      if (selectedMaturity !== 'all' && tech.maturity !== selectedMaturity) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedTags, selectedMaturity]);

  // Handlers
  const handleToggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSelectQuickTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const handleToggleBookmark = (techId: string) => {
    setBookmarkedIds(prev =>
      prev.includes(techId) ? prev.filter(id => id !== techId) : [...prev, techId]
    );
  };

  const handleToggleCompare = (tech: AITechnology) => {
    setComparedIds(prev => {
      if (prev.includes(tech.id)) {
        return prev.filter(id => id !== tech.id);
      }
      if (prev.length >= 4) {
        alert('最多同時橫向比對 4 項 AI 技術');
        return prev;
      }
      return [...prev, tech.id];
    });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTags([]);
    setSelectedMaturity('all');
  };

  const hasActiveFilters = Boolean(
    searchQuery.trim() || 
    selectedCategory !== 'all' || 
    selectedTags.length > 0 || 
    selectedMaturity !== 'all'
  );

  const bookmarkedTechs = useMemo(() => {
    return AI_TECHNOLOGIES.filter(t => bookmarkedIds.includes(t.id));
  }, [bookmarkedIds]);

  const comparedTechs = useMemo(() => {
    return AI_TECHNOLOGIES.filter(t => comparedIds.includes(t.id));
  }, [comparedIds]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white transition-colors">
      
      {/* Top Navigation */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        bookmarkCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsBookmarksDrawerOpen(true)}
        comparisonCount={comparedIds.length}
        onOpenComparison={() => setIsComparisonModalOpen(true)}
        onOpenGlossary={() => setIsGlossaryModalOpen(true)}
      />

      {/* Hero Intro */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalTechCount={AI_TECHNOLOGIES.length}
        filteredCount={filteredTechs.length}
        onSelectTag={handleSelectQuickTag}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* Dynamic Filters */}
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedTags={selectedTags}
          onToggleTag={handleToggleTag}
          selectedMaturity={selectedMaturity}
          onSelectMaturity={setSelectedMaturity}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
          totalFilteredCount={filteredTechs.length}
        />

        {/* Results Grid / List */}
        {filteredTechs.length === 0 ? (
          <div className="my-16 p-8 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-center max-w-md mx-auto space-y-4 shadow-sm backdrop-blur-xs">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-400 mx-auto flex items-center justify-center border border-slate-200 dark:border-slate-700">
              <SearchX className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                找不到符合條件的技術
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                嘗試放寬標籤條件或搜尋其他關鍵字（例如：「檢索」、「Agent」、「推理」、「LoRA」）。
              </p>
            </div>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 mx-auto transition-colors shadow-sm shadow-indigo-500/20"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>重置全部篩選條件</span>
            </button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4'
              : 'space-y-3 pt-4'
          }>
            {filteredTechs.map((tech) => (
              <TechCard
                key={tech.id}
                tech={tech}
                onOpenDetail={(t) => setSelectedTechModal(t)}
                isBookmarked={bookmarkedIds.includes(tech.id)}
                onToggleBookmark={handleToggleBookmark}
                isCompared={comparedIds.includes(tech.id)}
                onToggleCompare={handleToggleCompare}
                onTagClick={handleToggleTag}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#020617] py-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-sm shadow-indigo-500/20">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-800 dark:text-slate-200">主流 AI 技術全景導覽平台</span>
            <span>• 專為架構師、研發工程師與科技學習者打造</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsGlossaryModalOpen(true)}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              AI 術語辭典
            </button>
            <button
              onClick={() => setIsComparisonModalOpen(true)}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              技術比對矩陣
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              回到頂部 ↑
            </button>
          </div>
        </div>
      </footer>

      {/* Deep-Dive Technical Detail Modal */}
      <TechDetailModal
        tech={selectedTechModal}
        onClose={() => setSelectedTechModal(null)}
        isBookmarked={selectedTechModal ? bookmarkedIds.includes(selectedTechModal.id) : false}
        onToggleBookmark={handleToggleBookmark}
        isCompared={selectedTechModal ? comparedIds.includes(selectedTechModal.id) : false}
        onToggleCompare={handleToggleCompare}
        onOpenCompareView={() => {
          setSelectedTechModal(null);
          setIsComparisonModalOpen(true);
        }}
      />

      {/* Side-by-side Technology Comparison Modal */}
      {isComparisonModalOpen && (
        <TechComparisonModal
          comparedTechs={comparedTechs}
          onClose={() => setIsComparisonModalOpen(false)}
          onRemoveTech={(id) => setComparedIds(prev => prev.filter(tId => tId !== id))}
          onClearAll={() => setComparedIds([])}
          onOpenDetail={(tech) => {
            setIsComparisonModalOpen(false);
            setSelectedTechModal(tech);
          }}
        />
      )}

      {/* Searchable Glossary Modal */}
      {isGlossaryModalOpen && (
        <GlossaryModal
          onClose={() => setIsGlossaryModalOpen(false)}
          onSelectTech={(techId) => {
            setIsGlossaryModalOpen(false);
            const found = AI_TECHNOLOGIES.find(t => t.id === techId);
            if (found) setSelectedTechModal(found);
          }}
        />
      )}

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksDrawerOpen}
        onClose={() => setIsBookmarksDrawerOpen(false)}
        bookmarkedTechs={bookmarkedTechs}
        onRemoveBookmark={handleToggleBookmark}
        onClearAll={() => setBookmarkedIds([])}
        onOpenDetail={(tech) => setSelectedTechModal(tech)}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
