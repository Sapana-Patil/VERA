import React from 'react';
import { History, Trash2, ArrowUpRight } from 'lucide-react';

export default function HistoryList({ history, onSelectHistory, onClearHistory }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-indigo-500" />
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
            Recent Analysis History
          </h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
            {history.length}
          </span>
        </div>
        <button
          type="button"
          onClick={onClearHistory}
          className="text-xs text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear</span>
        </button>
      </div>

      <div className="space-y-2.5">
        {history.map((item, index) => {
          const isReal = item.verdict === 'REAL';
          return (
            <div
              key={index}
              onClick={() => onSelectHistory(item)}
              className="group p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-slate-100/70 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer flex items-center justify-between gap-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      isReal
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {item.verdict}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {item.confidence}% Confidence
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-600">•</span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 truncate font-medium">
                  {item.text}
                </p>
              </div>

              <div className="shrink-0 text-slate-400 group-hover:text-indigo-500 transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
