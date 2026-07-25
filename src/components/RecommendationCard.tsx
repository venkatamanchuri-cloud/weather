import React from 'react';
import {
  Sparkles,
  Umbrella,
  ThermometerSun,
  Snowflake,
  Wind,
  Sun,
  Shirt,
  Car,
  Compass,
  Smile,
} from 'lucide-react';
import { WeatherData } from '../types/weather';
import { generateRecommendations } from '../utils/recommendations';

interface RecommendationCardProps {
  data: WeatherData;
}

const RecommendationIcon: React.FC<{ name: string; className?: string }> = ({
  name,
  className = 'w-5 h-5',
}) => {
  switch (name) {
    case 'Umbrella':
      return <Umbrella className={className} />;
    case 'ThermometerSun':
      return <ThermometerSun className={className} />;
    case 'Snowflake':
      return <Snowflake className={className} />;
    case 'Wind':
      return <Wind className={className} />;
    case 'Sun':
      return <Sun className={className} />;
    case 'Shirt':
      return <Shirt className={className} />;
    case 'Car':
      return <Car className={className} />;
    case 'Compass':
      return <Compass className={className} />;
    case 'Smile':
      return <Smile className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ data }) => {
  const recommendations = generateRecommendations(data);

  if (recommendations.length === 0) return null;

  return (
    <div
      id="weather-intelligence-card"
      className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-6 text-white overflow-hidden relative shadow-lg border border-slate-800 transition-all"
    >
      {/* Decorative ambient glow */}
      <div className="absolute -right-4 -top-4 w-28 h-28 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-blue-400" />
        SMART INSIGHTS & ADVISORIES
      </h3>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          let iconBg = 'bg-slate-800 text-blue-400';
          if (rec.type === 'alert') {
            iconBg = 'bg-red-500/20 text-red-400';
          } else if (rec.type === 'warning') {
            iconBg = 'bg-amber-500/20 text-amber-400';
          } else if (rec.type === 'success') {
            iconBg = 'bg-emerald-500/20 text-emerald-400';
          }

          return (
            <div key={rec.id} className="flex items-start gap-4">
              <div className={`flex-none w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
                <RecommendationIcon name={rec.iconName} className="w-5 h-5" />
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-0.5 font-bold uppercase tracking-wider">
                  {rec.category} • {rec.title}
                </p>
                <p className="text-sm text-slate-200 leading-snug">
                  {rec.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
