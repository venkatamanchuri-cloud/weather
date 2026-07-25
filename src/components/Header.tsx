import React from 'react';
import { CloudSun } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Theme } from '../hooks/useTheme';
import { TemperatureUnit } from '../types/weather';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  tempUnit: TemperatureUnit;
  onToggleTempUnit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  tempUnit,
  onToggleTempUnit,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo - Geometric Balance Style */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 shrink-0">
            <CloudSun className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1">
              WEATHER<span className="text-blue-600 dark:text-blue-500">INTEL</span>
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 hidden sm:block">
              Geometric Weather Intelligence
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Temperature Unit Switcher */}
          <div className="bg-slate-100 dark:bg-slate-800/80 p-1 rounded-full border border-slate-200/80 dark:border-slate-700/80 flex items-center">
            <button
              onClick={onToggleTempUnit}
              id="unit-celsius-btn"
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                tempUnit === 'celsius'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              °C
            </button>
            <button
              onClick={onToggleTempUnit}
              id="unit-fahrenheit-btn"
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                tempUnit === 'fahrenheit'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              °F
            </button>
          </div>

          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

          {/* Theme Toggle */}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
};
