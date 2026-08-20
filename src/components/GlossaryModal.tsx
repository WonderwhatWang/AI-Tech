import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Search, 
  Sparkles, 
  Tag, 
  ArrowRight
} from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/glossary';
import { GlossaryTerm } from '../types';

interface GlossaryModalProps {
  onClose: () => void;
  onSelectTech?: (techId: string) => void;
}

export function GlossaryModal({ onClose, onSelectTech }: GlossaryModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', '核心架構', '核心演算法', '資料表示', '模型容量', '模型特性', '推理參數', '工程最佳化', '模型訓練'];

  const filteredTerms = GLOSSARY_TERMS.filter((term) => {
    const matchesSearch = 
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.englishTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl bg-white dark:bg-[#020617] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 border border-indigo-400/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  AI 核心術語速查辭典
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  GLOSSARY
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                快速理解 Transformer, Self-Attention, Token, RLHF, RoPE 等核心定義
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter */}
        <div className="p-4 border-b border-slate-200/80 dark:border-slate-800 space-y-3 bg-white dark:bg-slate-900">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="搜尋術語名稱、英文或概念..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat === 'all' ? '全部類別' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Term List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 divide-y divide-slate-100 dark:divide-slate-800/80">
          {filteredTerms.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              找不到符合的術語，請嘗試其他關鍵字。
            </div>
          ) : (
            filteredTerms.map((t) => (
              <div key={t.id} className="pt-3 first:pt-0 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {t.term}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {t.englishTerm}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {t.category}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.definition}
                </p>

                {t.formulaOrIntuition && (
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 font-mono text-[11px] text-indigo-700 dark:text-indigo-300 border border-slate-200/60 dark:border-slate-700/60">
                    {t.formulaOrIntuition}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold"
          >
            關閉辭典
          </button>
        </div>

      </div>
    </div>
  );
}
