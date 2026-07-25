import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Loader2 } from 'lucide-react';
import { searchCities } from '../services/weatherApi';
import { LocationResult } from '../types/weather';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onSelectCity: (lat: number, lon: number, name: string, country?: string, admin1?: string) => void;
  onCurrentLocation: () => void;
  loading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onSelectCity,
  onCurrentLocation,
  loading,
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationResult[]>([]);
  const [isSearchingSuggestions, setIsSearchingSuggestions] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearchingSuggestions(true);
      try {
        const results = await searchCities(trimmed);
        setSuggestions(results);
        setShowDropdown(results.length > 0);
      } catch {
        setSuggestions([]);
      } finally {
        setIsSearchingSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      setInputError('Please enter a city name.');
      return;
    }

    setInputError(null);
    setShowDropdown(false);
    onSearch(trimmed);
  };

  const handleSelectSuggestion = (item: LocationResult) => {
    setQuery(`${item.name}${item.country ? `, ${item.country}` : ''}`);
    setShowDropdown(false);
    setInputError(null);
    onSelectCity(item.latitude, item.longitude, item.name, item.country, item.admin1);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowDropdown(false);
    setInputError(null);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto" id="search-container">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />

          <input
            id="city-search-input"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (inputError) setInputError(null);
            }}
            placeholder="Search city (e.g., London, Tokyo, New York)..."
            className={`w-full pl-11 pr-10 py-3 rounded-full bg-slate-100 dark:bg-slate-800/90 border ${
              inputError
                ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                : 'border-slate-200/80 dark:border-slate-700/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-slate-900'
            } text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 shadow-2xs transition-all text-sm outline-none font-medium`}
          />

          {query && (
            <button
              type="button"
              id="clear-search-btn"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full transition-colors cursor-pointer"
              title="Clear text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="button"
          id="current-location-btn"
          onClick={onCurrentLocation}
          disabled={loading}
          className="ml-2.5 p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer flex items-center justify-center shrink-0 disabled:opacity-50"
          title="Use my current GPS location"
        >
          <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </button>

        <button
          type="submit"
          id="search-submit-btn"
          disabled={loading}
          className="ml-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center shrink-0 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <span className="hidden sm:inline">Search</span>
          )}
          <Search className="w-4 h-4 sm:hidden" />
        </button>
      </form>

      {/* Input Error */}
      {inputError && (
        <p className="mt-1.5 text-xs text-red-500 font-medium pl-4">{inputError}</p>
      )}

      {/* Suggestions Dropdown */}
      {showDropdown && (
        <div
          id="search-suggestions-menu"
          className="absolute z-50 left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden max-h-72 overflow-y-auto"
        >
          {isSearchingSuggestions ? (
            <div className="p-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
              Searching cities...
            </div>
          ) : (
            suggestions.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectSuggestion(item)}
                className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800/50 last:border-0 transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    {item.name}
                  </span>
                  {(item.admin1 || item.country) && (
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                      {[item.admin1, item.country].filter(Boolean).join(', ')}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-600">
                  {item.latitude.toFixed(2)}°, {item.longitude.toFixed(2)}°
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};
