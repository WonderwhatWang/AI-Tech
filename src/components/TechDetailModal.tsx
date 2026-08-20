import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Briefcase, 
  Wrench, 
  Code2, 
  Copy, 
  Check, 
  Bookmark, 
  Scale, 
  Cpu, 
  Clock, 
  SlidersHorizontal, 
  Database,
  ExternalLink,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { AITechnology } from '../types';
import { renderTechIcon } from './TechCard';
import { InteractiveSimulator } from './InteractiveSimulators';

interface TechDetailModalProps {
  tech: AITechnology | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (techId: string) => void;
  isCompared: boolean;
  onToggleCompare: (tech: AITechnology) => void;
  onOpenCompareView: () => void;
}

export function TechDetailModal({
  tech,
  onClose,
  isBookmarked,
  onToggleBookmark,
  isCompared,
  onToggleCompare,
  onOpenCompareView
}: TechDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'architecture' | 'simulator' | 'usecases' | 'tools' | 'code'>('architecture');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!tech) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(tech.codeSnippet.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-white dark:bg-[#020617] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 border border-indigo-400/30">
              {renderTechIcon(tech.iconName, 'w-6 h-6')}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-wider rounded border border-indigo-500/20">
                  {tech.categoryLabel}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {tech.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {tech.maturity}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                {tech.englishName} • 引入年代: {tech.yearIntroduced}
              </p>
            </div>
          </div>

          {/* Quick Action bar */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => onToggleCompare(tech)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                isCompared
                  ? 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isCompared ? 'COMPARED' : 'COMPARE'}</span>
            </button>

            <button
              onClick={() => onToggleBookmark(tech.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                  : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title="收藏"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#020617] overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap flex items-center gap-1.5 transition-all uppercase tracking-wider ${
              activeTab === 'architecture'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>架構與原理</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap flex items-center gap-1.5 transition-all uppercase tracking-wider ${
              activeTab === 'simulator'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>互動式模擬體驗</span>
          </button>

          <button
            onClick={() => setActiveTab('usecases')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap flex items-center gap-1.5 transition-all ${
              activeTab === 'usecases'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>應用場景與優缺點</span>
          </button>

          <button
            onClick={() => setActiveTab('tools')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap flex items-center gap-1.5 transition-all ${
              activeTab === 'tools'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>代表模型與工具</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap flex items-center gap-1.5 transition-all ${
              activeTab === 'code'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>範例代碼 / Prompt</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">

          {/* TAB 1: Architecture & Core Principle */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              {/* Plain Language Core Principle */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>核心演算法與運作機制</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {tech.corePrinciple}
                </p>
              </div>

              {/* Step by Step Pipeline */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-500" />
                  <span>技術架構與處理管線流程 (Step-by-Step Pipeline)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tech.architectureSteps.map((step) => (
                    <div 
                      key={step.step}
                      className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-2xs space-y-1.5"
                    >
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center">
                          {step.step}
                        </span>
                        <span>{step.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Metric Ratings */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center justify-between">
                  <span>系統工程指標維度評估</span>
                  <span className="text-[11px] font-normal text-slate-400">滿分 5 級</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block mb-1">計算成本</span>
                    <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {'★'.repeat(tech.comparisonMetrics.computeCost)}{'☆'.repeat(5 - tech.comparisonMetrics.computeCost)}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block mb-1">響應延遲</span>
                    <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {'★'.repeat(tech.comparisonMetrics.latency)}{'☆'.repeat(5 - tech.comparisonMetrics.latency)}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block mb-1">客製化難易</span>
                    <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {'★'.repeat(tech.comparisonMetrics.customizationEase)}{'☆'.repeat(5 - tech.comparisonMetrics.customizationEase)}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block mb-1">資料需求量</span>
                    <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {'★'.repeat(tech.comparisonMetrics.dataRequirement)}{'☆'.repeat(5 - tech.comparisonMetrics.dataRequirement)}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block mb-1">即時交互性</span>
                    <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {'★'.repeat(tech.comparisonMetrics.realTimeCapability)}{'☆'.repeat(5 - tech.comparisonMetrics.realTimeCapability)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Interactive Simulator */}
          {activeTab === 'simulator' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    {tech.interactiveDemo?.title || `${tech.name} 互動式模擬`}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {tech.interactiveDemo?.description || '透過動態互動直觀體驗底層運作演算法。'}
                  </p>
                </div>
              </div>

              <InteractiveSimulator type={tech.interactiveDemo?.type || 'rag'} />
            </div>
          )}

          {/* TAB 3: Use cases & Strengths / Limitations */}
          {activeTab === 'usecases' && (
            <div className="space-y-6">
              
              {/* Strengths & Limitations Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Strengths */}
                <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
                  <div className="font-bold text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>核心優勢與突破點 (Key Strengths)</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {tech.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Limitations */}
                <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2">
                  <div className="font-bold text-xs text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>技術局限與工程挑戰 (Limitations)</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {tech.limitations.map((l, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-rose-500 font-bold">•</span>
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Real World Use Cases */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-500" />
                  <span>典型企業與工業落地場景 (Real-world Scenarios)</span>
                </h4>
                <div className="space-y-2.5">
                  {tech.useCases.map((uc, idx) => (
                    <div 
                      key={idx} 
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          {uc.title}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                          {uc.industry}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {uc.scenario}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: Models & Tools */}
          {activeTab === 'tools' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                收錄該領域最具影響力的開源模型、商業 API 服務與研發框架：
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tech.representativeTools.map((tool, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                        {tool.name}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        tool.type === '開源模型' 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                          : tool.type === '商業服務' 
                            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300' 
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      }`}>
                        {tool.type}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Code & Prompt Example */}
          {activeTab === 'code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {tech.codeSnippet.title}
                  </h4>
                  <p className="text-xs text-slate-500">
                    語言/格式: <code className="font-mono text-indigo-600 dark:text-indigo-400">{tech.codeSnippet.language}</code>
                  </p>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>已複製</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>複製代碼</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code block */}
              <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto">
                <pre className="leading-relaxed whitespace-pre-wrap">{tech.codeSnippet.code}</pre>
              </div>

              {/* Explanation */}
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                💡 <strong>代碼邏輯說明：</strong> {tech.codeSnippet.explanation}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <span>標籤：</span>
            {tech.tags.map(t => (
              <span key={t} className="font-mono text-[11px] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded">
                {t}
              </span>
            ))}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-xs font-semibold transition-colors"
          >
            關閉視窗
          </button>
        </div>

      </div>
    </div>
  );
}
