import React from 'react';
import { 
  X, 
  Scale, 
  Trash2, 
  Cpu, 
  Clock, 
  Sliders, 
  Database, 
  Check, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { AITechnology } from '../types';
import { renderTechIcon } from './TechCard';

interface TechComparisonModalProps {
  comparedTechs: AITechnology[];
  onClose: () => void;
  onRemoveTech: (techId: string) => void;
  onClearAll: () => void;
  onOpenDetail: (tech: AITechnology) => void;
}

export function TechComparisonModal({
  comparedTechs,
  onClose,
  onRemoveTech,
  onClearAll,
  onOpenDetail,
}: TechComparisonModalProps) {
  if (comparedTechs.length === 0) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center">
            <Scale className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
              尚無選取的比較技術
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              請在技術卡片上點擊「加入比較」圖示（可選 2~4 項技術），以進行多維度性能、成本與落地場景橫向對比。
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            返回技術導覽
          </button>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return (
      <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold">
        {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
        <span className="ml-1 text-slate-500 font-normal">({rating}/5)</span>
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl bg-white dark:bg-[#020617] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-400/30">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  主流 AI 技術橫向對比矩陣
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  MATRIX COMPARISON
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                已選取 {comparedTechs.length} 項技術進行多維度效能指標與工程落地對照
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClearAll}
              className="px-2.5 py-1.5 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 text-xs font-semibold flex items-center gap-1 transition-colors border border-rose-500/20"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>清空比對</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Matrix Comparison Table */}
        <div className="flex-1 overflow-x-auto p-4 sm:p-6 bg-slate-50/30 dark:bg-[#020617]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="p-3 font-bold text-[10px] uppercase tracking-wider text-slate-400 w-36 sm:w-44 shrink-0">DIMENSION</th>
                {comparedTechs.map((tech) => (
                  <th key={tech.id} className="p-3 min-w-[220px]">
                    <div className="flex items-start justify-between gap-2 p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/20">
                          {renderTechIcon(tech.iconName, 'w-4 h-4')}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{tech.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{tech.englishName}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveTech(tech.id)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                        title="移除"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              
              {/* Category & Maturity */}
              <tr>
                <td className="p-3 font-medium text-slate-500">所屬類別與成熟度</td>
                {comparedTechs.map((t) => (
                  <td key={t.id} className="p-3">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{t.categoryLabel}</span>
                    <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono mt-0.5">{t.maturity}</div>
                  </td>
                ))}
              </tr>

              {/* Core Principle Short */}
              <tr>
                <td className="p-3 font-medium text-slate-500">核心原理簡析</td>
                {comparedTechs.map((t) => (
                  <td key={t.id} className="p-3 text-slate-700 dark:text-slate-300 leading-relaxed">
                    {t.shortDefinition}
                  </td>
                ))}
              </tr>

              {/* Compute Cost */}
              <tr className="bg-slate-50/50 dark:bg-slate-950/20">
                <td className="p-3 font-medium text-slate-500">計算資源消耗 (Compute)</td>
                {comparedTechs.map((t) => (
                  <td key={t.id} className="p-3">
                    {renderStars(t.comparisonMetrics.computeCost)}
                  </td>
                ))}
              </tr>

              {/* Latency */}
              <tr>
                <td className="p-3 font-medium text-slate-500">響應延遲 (Latency)</td>
                {comparedTechs.map((t) => (
                  <td key={t.id} className="p-3">
                    {renderStars(t.comparisonMetrics.latency)}
                    <span className="text-[10px] text-slate-400 block">1=毫秒級, 5=數十秒思考</span>
                  </td>
                ))}
              </tr>

              {/* Customization Ease */}
              <tr className="bg-slate-50/50 dark:bg-slate-950/20">
                <td className="p-3 font-medium text-slate-500">領域客製化難易度</td>
                {comparedTechs.map((t) => (
                  <td key={t.id} className="p-3">
                    {renderStars(t.comparisonMetrics.customizationEase)}
                  </td>
                ))}
              </tr>

              {/* Real time Capability */}
              <tr>
                <td className="p-3 font-medium text-slate-500">即時資料更新性</td>
                {comparedTechs.map((t) => (
                  <td key={t.id} className="p-3">
                    {renderStars(t.comparisonMetrics.realTimeCapability)}
                  </td>
                ))}
              </tr>

              {/* Key Strengths */}
              <tr className="bg-slate-50/50 dark:bg-slate-950/20">
                <td className="p-3 font-medium text-slate-500">關鍵優勢</td>
                {comparedTechs.map((t) => (
                  <td key={t.id} className="p-3">
                    <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                      {t.strengths.slice(0, 2).map((s, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Best Scenario */}
              <tr>
                <td className="p-3 font-medium text-slate-500">最推薦落地情境</td>
                {comparedTechs.map((t) => (
                  <td key={t.id} className="p-3">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{t.useCases[0]?.title}</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">{t.useCases[0]?.scenario}</p>
                  </td>
                ))}
              </tr>

              {/* Detail action */}
              <tr>
                <td className="p-3 font-medium text-slate-500">深入操作</td>
                {comparedTechs.map((t) => (
                  <td key={t.id} className="p-3">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenDetail(t);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center gap-1 transition-colors"
                    >
                      <span>檢視完整解析</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
