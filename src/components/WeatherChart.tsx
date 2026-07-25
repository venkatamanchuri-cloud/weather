import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { LineChart as LineChartIcon, Thermometer, CloudRain, Wind, Calendar } from 'lucide-react';
import { WeatherData, TemperatureUnit } from '../types/weather';
import { convertTemperature } from '../utils/formatters';

interface WeatherChartProps {
  data: WeatherData;
  tempUnit: TemperatureUnit;
}

type ChartTab = 'hourlyTemp' | 'rainProb' | 'windSpeed' | 'dailyComparison';

export const WeatherChart: React.FC<WeatherChartProps> = ({ data, tempUnit }) => {
  const [activeTab, setActiveTab] = useState<ChartTab>('hourlyTemp');

  const unitSymbol = tempUnit === 'fahrenheit' ? '°F' : '°C';

  const hourlyChartData = data.hourly.slice(0, 24).map((item) => ({
    time: item.formattedTime,
    Temp: convertTemperature(item.temperature, tempUnit),
    FeelsLike: convertTemperature(item.apparentTemperature, tempUnit),
    RainChance: item.precipitationProbability,
    Precipitation: item.precipitation,
    WindSpeed: Math.round(item.windSpeed),
  }));

  const dailyChartData = data.daily.map((item) => ({
    day: item.dayName,
    MaxTemp: convertTemperature(item.temperatureMax, tempUnit),
    MinTemp: convertTemperature(item.temperatureMin, tempUnit),
    RainMax: item.precipitationProbabilityMax,
    WindMax: Math.round(item.windSpeedMax),
  }));

  return (
    <div
      id="weather-charts-container"
      className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <LineChartIcon className="w-4 h-4 text-blue-500" />
            WEATHER TREND ANALYTICS
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
            Visual meteorological projections
          </p>
        </div>

        {/* Geometric Balance Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-full overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('hourlyTemp')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
              activeTab === 'hourlyTemp'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" />
            Temperature
          </button>

          <button
            onClick={() => setActiveTab('rainProb')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
              activeTab === 'rainProb'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            Rain Chance
          </button>

          <button
            onClick={() => setActiveTab('windSpeed')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
              activeTab === 'windSpeed'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            Wind
          </button>

          <button
            onClick={() => setActiveTab('dailyComparison')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
              activeTab === 'dailyComparison'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            7-Day Range
          </button>
        </div>
      </div>

      {/* Chart Display Area */}
      <div className="w-full h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === 'hourlyTemp' ? (
            <AreaChart data={hourlyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="feelsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} unit={unitSymbol} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  borderColor: '#334155',
                  borderRadius: '16px',
                  color: '#f8fafc',
                  fontSize: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Area
                type="monotone"
                dataKey="Temp"
                name={`Temperature (${unitSymbol})`}
                stroke="#2563eb"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#tempGradient)"
              />
              <Area
                type="monotone"
                dataKey="FeelsLike"
                name={`Feels Like (${unitSymbol})`}
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#feelsGradient)"
              />
            </AreaChart>
          ) : activeTab === 'rainProb' ? (
            <BarChart data={hourlyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} unit="%" domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  borderColor: '#334155',
                  borderRadius: '16px',
                  color: '#f8fafc',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar
                dataKey="RainChance"
                name="Rain Chance (%)"
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          ) : activeTab === 'windSpeed' ? (
            <AreaChart data={hourlyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} unit=" km/h" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  borderColor: '#334155',
                  borderRadius: '16px',
                  color: '#f8fafc',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Area
                type="monotone"
                dataKey="WindSpeed"
                name="Wind Speed (km/h)"
                stroke="#0d9488"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#windGradient)"
              />
            </AreaChart>
          ) : (
            <BarChart data={dailyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} unit={unitSymbol} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  borderColor: '#334155',
                  borderRadius: '16px',
                  color: '#f8fafc',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar
                dataKey="MaxTemp"
                name={`Max Temp (${unitSymbol})`}
                fill="#ef4444"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="MinTemp"
                name={`Min Temp (${unitSymbol})`}
                fill="#2563eb"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
