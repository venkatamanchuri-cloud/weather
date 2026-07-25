/**
 * WMO Weather Interpretation Codes (WW) mapping for Open-Meteo
 * https://open-meteo.com/en/docs
 */

export interface WMOInfo {
  code: number;
  label: string;
  description: string;
  iconName: string; // Lucide icon identifier
  category: 'clear' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'thunderstorm';
  bgColor: string;
  textColor: string;
}

export function getWMOInfo(code: number, isDay = 1): WMOInfo {
  switch (code) {
    case 0:
      return {
        code: 0,
        label: 'Clear Sky',
        description: 'Sunny and clear conditions',
        iconName: isDay ? 'Sun' : 'Moon',
        category: 'clear',
        bgColor: isDay ? 'from-amber-400 to-orange-500' : 'from-slate-700 to-indigo-900',
        textColor: 'text-amber-500',
      };
    case 1:
      return {
        code: 1,
        label: 'Mainly Clear',
        description: 'Mostly sunny with few clouds',
        iconName: isDay ? 'SunDim' : 'Moon',
        category: 'clear',
        bgColor: isDay ? 'from-amber-300 to-yellow-500' : 'from-slate-700 to-blue-900',
        textColor: 'text-amber-400',
      };
    case 2:
      return {
        code: 2,
        label: 'Partly Cloudy',
        description: 'Scattered clouds in the sky',
        iconName: isDay ? 'CloudSun' : 'CloudMoon',
        category: 'cloudy',
        bgColor: 'from-sky-400 to-blue-600',
        textColor: 'text-sky-500',
      };
    case 3:
      return {
        code: 3,
        label: 'Overcast',
        description: 'Dense cloud cover',
        iconName: 'Cloud',
        category: 'cloudy',
        bgColor: 'from-slate-500 to-slate-700',
        textColor: 'text-slate-400',
      };
    case 45:
      return {
        code: 45,
        label: 'Foggy',
        description: 'Reduced visibility due to fog',
        iconName: 'CloudFog',
        category: 'fog',
        bgColor: 'from-zinc-400 to-slate-600',
        textColor: 'text-zinc-400',
      };
    case 48:
      return {
        code: 48,
        label: 'Depositing Rime Fog',
        description: 'Freezing fog depositing ice crystals',
        iconName: 'CloudFog',
        category: 'fog',
        bgColor: 'from-cyan-600 to-slate-700',
        textColor: 'text-cyan-400',
      };
    case 51:
      return {
        code: 51,
        label: 'Light Drizzle',
        description: 'Fine light drizzle',
        iconName: 'CloudDrizzle',
        category: 'drizzle',
        bgColor: 'from-teal-500 to-blue-600',
        textColor: 'text-teal-400',
      };
    case 53:
      return {
        code: 53,
        label: 'Moderate Drizzle',
        description: 'Steady light rain drizzle',
        iconName: 'CloudDrizzle',
        category: 'drizzle',
        bgColor: 'from-teal-600 to-blue-700',
        textColor: 'text-teal-500',
      };
    case 55:
      return {
        code: 55,
        label: 'Dense Drizzle',
        description: 'Heavy moisture and dense drizzle',
        iconName: 'CloudRain',
        category: 'drizzle',
        bgColor: 'from-teal-700 to-blue-800',
        textColor: 'text-teal-600',
      };
    case 56:
    case 57:
      return {
        code,
        label: 'Freezing Drizzle',
        description: 'Freezing moisture droplets',
        iconName: 'CloudSnow',
        category: 'drizzle',
        bgColor: 'from-cyan-500 to-blue-800',
        textColor: 'text-cyan-400',
      };
    case 61:
      return {
        code: 61,
        label: 'Slight Rain',
        description: 'Light rainfall showers',
        iconName: 'CloudRain',
        category: 'rain',
        bgColor: 'from-blue-500 to-indigo-600',
        textColor: 'text-blue-400',
      };
    case 63:
      return {
        code: 63,
        label: 'Moderate Rain',
        description: 'Continuous moderate rain',
        iconName: 'CloudRain',
        category: 'rain',
        bgColor: 'from-blue-600 to-indigo-800',
        textColor: 'text-blue-500',
      };
    case 65:
      return {
        code: 65,
        label: 'Heavy Rain',
        description: 'Torrential downpour and heavy rain',
        iconName: 'CloudRainWind',
        category: 'rain',
        bgColor: 'from-blue-700 to-slate-900',
        textColor: 'text-blue-600',
      };
    case 66:
    case 67:
      return {
        code,
        label: 'Freezing Rain',
        description: 'Freezing rain creating icy conditions',
        iconName: 'CloudSnow',
        category: 'rain',
        bgColor: 'from-indigo-600 to-cyan-900',
        textColor: 'text-indigo-400',
      };
    case 71:
      return {
        code: 71,
        label: 'Slight Snow Fall',
        description: 'Light fluttering snow flakes',
        iconName: 'Snowflake',
        category: 'snow',
        bgColor: 'from-sky-300 to-indigo-500',
        textColor: 'text-sky-300',
      };
    case 73:
      return {
        code: 73,
        label: 'Moderate Snow',
        description: 'Steady snowfall',
        iconName: 'Snowflake',
        category: 'snow',
        bgColor: 'from-sky-400 to-indigo-700',
        textColor: 'text-sky-400',
      };
    case 75:
      return {
        code: 75,
        label: 'Heavy Snow',
        description: 'Blizzard conditions and heavy snow',
        iconName: 'Snowflake',
        category: 'snow',
        bgColor: 'from-sky-600 to-slate-900',
        textColor: 'text-sky-200',
      };
    case 77:
      return {
        code: 77,
        label: 'Snow Grains',
        description: 'Small icy snow grains',
        iconName: 'Snowflake',
        category: 'snow',
        bgColor: 'from-slate-400 to-blue-600',
        textColor: 'text-slate-300',
      };
    case 80:
    case 81:
    case 82:
      return {
        code,
        label: 'Rain Showers',
        description: 'Passing rain showers',
        iconName: 'CloudRain',
        category: 'rain',
        bgColor: 'from-blue-500 to-cyan-700',
        textColor: 'text-blue-400',
      };
    case 85:
    case 86:
      return {
        code,
        label: 'Snow Showers',
        description: 'Passing snow flurries',
        iconName: 'Snowflake',
        category: 'snow',
        bgColor: 'from-indigo-400 to-slate-700',
        textColor: 'text-indigo-300',
      };
    case 95:
      return {
        code: 95,
        label: 'Thunderstorm',
        description: 'Thunderstorm with lightning risk',
        iconName: 'CloudLightning',
        category: 'thunderstorm',
        bgColor: 'from-purple-700 to-slate-900',
        textColor: 'text-purple-400',
      };
    case 96:
    case 99:
      return {
        code,
        label: 'Thunderstorm with Hail',
        description: 'Severe thunderstorm with heavy hail',
        iconName: 'CloudLightning',
        category: 'thunderstorm',
        bgColor: 'from-purple-900 to-black',
        textColor: 'text-purple-500',
      };
    default:
      return {
        code,
        label: 'Variable Weather',
        description: 'Unspecified weather conditions',
        iconName: 'Cloud',
        category: 'cloudy',
        bgColor: 'from-slate-600 to-slate-800',
        textColor: 'text-slate-400',
      };
  }
}
