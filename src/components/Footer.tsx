import React from 'react';
import { Cloud, ExternalLink, Heart, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      id="app-footer"
      className="mt-12 py-8 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Cloud className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-slate-800 dark:text-slate-200">
            AETHER WEATHER INTELLIGENCE
          </span>
          <span className="text-[10px] bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider">
            Geometric Edition
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 font-medium"
          >
            Powered by Open-Meteo API
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-emerald-500" />
            No API Keys Required
          </span>
        </div>
      </div>
    </footer>
  );
};
