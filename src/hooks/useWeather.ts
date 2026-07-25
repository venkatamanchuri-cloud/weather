import { useState, useEffect, useCallback } from 'react';
import { WeatherData, TemperatureUnit, SavedCity } from '../types/weather';
import { searchCities, getWeatherForecast, getCityByCoordinates } from '../services/weatherApi';

const SEARCH_HISTORY_KEY = 'weather_app_search_history';
const FAVORITES_KEY = 'weather_app_favorites';
const TEMP_UNIT_KEY = 'weather_app_temp_unit';

export function useWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [tempUnit, setTempUnit] = useState<TemperatureUnit>(() => {
    const saved = localStorage.getItem(TEMP_UNIT_KEY);
    return saved === 'fahrenheit' ? 'fahrenheit' : 'celsius';
  });

  const [searchHistory, setSearchHistory] = useState<SavedCity[]>(() => {
    try {
      const saved = localStorage.getItem(SEARCH_HISTORY_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<SavedCity[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save temperature unit preference
  useEffect(() => {
    localStorage.setItem(TEMP_UNIT_KEY, tempUnit);
  }, [tempUnit]);

  // Helper to add search to history (max 5)
  const addToHistory = useCallback((city: SavedCity) => {
    setSearchHistory((prev) => {
      const filtered = prev.filter(
        (item) => item.name.toLowerCase() !== city.name.toLowerCase() || item.country !== city.country
      );
      const updated = [city, ...filtered].slice(0, 5);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Fetch weather by exact lat/lon
  const fetchWeatherByCoords = useCallback(
    async (lat: number, lon: number, name: string, country?: string, admin1?: string) => {
      setLoading(true);
      setError(null);
      try {
        const data = await getWeatherForecast(lat, lon, name, country, admin1);
        setWeatherData(data);

        addToHistory({
          id: `${lat.toFixed(2)}_${lon.toFixed(2)}`,
          name,
          country,
          admin1,
          latitude: lat,
          longitude: lon,
        });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to fetch weather data';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [addToHistory]
  );

  // Search city by string name
  const searchCity = useCallback(
    async (cityName: string) => {
      const trimmed = cityName.trim();
      if (!trimmed) {
        setError('Please enter a city name to search.');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const results = await searchCities(trimmed);
        if (results.length === 0) {
          setError(`No city found matching "${trimmed}". Please check spelling and try again.`);
          setLoading(false);
          return;
        }

        const topResult = results[0];
        await fetchWeatherByCoords(
          topResult.latitude,
          topResult.longitude,
          topResult.name,
          topResult.country,
          topResult.admin1
        );
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error searching city';
        setError(message);
        setLoading(false);
      }
    },
    [fetchWeatherByCoords]
  );

  // Fetch current geolocation weather
  const fetchCurrentLocationWeather = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const locationInfo = await getCityByCoordinates(latitude, longitude);
          await fetchWeatherByCoords(
            latitude,
            longitude,
            locationInfo.name,
            locationInfo.country,
            locationInfo.admin1
          );
        } catch {
          await fetchWeatherByCoords(latitude, longitude, 'My Location');
        }
      },
      (geoError) => {
        console.warn('Geolocation denied or failed:', geoError);
        searchCity('Tokyo');
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  }, [fetchWeatherByCoords, searchCity]);

  // Toggle favorite
  const toggleFavorite = useCallback((city: SavedCity) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (f) => f.name.toLowerCase() === city.name.toLowerCase() && f.country === city.country
      );
      let updated: SavedCity[];
      if (exists) {
        updated = prev.filter(
          (f) => !(f.name.toLowerCase() === city.name.toLowerCase() && f.country === city.country)
        );
      } else {
        updated = [...prev, city];
      }
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const updated = prev.filter((f) => f.id !== id);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Clear search history
  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  }, []);

  // Toggle temperature unit
  const toggleTempUnit = useCallback(() => {
    setTempUnit((prev) => (prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  }, []);

  // On initial mount, fetch default location (Tokyo or GPS)
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const loc = await getCityByCoordinates(latitude, longitude);
          fetchWeatherByCoords(latitude, longitude, loc.name, loc.country, loc.admin1);
        },
        () => {
          searchCity('Tokyo');
        },
        { timeout: 5000 }
      );
    } else {
      searchCity('Tokyo');
    }
  }, [fetchWeatherByCoords, searchCity]);

  const isFavorite = useCallback(
    (cityName: string, country?: string) => {
      return favorites.some(
        (f) => f.name.toLowerCase() === cityName.toLowerCase() && (!country || f.country === country)
      );
    },
    [favorites]
  );

  return {
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
    removeFavorite,
    isFavorite,
    clearHistory,
    toggleTempUnit,
  };
}
