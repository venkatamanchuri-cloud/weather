import React from 'react';
import { Bookmark, MapPin, X, ArrowUpRight, History, Trash2 } from 'lucide-react';
import { SavedCity } from '../types/weather';

interface FavoriteCitiesProps {
  favorites: SavedCity[];
  searchHistory?: SavedCity[];
  onSelectCity: (lat: number, lon: number, name: string, country?: string) => void;
  onRemoveFavorite?: (id: string) => void;
  onClearHistory?: () => void;
}

export const FavoriteCities: React.FC<FavoriteCitiesProps> = ({
  favorites,
  searchHistory = [],
  onSelectCity,
  onRemoveFavorite,
  onClearHistory,
}) => {
  const hasFavorites = favorites && favorites.length > 0;
  const hasHistory = searchHistory && searchHistory.length > 0;

  if (!hasFavorites && !hasHistory) return null;

  return (
    <div
      id="favorite-cities-section"
      className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
    >
      {/* Saved Favorites */}
      {hasFavorites && (
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-blue-500" />
              SAVED LOCATIONS
            </h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              {favorites.length} Saved
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {favorites.map((city) => (
              <div
                key={`fav-${city.id}`}
                className="group flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 hover:border-blue-300 dark:hover:border-blue-700 rounded-full transition-all"
              >
                <button
                  onClick={() => onSelectCity(city.latitude, city.longitude, city.name, city.country)}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  <span>{city.name}</span>
                  {city.country && (
                    <span className="text-[10px] text-slate-400 font-normal">
                      ({city.country})
                    </span>
                  )}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                {onRemoveFavorite && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFavorite(city.id);
                    }}
                    className="p-0.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400 rounded-full transition-colors cursor-pointer"
                    title="Remove from favorites"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Search History */}
      {hasHistory && (
        <div className={hasFavorites ? 'pt-3 border-t border-slate-100 dark:border-slate-800/80' : ''}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-slate-400" />
              RECENT SEARCHES
            </h3>
            {onClearHistory && (
              <button
                onClick={onClearHistory}
                className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {searchHistory.map((item) => (
              <button
                key={`hist-${item.id}`}
                onClick={() => onSelectCity(item.latitude, item.longitude, item.name, item.country)}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-800/40 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 rounded-full text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>{item.name}</span>
                {item.country && <span className="text-[10px] opacity-60">{item.country}</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
