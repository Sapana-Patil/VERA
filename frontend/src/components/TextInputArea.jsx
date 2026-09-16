import React, { useRef, useEffect } from 'react';
import { Send, Trash2, Sparkles, AlertCircle } from 'lucide-react';


export default function TextInputArea({
  text,
  setText,
  onAnalyze,
  isLoading,
  error,
}) {
  const textareaRef = useRef(null);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (text.trim() && !isLoading) {
        onAnalyze();
      }
    }
  };

  const handleClear = () => {
    setText('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 transition-all">
      {/* Top bar with heading and sample buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div>
          <label
            htmlFor="statement-input"
            className="block font-semibold text-slate-800 dark:text-slate-200 text-sm"
          >
            Enter Statement or News Content
          </label>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Paste any news headline, article excerpt, or statement to test authenticity
          </span>
        </div>

      
      </div>

      {/* Textarea container */}
      <div className="relative">
        <textarea
          id="statement-input"
          ref={textareaRef}
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="e.g. Health officials announced new vaccine trial results today showing 95% efficacy across diverse patient demographics..."
          className="w-full resize-y rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60 p-4 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm sm:text-base focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all disabled:opacity-60"
        />

        {text && !isLoading && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            title="Clear text"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Error state if any */}
      {error && (
        <div className="mt-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center gap-2 text-rose-600 dark:text-rose-400 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Bottom Bar: Stats and Submit */}
      <div className="mt-4 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
          <span>{wordCount} {wordCount === 1 ? 'word' : 'words'}</span>
          <span>•</span>
          <span>{charCount} characters</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px] text-slate-600 dark:text-slate-400">Ctrl + Enter</kbd> to analyze</span>
        </div>

        <button
          type="button"
          onClick={onAnalyze}
          disabled={!text.trim() || isLoading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/35 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing Statement...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Verify Veracity</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
