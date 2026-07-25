import React from 'react';
import { Calendar, Umbrella, Wind, ArrowUp, ArrowDown } from 'lucide-react';
import { DailyForecastItem, TemperatureUnit } from '../types/weather';
import { getWMOInfo } from '../utils/wmoCodes';
import { formatTemp, formatWindSpeed } from '../utils/formatters';
import { WeatherIcon } from './WeatherCard';

interface ForecastCardProps {
  dailyList: DailyForecastItem[];
  tempUnit: TemperatureUnit;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ dailyList, tempUnit }) => {
  if (!dailyList || dailyList.length === 0) return null;

  return (
    <div
      id="7-day-forecast-card"
      className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          7-DAY FORECAST
        </h3>
        <span className="text-[10px] font-bold text-slate-400 uppercase">Weekly Outlook</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {dailyList.map((day, index) => {
          const wmo = getWMOInfo(day.weatherCode);
          const isToday = index === 0;

          return (
            <div
              key={`daily-${day.date}-${index}`}
              className={`p-4 rounded-2xl border text-center transition-all cursor-pointer group flex flex-col items-center justify-between gap-2 ${
                isToday
                  ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800'
                  : 'bg-white dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-blue-500'
              }`}
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  isToday ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {day.dayName}
              </p>

              <div className="w-8 h-8 my-1 text-blue-500 group-hover:scale-110 transition-transform">
                <WeatherIcon iconName={wmo.iconName} className="w-8 h-8" />
              </div>

              <div>
                <p className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center justify-center gap-0.5">
                  <ArrowUp className="w-3 h-3 text-red-500" />
                  {formatTemp(day.temperatureMax, tempUnit)}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-0.5 mt-0.5">
                  <ArrowDown className="w-3 h-3 text-blue-500" />
                  {formatTemp(day.temperatureMin, tempUnit)}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 w-full flex items-center justify-between text-[10px] text-slate-400 font-medium">
                <span className="flex items-center gap-0.5 text-blue-600 dark:text-blue-400 font-bold">
                  <Umbrella className="w-3 h-3" />
                  {day.precipitationProbabilityMax}%
                </span>
                <span className="flex items-center gap-0.5">
                  <Wind className="w-3 h-3" />
                  {formatWindSpeed(day.windSpeedMax, tempUnit)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
