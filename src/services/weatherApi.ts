/**
 * Open-Meteo API Service
 * Free open-source weather API requiring no API keys
 */

import axios from 'axios';
import { LocationResult, WeatherData, HourlyForecastItem, DailyForecastItem } from '../types/weather';
import { formatDate } from '../utils/formatters';

const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1';
const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1';

/**
 * Search cities by name using Open-Meteo Geocoding API
 */
export async function searchCities(query: string): Promise<LocationResult[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  try {
    const response = await axios.get(`${GEOCODING_BASE_URL}/search`, {
      params: {
        name: trimmed,
        count: 10,
        language: 'en',
        format: 'json',
      },
    });

    if (!response.data || !response.data.results) {
      return [];
    }

    return response.data.results as LocationResult[];
  } catch (error) {
    console.error('Failed to search cities:', error);
    throw new Error('Failed to connect to weather location service. Please check your network.');
  }
}

/**
 * Get weather forecast data for specific latitude and longitude
 */
export async function getWeatherForecast(
  latitude: number,
  longitude: number,
  locationName: string,
  country?: string,
  admin1?: string
): Promise<WeatherData> {
  try {
    const response = await axios.get(`${FORECAST_BASE_URL}/forecast`, {
      params: {
        latitude,
        longitude,
        current: [
          'temperature_2m',
          'relative_humidity_2m',
          'apparent_temperature',
          'is_day',
          'precipitation',
          'rain',
          'weather_code',
          'surface_pressure',
          'wind_speed_10m',
          'wind_direction_10m',
          'visibility',
        ].join(','),
        hourly: [
          'temperature_2m',
          'relative_humidity_2m',
          'apparent_temperature',
          'precipitation_probability',
          'precipitation',
          'weather_code',
          'surface_pressure',
          'visibility',
          'wind_speed_10m',
          'wind_direction_10m',
          'uv_index',
        ].join(','),
        daily: [
          'weather_code',
          'temperature_2m_max',
          'temperature_2m_min',
          'apparent_temperature_max',
          'apparent_temperature_min',
          'sunrise',
          'sunset',
          'uv_index_max',
          'precipitation_sum',
          'precipitation_probability_max',
          'wind_speed_10m_max',
          'wind_direction_10m_dominant',
        ].join(','),
        timezone: 'auto',
      },
    });

    const data = response.data;
    if (!data || !data.current) {
      throw new Error('Invalid weather data format received.');
    }

    const currentData = data.current;
    const hourlyRaw = data.hourly || {};
    const dailyRaw = data.daily || {};

    // Transform Hourly Data
    const hourlyList: HourlyForecastItem[] = [];
    if (hourlyRaw.time && Array.isArray(hourlyRaw.time)) {
      // Find current index matching current time or start from index 0
      const nowIso = new Date().toISOString();
      let startIndex = 0;
      for (let i = 0; i < hourlyRaw.time.length; i++) {
        if (hourlyRaw.time[i] >= nowIso.substring(0, 13)) {
          startIndex = i;
          break;
        }
      }

      // Next 24-36 hours
      const endIndex = Math.min(startIndex + 24, hourlyRaw.time.length);
      for (let i = startIndex; i < endIndex; i++) {
        const rawTime = hourlyRaw.time[i];
        const dateObj = new Date(rawTime);
        const formattedTime = dateObj.toLocaleTimeString([], {
          hour: 'numeric',
          hour12: true,
        });

        hourlyList.push({
          time: rawTime,
          formattedTime,
          temperature: hourlyRaw.temperature_2m?.[i] ?? 0,
          apparentTemperature: hourlyRaw.apparent_temperature?.[i] ?? 0,
          relativeHumidity: hourlyRaw.relative_humidity_2m?.[i] ?? 0,
          precipitationProbability: hourlyRaw.precipitation_probability?.[i] ?? 0,
          precipitation: hourlyRaw.precipitation?.[i] ?? 0,
          weatherCode: hourlyRaw.weather_code?.[i] ?? 0,
          surfacePressure: hourlyRaw.surface_pressure?.[i] ?? 0,
          visibility: hourlyRaw.visibility?.[i] ?? 10000,
          windSpeed: hourlyRaw.wind_speed_10m?.[i] ?? 0,
          windDirection: hourlyRaw.wind_direction_10m?.[i] ?? 0,
          uvIndex: hourlyRaw.uv_index?.[i] ?? 0,
        });
      }
    }

    // Transform Daily Data (7 Days)
    const dailyList: DailyForecastItem[] = [];
    if (dailyRaw.time && Array.isArray(dailyRaw.time)) {
      const daysCount = Math.min(7, dailyRaw.time.length);
      for (let i = 0; i < daysCount; i++) {
        const rawDate = dailyRaw.time[i];
        const { formatted, dayName } = formatDate(rawDate);

        dailyList.push({
          date: rawDate,
          formattedDate: formatted,
          dayName,
          weatherCode: dailyRaw.weather_code?.[i] ?? 0,
          temperatureMax: dailyRaw.temperature_2m_max?.[i] ?? 0,
          temperatureMin: dailyRaw.temperature_2m_min?.[i] ?? 0,
          apparentTemperatureMax: dailyRaw.apparent_temperature_max?.[i] ?? 0,
          apparentTemperatureMin: dailyRaw.apparent_temperature_min?.[i] ?? 0,
          sunrise: dailyRaw.sunrise?.[i] ?? '',
          sunset: dailyRaw.sunset?.[i] ?? '',
          uvIndexMax: dailyRaw.uv_index_max?.[i] ?? 0,
          precipitationSum: dailyRaw.precipitation_sum?.[i] ?? 0,
          precipitationProbabilityMax: dailyRaw.precipitation_probability_max?.[i] ?? 0,
          windSpeedMax: dailyRaw.wind_speed_10m_max?.[i] ?? 0,
          windDirectionDominant: dailyRaw.wind_direction_10m_dominant?.[i] ?? 0,
        });
      }
    }

    return {
      location: {
        name: locationName,
        country: country || '',
        admin1: admin1 || '',
        latitude,
        longitude,
        timezone: data.timezone || 'auto',
        elevation: data.elevation,
      },
      current: {
        time: currentData.time,
        temperature: currentData.temperature_2m,
        apparentTemperature: currentData.apparent_temperature,
        relativeHumidity: currentData.relative_humidity_2m,
        isDay: currentData.is_day,
        precipitation: currentData.precipitation,
        rain: currentData.rain,
        weatherCode: currentData.weather_code,
        surfacePressure: currentData.surface_pressure,
        windSpeed: currentData.wind_speed_10m,
        windDirection: currentData.wind_direction_10m,
        visibility: currentData.visibility,
      },
      hourly: hourlyList,
      daily: dailyList,
      units: {
        temperature: '°C',
        windSpeed: 'km/h',
        precipitation: 'mm',
      },
    };
  } catch (error) {
    console.error('Failed to fetch forecast:', error);
    throw new Error('Unable to fetch weather forecast data. Please try again.');
  }
}

/**
 * Reverse lookup city name from lat/lon using Open-Meteo reverse geocoding or nominatim fallback
 */
export async function getCityByCoordinates(latitude: number, longitude: number): Promise<{ name: string; country: string; admin1?: string }> {
  try {
    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
      params: {
        lat: latitude,
        lon: longitude,
        format: 'json',
      },
      headers: {
        'Accept-Language': 'en',
      },
    });

    if (res.data && res.data.address) {
      const addr = res.data.address;
      const name = addr.city || addr.town || addr.village || addr.suburb || addr.county || 'Your Location';
      const country = addr.country || '';
      const admin1 = addr.state || '';
      return { name, country, admin1 };
    }
  } catch (e) {
    console.warn('Reverse geocoding failed, using fallback location name:', e);
  }

  return { name: 'Current Location', country: '' };
}
