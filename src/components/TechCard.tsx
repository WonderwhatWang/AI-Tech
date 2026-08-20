import React from 'react';
import { 
  MessageSquareText, 
  Database, 
  Bot, 
  Image as ImageIcon, 
  Sparkles, 
  BrainCircuit, 
  Network, 
  Layers, 
  ScanEye, 
  Mic, 
  Boxes, 
  Code2,
  ArrowRight,
  Bookmark,
  Scale,
  Zap,
  Cpu,
  Clock,
  Sliders,
  Check
} from 'lucide-react';
import { AITechnology } from '../types';

interface TechCardProps {
  key?: React.Key;
  tech: AITechnology;
  onOpenDetail: (tech: AITechnology) => void;
  isBookmarked: boolean;
  onToggleBookmark: (techId: string) => void;
  isCompared: boolean;
  onToggleCompare: (tech: AITechnology) => void;
  onTagClick: (tag: string) => void;
  viewMode?: 'grid' | 'list';
}

export const renderTechIcon = (iconName: string, className: string = 'w-5 h-5') => {
  switch (iconName) {
    case 'MessageSquareText':
      return <MessageSquareText className={className} />;
    case 'Database':
      return <Database className={className} />;
    case 'Bot':
      return <Bot className={className} />;
    case 'Image':
      return <ImageIcon className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'BrainCircuit':
      return <BrainCircuit className={className} />;
    case 'Network':
      return <Network className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'ScanEye':
      return <ScanEye className={className} />;
    case 'Mic':
      return <Mic className={className} />;
    case 'Boxes':
      return <Boxes className={className} />;
    case 'Code2':
      return <Code2 className={className} />;
    default:
      return <Cpu className={className} />;
  }
};

export function TechCard({
  tech,
  onOpenDetail,
  isBookmarked,
  onToggleBookmark,
  isCompared,
  onToggleCompare,
  onTagClick,
  viewMode = 'grid'
}: TechCardProps) {
  
  const getMaturityBadgeStyle = (maturity: string) => {
    switch (maturity) {
      case '入門應用級':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case '實用工程級':
        return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30';
      case '前沿探索級':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-700';
    }
  };

  const getAccentGradient = (id: string) => {
    switch (id) {
      case 'llm':
        return 'from-indigo-600 to-blue-700 shadow-indigo-500/20';
      case 'rag':
        return 'from-emerald-600 to-teal-700 shadow-emerald-500/20';
      case 'ai-agents':
        return 'from-blue-600 to-cyan-700 shadow-blue-500/20';
      case 'diffusion':
        return 'from-purple-600 to-pink-700 shadow-purple-500/20';
      case 'multimodal':
        return 'from-amber-600 to-orange-700 shadow-amber-500/20';
      case 'reasoning-cot':
        return 'from-rose-600 to-red-700 shadow-rose-500/20';
      case 'embeddings':
        return 'from-cyan-600 to-blue-700 shadow-cyan-500/20';
      case 'peft-lora':
        return 'from-teal-600 to-emerald-700 shadow-teal-500/20';
      case 'vision-sam':
        return 'from-orange-600 to-amber-700 shadow-orange-500/20';
      case 'speech-ai':
        return 'from-pink-600 to-rose-700 shadow-pink-500/20';
      case 'embodied-ai':
        return 'from-emerald-600 to-green-700 shadow-emerald-500/20';
      case 'ai-code':
        return 'from-indigo-600 to-purple-700 shadow-indigo-500/20';
      default:
        return 'from-indigo-600 to-blue-700 shadow-indigo-500/20';
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="group p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/60 dark:hover:bg-slate-800/40 transition-all hover:shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-xs">
        <div className="flex items-start gap-3.5 flex-1">
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${getAccentGradient(tech.id)} flex items-center justify-center text-white shrink-0 shadow-md border border-white/10`}>
            {renderTechIcon(tech.iconName, 'w-5 h-5')}
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-wider rounded border border-indigo-500/20">
                {tech.categoryLabel}
              </span>
              <h3 
                onClick={() => onOpenDetail(tech)}
                className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 cursor-pointer transition-colors"
              >
                {tech.name}
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {tech.englishName}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getMaturityBadgeStyle(tech.maturity)}`}>
                {tech.maturity}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {tech.shortDefinition}
            </p>
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {tech.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onTagClick(tag)}
                  className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-800 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action column */}
        <div className="flex items-center justify-between md:justify-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
          <button
            onClick={() => onToggleCompare(tech)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
              isCompared
                ? 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {isCompared ? <Check className="w-3.5 h-3.5" /> : <Scale className="w-3.5 h-3.5" />}
            <span>{isCompared ? 'COMPARED' : 'COMPARE'}</span>
          </button>

          <button
            onClick={() => onToggleBookmark(tech.id)}
            className={`p-2 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          </button>

          <button
            onClick={() => onOpenDetail(tech)}
            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm shadow-indigo-500/20"
          >
            <span>EXPLORE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/60 dark:hover:bg-slate-800/40 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col justify-between overflow-hidden backdrop-blur-xs">
      
      {/* Top Banner & Header */}
      <div className="p-5 space-y-3.5">
        
        {/* Top Badges & Actions */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${getAccentGradient(tech.id)} flex items-center justify-center text-white shrink-0 shadow-md border border-white/10`}>
              {renderTechIcon(tech.iconName, 'w-5 h-5')}
            </div>
            <div>
              <div className="px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-wider rounded border border-indigo-500/20 inline-block mb-0.5">
                {tech.categoryLabel}
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block">
                REV: {tech.yearIntroduced}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleCompare(tech)}
              className={`p-1.5 rounded-lg border transition-colors ${
                isCompared
                  ? 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400'
                  : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title="加入技術比較"
            >
              <Scale className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onToggleBookmark(tech.id)}
              className={`p-1.5 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                  : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title="收藏本技術"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Titles & Maturity */}
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h3 
              onClick={() => onOpenDetail(tech)}
              className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 cursor-pointer transition-colors"
            >
              {tech.name}
            </h3>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shrink-0 ${getMaturityBadgeStyle(tech.maturity)}`}>
              {tech.maturity}
            </span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">
            {tech.englishName}
          </div>
        </div>

        {/* Summary */}
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
          {tech.shortDefinition}
        </p>

        {/* Functional Tags */}
        <div className="flex flex-wrap gap-1 pt-1">
          {tech.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-800 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

      </div>

      {/* Footer Metrics & CTA */}
      <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
        
        {/* Metric indicators with status dot */}
        <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5" title="計算成本開銷">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            <span className="font-mono text-[10px]">COMPUTE:{tech.comparisonMetrics.computeCost}/5</span>
          </div>
          <div className="flex items-center gap-1.5" title="響應延遲等級 (1為極速)">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
            <span className="font-mono text-[10px]">LATENCY:{tech.comparisonMetrics.latency}/5</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onOpenDetail(tech)}
          className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs shadow-indigo-500/20"
        >
          <span>EXPLORE</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

      </div>

    </div>
  );
}
