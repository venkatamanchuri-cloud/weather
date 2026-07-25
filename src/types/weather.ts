/**
 * Weather Intelligence Type Definitions
 */

export interface LocationResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  admin1?: string; // State / Region
  admin2?: string;
  admin3?: string;
  country?: string;
  timezone?: string;
  population?: number;
  postcodes?: string[];
  country_id?: number;
}

export interface FavoriteCity {
  id: string;
  name: string;
  country?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

export type SavedCity = FavoriteCity;

export interface CurrentWeatherData {
  time: string;
  temperature: number;
  apparentTemperature: number;
  relativeHumidity: number;
  isDay: number;
  precipitation: number;
  rain: number;
  weatherCode: number;
  surfacePressure: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
}

export interface HourlyForecastItem {
  time: string;
  formattedTime: string;
  temperature: number;
  apparentTemperature: number;
  relativeHumidity: number;
  precipitationProbability: number;
  precipitation: number;
  weatherCode: number;
  surfacePressure: number;
  visibility: number;
  windSpeed: number;
  windDirection: number;
  uvIndex: number;
}

export interface DailyForecastItem {
  date: string;
  formattedDate: string;
  dayName: string;
  weatherCode: number;
  temperatureMax: number;
  temperatureMin: number;
  apparentTemperatureMax: number;
  apparentTemperatureMin: number;
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
  precipitationSum: number;
  precipitationProbabilityMax: number;
  windSpeedMax: number;
  windDirectionDominant: number;
}

export interface WeatherData {
  location: {
    name: string;
    country?: string;
    admin1?: string;
    latitude: number;
    longitude: number;
    timezone: string;
    elevation?: number;
  };
  current: CurrentWeatherData;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  units: {
    temperature: '°C' | '°F';
    windSpeed: 'km/h' | 'mph';
    precipitation: 'mm' | 'in';
  };
}

export interface WeatherRecommendation {
  id: string;
  type: 'alert' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
  iconName: string;
  category: 'clothing' | 'activity' | 'travel' | 'health' | 'general';
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';
