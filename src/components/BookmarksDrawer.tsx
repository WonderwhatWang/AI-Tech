import React from 'react';
import { 
  X, 
  Bookmark, 
  Trash2, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { AITechnology } from '../types';
import { renderTechIcon } from './TechCard';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedTechs: AITechnology[];
  onRemoveBookmark: (techId: string) => void;
  onClearAll: () => void;
  onOpenDetail: (tech: AITechnology) => void;
}

export function BookmarksDrawer({
  isOpen,
  onClose,
  bookmarkedTechs,
  onRemoveBookmark,
  onClearAll,
  onOpenDetail,
}: BookmarksDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white dark:bg-[#020617] border-l border-slate-200 dark:border-slate-800 h-full flex flex-col shadow-2xl transition-all animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Bookmark className="w-4 h-4 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  已收藏技術 ({bookmarkedTechs.length})
                </h3>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  SAVED
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">本地儲存供即時架構查閱</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {bookmarkedTechs.length > 0 && (
              <button
                onClick={onClearAll}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 transition-colors border border-slate-200 dark:border-slate-800"
                title="清空收藏"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarkedTechs.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
                <Bookmark className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-500">尚未收藏任何技術</p>
              <p className="text-[11px] text-slate-400">
                在技術卡片右上角點擊書籤圖示即可收藏。
              </p>
            </div>
          ) : (
            bookmarkedTechs.map((tech) => (
              <div
                key={tech.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2 group transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                      {renderTechIcon(tech.iconName, 'w-4 h-4')}
                    </div>
                    <div>
                      <h4 
                        onClick={() => {
                          onClose();
                          onOpenDetail(tech);
                        }}
                        className="font-bold text-xs text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                      >
                        {tech.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {tech.englishName}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveBookmark(tech.id)}
                    className="text-slate-400 hover:text-rose-500 p-1"
                    title="移除收藏"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2">
                  {tech.shortDefinition}
                </p>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                    {tech.categoryLabel}
                  </span>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenDetail(tech);
                    }}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5 text-xs font-semibold"
                  >
                    <span>開啟解析</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold"
          >
            關閉抽屜
          </button>
        </div>

      </div>
    </div>
  );
}
