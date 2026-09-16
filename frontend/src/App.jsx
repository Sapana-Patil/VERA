import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TextInputArea from './components/TextInputArea';
import VerdictCard from './components/VerdictCard';
import HistoryList from './components/HistoryList';
import { analyzeNewsText } from './services/api';
import { Shield, Sparkles } from 'lucide-react';

export default function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  // Theme state
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('vera_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark class to html document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vera_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('vera_theme', 'light');
    }
  }, [isDark]);

  // Load history from localStorage on initial render
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('vera_history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error('Failed to load history', e);
    }
  }, []);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Please provide a statement or news snippet to analyze.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const analysis = await analyzeNewsText(text.trim());
      setResult(analysis);

      // Add to history
      const newHistoryItem = {
        text: text.trim(),
        verdict: analysis.verdict,
        confidence: analysis.confidence,
        timestamp: analysis.timestamp,
        reasoning: analysis.reasoning,
      };

      setHistory((prev) => {
        // keep up to 10 recent items
        const updated = [newHistoryItem, ...prev.filter(item => item.text !== newHistoryItem.text)].slice(0, 10);
        localStorage.setItem('vera_history', JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      setError('An error occurred while analyzing the text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistory = (item) => {
    setText(item.text);
    setResult({
      verdict: item.verdict,
      confidence: item.confidence,
      reasoning: item.reasoning,
      timestamp: item.timestamp,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('vera_history');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header
        isDark={isDark}
        onToggleDark={() => setIsDark((prev) => !prev)}
      />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Hero Introduction */}
        <section className="text-center space-y-3 pt-2 sm:pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Real-Time Veracity & Truth Classification</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Spot Misinformation. <br className="hidden sm:inline" />
            Verify <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent">Real vs Fake</span> in Minutes.
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Input any news article excerpt, viral headline, or social claim to immediately detect whether it is authentic or fabricated.
          </p>
        </section>

        {/* Input Area */}
        <section>
          <TextInputArea
            text={text}
            setText={setText}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            error={error}
          />
        </section>

        {/* Result Area */}
        {result && (
          <section id="verdict-section">
            <VerdictCard
              result={result}
              onDismiss={() => setResult(null)}
            />
          </section>
        )}

        {/* History List */}
        <section>
          <HistoryList
            history={history}
            onSelectHistory={handleSelectHistory}
            onClearHistory={handleClearHistory}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-500" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">Vera </span>
            <span>— Fake News Detection Platform</span>
          </div>
          <div>
            Built with React, Vite & Tailwind CSS
          </div>
        </div>
      </footer>
    </div>
  );
}
