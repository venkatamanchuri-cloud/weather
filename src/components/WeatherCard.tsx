import React from 'react';
import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudRainWind,
  CloudDrizzle,
  CloudSnow,
  CloudFog,
  CloudLightning,
  Snowflake,
  Wind,
  Droplets,
  Gauge,
  Eye,
  Sunrise,
  Sunset,
  Star,
  Clock,
  Thermometer,
} from 'lucide-react';
import { WeatherData, TemperatureUnit } from '../types/weather';
import { getWMOInfo } from '../utils/wmoCodes';
import {
  formatTemp,
  formatWindSpeed,
  getWindDirectionLabel,
  formatTime,
  formatVisibility,
} from '../utils/formatters';

interface WeatherCardProps {
  data: WeatherData;
  tempUnit: TemperatureUnit;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const WeatherIcon: React.FC<{ iconName: string; className?: string }> = ({
  iconName,
  className = 'w-10 h-10',
}) => {
  switch (iconName) {
    case 'Sun':
    case 'SunDim':
      return <Sun className={className} />;
    case 'Moon':
      return <Moon className={className} />;
    case 'CloudSun':
      return <CloudSun className={className} />;
    case 'CloudMoon':
      return <CloudMoon className={className} />;
    case 'Cloud':
      return <Cloud className={className} />;
    case 'CloudFog':
      return <CloudFog className={className} />;
    case 'CloudDrizzle':
      return <CloudDrizzle className={className} />;
    case 'CloudRain':
      return <CloudRain className={className} />;
    case 'CloudRainWind':
      return <CloudRainWind className={className} />;
    case 'CloudSnow':
      return <CloudSnow className={className} />;
    case 'Snowflake':
      return <Snowflake className={className} />;
    case 'CloudLightning':
      return <CloudLightning className={className} />;
    default:
      return <Cloud className={className} />;
  }
};

export const WeatherCard: React.FC<WeatherCardProps> = ({
  data,
  tempUnit,
  isFavorite,
  onToggleFavorite,
}) => {
  const { location, current, daily } = data;
  const wmo = getWMOInfo(current.weatherCode, current.isDay);

  const todayDaily = daily[0];
  const sunriseFormatted = todayDaily ? formatTime(todayDaily.sunrise, location.timezone) : 'N/A';
  const sunsetFormatted = todayDaily ? formatTime(todayDaily.sunset, location.timezone) : 'N/A';
  const currentTimeFormatted = formatTime(current.time, location.timezone);

  return (
    <div
      id="current-weather-card"
      className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center relative overflow-hidden transition-all"
    >
      {/* Top Header Strip */}
      <div className="flex items-center justify-between w-full mb-4">
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1">
          <Clock className="w-3 h-3 text-blue-500" />
          NOW • {currentTimeFormatted}
        </span>
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-black tracking-wider text-blue-600 dark:text-blue-400 uppercase">
            {location.name}
            {location.country ? `, ${location.country}` : ''}
          </span>
          <button
            onClick={onToggleFavorite}
            id="favorite-toggle-btn"
            className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star
              className={`w-4 h-4 transition-transform hover:scale-110 ${
                isFavorite
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-slate-300 dark:text-slate-600 hover:text-amber-400'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Main Weather Visual */}
      <div className="w-28 h-28 my-2 relative flex items-center justify-center">
        <div className="absolute inset-0 bg-blue-100/60 dark:bg-blue-900/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="relative text-blue-600 dark:text-blue-400">
          <WeatherIcon iconName={wmo.iconName} className="w-20 h-20 drop-shadow-md" />
        </div>
      </div>

      {/* Main Temperature & Conditions */}
      <div className="text-6xl font-black tracking-tight text-slate-900 dark:text-slate-100 my-1">
        {formatTemp(current.temperature, tempUnit)}
      </div>
      <div className="text-base font-semibold text-slate-600 dark:text-slate-300 mb-1">
        {wmo.label}
      </div>
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-6 flex items-center justify-center gap-1">
        <Thermometer className="w-3.5 h-3.5 text-blue-500" />
        Feels like {formatTemp(current.apparentTemperature, tempUnit)}
        {todayDaily && (
          <span className="ml-1 font-mono text-[11px]">
            (H: {formatTemp(todayDaily.temperatureMax, tempUnit)} • L: {formatTemp(todayDaily.temperatureMin, tempUnit)})
          </span>
        )}
      </p>

      {/* Metrics Grid (4-6 Cell Clean Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 w-full gap-4 pt-6 border-t border-slate-100 dark:border-slate-800/80 text-left">
        <div>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold mb-1 flex items-center gap-1">
            <Droplets className="w-3 h-3 text-blue-500" /> Humidity
          </p>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
            {current.relativeHumidity}%
          </p>
        </div>

        <div>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold mb-1 flex items-center gap-1">
            <Wind className="w-3 h-3 text-blue-500" /> Wind
          </p>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
            {formatWindSpeed(current.windSpeed, tempUnit)} ({getWindDirectionLabel(current.windDirection)})
          </p>
        </div>

        <div>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold mb-1 flex items-center gap-1">
            <Eye className="w-3 h-3 text-blue-500" /> Visibility
          </p>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
            {formatVisibility(current.visibility)}
          </p>
        </div>

        <div>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold mb-1 flex items-center gap-1">
            <Gauge className="w-3 h-3 text-blue-500" /> Pressure
          </p>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
            {Math.round(current.surfacePressure)} hPa
          </p>
        </div>

        <div>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold mb-1 flex items-center gap-1">
            <Sunrise className="w-3 h-3 text-amber-500" /> Sunrise
          </p>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
            {sunriseFormatted}
          </p>
        </div>

        <div>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold mb-1 flex items-center gap-1">
            <Sunset className="w-3 h-3 text-orange-500" /> Sunset
          </p>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
            {sunsetFormatted}
          </p>
        </div>
      </div>
    </div>
  );
};
