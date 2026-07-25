import React from 'react';
import { Clock, Umbrella, Wind } from 'lucide-react';
import { HourlyForecastItem, TemperatureUnit } from '../types/weather';
import { getWMOInfo } from '../utils/wmoCodes';
import { formatTemp, formatWindSpeed } from '../utils/formatters';
import { WeatherIcon } from './WeatherCard';

interface HourlyForecastProps {
  hourlyList: HourlyForecastItem[];
  tempUnit: TemperatureUnit;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyList, tempUnit }) => {
  if (!hourlyList || hourlyList.length === 0) return null;

  return (
    <div
      id="hourly-forecast-card"
      className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-500" />
          HOURLY FORECAST
        </h3>
        <span className="text-[10px] font-bold text-slate-400 uppercase">24-Hour Horizon</span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
        {hourlyList.slice(0, 24).map((item, index) => {
          const wmo = getWMOInfo(item.weatherCode);
          return (
            <div
              key={`hourly-${item.time}-${index}`}
              className="flex flex-col items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 min-w-[88px] text-center hover:border-blue-500 transition-colors cursor-default shrink-0"
            >
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                {index === 0 ? 'Now' : item.formattedTime}
              </span>

              <div className="my-2 text-blue-500">
                <WeatherIcon iconName={wmo.iconName} className="w-7 h-7" />
              </div>

              <span className="text-base font-black text-slate-900 dark:text-slate-100">
                {formatTemp(item.temperature, tempUnit)}
              </span>

              <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 mt-2">
                <Umbrella className="w-3 h-3" />
                <span>{item.precipitationProbability}%</span>
              </div>

              <div className="flex items-center gap-0.5 text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                <Wind className="w-3 h-3" />
                <span>{formatWindSpeed(item.windSpeed, tempUnit)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
