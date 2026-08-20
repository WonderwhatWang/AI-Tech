import React from 'react';
import { 
  Sparkles, 
  Layers, 
  Cpu, 
  BrainCircuit, 
  Search, 
  Filter,
  CheckCircle2,
  Compass
} from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalTechCount: number;
  filteredCount: number;
  onSelectTag: (tag: string) => void;
}

export function HeroSection({
  searchQuery,
  onSearchChange,
  totalTechCount,
  filteredCount,
  onSelectTag,
}: HeroSectionProps) {
  const quickTags = ['#知識檢索', '#工作流自動化', '#思維鏈', '#圖像生成', '#效能微調', '#向量比對'];

  return (
    <section className="relative overflow-hidden pt-8 pb-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-100/60 via-white to-slate-50 dark:from-[#020617] dark:via-[#0b132b]/40 dark:to-[#020617]">
      {/* Subtle Indigo & Cyan Ambient Glow */}
      <div className="absolute top-0 left-1/3 -translate-x-1/2 w-96 h-48 bg-indigo-600/10 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-1/4 w-80 h-40 bg-cyan-500/10 blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          <div className="max-w-3xl space-y-4">
            {/* Tracked Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              <Compass className="w-3.5 h-3.5 text-indigo-500" />
              <span>AI Tech Atlas • Core Architecture & Intelligence</span>
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              探索主流 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400">人工智慧技術</span> 全景
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              從底層 Transformer 機制、RAG 檢索增強，到自主 Agent 智慧體、思維鏈推理與具身智慧。依據功能標籤靈活篩選，深度解析演算法架構、實務程式碼與工程落地指標。
            </p>

            {/* Quick Filter Tag shortcuts */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1 mr-1">
                <Sparkles className="w-3 h-3 text-indigo-400" /> QUICK TAGS:
              </span>
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onSelectTag(tag)}
                  className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-900/80 hover:bg-indigo-500/10 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Sleek Quote & Status Card */}
          <div className="hidden lg:flex flex-col gap-3 p-5 rounded-2xl bg-slate-900/40 dark:bg-slate-900/60 border border-slate-800 text-slate-300 max-w-sm backdrop-blur-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">System Status: Active</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">2025.Q2 Matrix</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed italic border-l-2 border-indigo-500/50 pl-3">
              "The most profound technologies are those that disappear. They weave themselves into the fabric of everyday life."
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
              <span className="text-slate-500">收錄架構：<strong className="text-slate-200 font-mono">{totalTechCount}</strong> 篇</span>
              <span className="text-indigo-400 font-medium">即時過濾：{filteredCount} 篇</span>
            </div>
          </div>

        </div>

        {/* Quick Metrics ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/60">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">{totalTechCount} 項核心技術</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500">Core Architectures</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/60">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">14+ 功能標籤</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500">Multi-Tag Engine</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/60">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">架構流程拆解</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500">Pipeline & Code</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/60">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-500/20">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">互動式模擬體驗</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500">Live Simulators</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
