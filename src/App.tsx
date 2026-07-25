import { useTheme } from './hooks/useTheme';
import { useWeather } from './hooks/useWeather';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FavoriteCities } from './components/FavoriteCities';
import { WeatherCard } from './components/WeatherCard';
import { RecommendationCard } from './components/RecommendationCard';
import { HourlyForecast } from './components/HourlyForecast';
import { ForecastCard } from './components/ForecastCard';
import { WeatherChart } from './components/WeatherChart';
import { Footer } from './components/Footer';
import { AlertCircle, Loader2, RefreshCw, Sparkles } from 'lucide-react';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const {
    weatherData,
    loading,
    error,
    tempUnit,
    searchHistory,
    favorites,
    searchCity,
    fetchWeatherByCoords,
    fetchCurrentLocationWeather,
    toggleFavorite,
    isFavorite,
    clearHistory,
    toggleTempUnit,
    removeFavorite,
  } = useWeather();

  const handleSelectCity = (
    lat: number,
    lon: number,
    name: string,
    country?: string,
    admin1?: string
  ) => {
    fetchWeatherByCoords(lat, lon, name, country, admin1);
  };

  const isCurrentFavorite = weatherData
    ? isFavorite(weatherData.location.name, weatherData.location.country)
    : false;

  const handleToggleCurrentFavorite = () => {
    if (!weatherData) return;
    toggleFavorite({
      id: `${weatherData.location.latitude.toFixed(2)}_${weatherData.location.longitude.toFixed(2)}`,
      name: weatherData.location.name,
      country: weatherData.location.country,
      admin1: weatherData.location.admin1,
      latitude: weatherData.location.latitude,
      longitude: weatherData.location.longitude,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Header */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        tempUnit={tempUnit}
        onToggleTempUnit={toggleTempUnit}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Search Section */}
        <div className="space-y-4">
          <SearchBar
            onSearch={searchCity}
            onSelectCity={handleSelectCity}
            onCurrentLocation={fetchCurrentLocationWeather}
            loading={loading}
          />

          {/* Saved Cities & History */}
          <FavoriteCities
            favorites={favorites}
            searchHistory={searchHistory}
            onSelectCity={handleSelectCity}
            onRemoveFavorite={removeFavorite}
            onClearHistory={clearHistory}
          />
        </div>

        {/* Error Banner */}
        {error && (
          <div
            id="error-banner"
            className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 flex items-center justify-between gap-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
            <button
              onClick={() => searchCity(weatherData?.location.name || 'Tokyo')}
              className="px-3 py-1 bg-red-100 dark:bg-red-900/60 hover:bg-red-200 text-red-900 dark:text-red-100 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry
            </button>
          </div>
        )}

        {/* Loading Spinner Skeleton state */}
        {loading && !weatherData && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Fetching weather telemetry...
            </p>
          </div>
        )}

        {/* Weather Dashboard - Geometric Balance 2-Column Grid */}
        {weatherData && (
          <div
            className={`grid grid-cols-1 lg:grid-cols-12 gap-6 transition-opacity duration-300 ${
              loading ? 'opacity-50 pointer-events-none' : 'opacity-100'
            }`}
          >
            {/* Sidebar Column: Current Weather + Insights */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-6">
              {/* Current Weather Card */}
              <WeatherCard
                data={weatherData}
                tempUnit={tempUnit}
                isFavorite={isCurrentFavorite}
                onToggleFavorite={handleToggleCurrentFavorite}
              />

              {/* Smart Insights & Recommendations */}
              <RecommendationCard data={weatherData} />
            </div>

            {/* Main Content Column: Hourly, 7-Day & Charts */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {/* Hourly Forecast */}
              <HourlyForecast hourlyList={weatherData.hourly} tempUnit={tempUnit} />

              {/* 7-Day Forecast */}
              <ForecastCard dailyList={weatherData.daily} tempUnit={tempUnit} />

              {/* Interactive Visual Analytics */}
              <WeatherChart data={weatherData} tempUnit={tempUnit} />
            </div>
          </div>
        )}

        {/* Empty State Fallback */}
        {!weatherData && !loading && !error && (
          <div className="text-center py-20 space-y-3">
            <Sparkles className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">
              Search Any Global Location
            </h3>
            <p className="text-sm text-slate-400 dark:text-slate-500 max-w-sm mx-auto">
              Type a city name above or tap the location button to explore weather forecasts and trend telemetry.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
