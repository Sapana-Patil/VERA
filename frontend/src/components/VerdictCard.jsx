import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Copy, Check } from 'lucide-react';

export default function VerdictCard({ result, onDismiss }) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const isReal = result.verdict === 'REAL';

  const handleCopy = () => {
    const textToCopy = `[Vera FND Analysis]\nVerdict: ${result.verdict}\nConfidence: ${result.confidence}%\nDetails: ${result.reasoning}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-2xl border-2 p-6 sm:p-7 shadow-lg transition-all animate-in fade-in slide-in-from-bottom-3 duration-300 ${
        isReal
          ? 'border-emerald-500/80 bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent shadow-emerald-500/10 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 dark:border-emerald-500/60'
          : 'border-rose-500/80 bg-gradient-to-b from-rose-500/10 via-rose-500/5 to-transparent shadow-rose-500/10 dark:from-rose-950/40 dark:via-slate-900 dark:to-slate-900 dark:border-rose-500/60'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/60 dark:border-slate-800">
        {/* Main Verdict Badge */}
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${
              isReal
                ? 'bg-emerald-500 shadow-emerald-500/30'
                : 'bg-rose-500 shadow-rose-500/30'
            }`}
          >
            {isReal ? (
              <CheckCircle2 className="w-8 h-8" />
            ) : (
              <XCircle className="w-8 h-8" />
            )}
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400">
              Classification Result
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-3xl sm:text-4xl font-black tracking-tight ${
                  isReal
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {isReal ? 'REAL' : 'FAKE'}
              </span>
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                {isReal ? 'Authentic Content' : 'Misinformation / Hoax'}
              </span>
            </div>
          </div>
        </div>

        {/* Confidence Badge & Copy */}
        <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-1">
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
              Confidence Score
            </span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {result.confidence}%
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            title="Copy analysis details"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Confidence Bar */}
      <div className="py-4">
        <div className="flex justify-between items-center text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
          <span>AI Certainty Level</span>
          <span>{result.confidence}% Probability</span>
        </div>
        <div className="w-full bg-slate-200/80 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              isReal ? 'bg-emerald-500' : 'bg-rose-500'
            }`}
            style={{ width: `${result.confidence}%` }}
          />
        </div>
      </div>

      {/* Key Explanation / Context */}
      <div className="mt-2 bg-white/70 dark:bg-slate-900/60 rounded-xl p-4 border border-slate-200/50 dark:border-slate-800/80">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-indigo-500" />
          <span>Model Analysis Assessment</span>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
          {result.reasoning}
        </p>
      </div>

      {/* Footer info timestamp */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
        <span>Verified at {result.timestamp}</span>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="hover:text-slate-600 dark:hover:text-slate-300 underline"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}
