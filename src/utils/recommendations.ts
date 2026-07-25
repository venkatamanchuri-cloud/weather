/**
 * Weather Intelligence Recommendation Engine
 */

import { WeatherData, WeatherRecommendation } from '../types/weather';

export function generateRecommendations(data: WeatherData): WeatherRecommendation[] {
  const recommendations: WeatherRecommendation[] = [];
  const current = data.current;
  const todayForecast = data.daily[0];
  const next24hHourly = data.hourly.slice(0, 24);

  const maxRainProb = Math.max(
    current.precipitation > 0 ? 80 : 0,
    todayForecast?.precipitationProbabilityMax || 0,
    ...next24hHourly.map((h) => h.precipitationProbability || 0)
  );

  // 1. Rain / Umbrella Recommendation
  if (maxRainProb >= 60 || current.precipitation > 0.5) {
    recommendations.push({
      id: 'rain-umbrella',
      type: 'warning',
      category: 'clothing',
      title: 'Carry an Umbrella or Waterproof Coat',
      description: `High likelihood of rainfall (${maxRainProb}% chance). Keep waterproof gear handy when heading outdoors.`,
      iconName: 'Umbrella',
    });
  } else if (maxRainProb >= 30) {
    recommendations.push({
      id: 'rain-light',
      type: 'info',
      category: 'clothing',
      title: 'Slight Chance of Precipitation',
      description: `${maxRainProb}% chance of light rain expected later today. Consider bringing a light jacket.`,
      iconName: 'CloudRain',
    });
  }

  // 2. Temperature & Hydration Recommendations
  if (current.temperature >= 35 || (todayForecast && todayForecast.temperatureMax >= 35)) {
    recommendations.push({
      id: 'heat-extreme',
      type: 'alert',
      category: 'health',
      title: 'Extreme Heat & Hydration Alert',
      description: `Temperatures exceeding 35°C (${Math.round(current.temperature)}°C now). Drink plenty of water, stay indoors during peak hours, and seek shade.`,
      iconName: 'ThermometerSun',
    });
  } else if (current.temperature >= 28) {
    recommendations.push({
      id: 'heat-warm',
      type: 'info',
      category: 'clothing',
      title: 'Warm Weather Advice',
      description: 'Pleasantly warm outdoors. Wear lightweight breathable cotton clothing and stay hydrated.',
      iconName: 'Sun',
    });
  } else if (current.temperature <= 5) {
    recommendations.push({
      id: 'cold-severe',
      type: 'alert',
      category: 'clothing',
      title: 'Freezing Conditions - Heavy Winter Wear',
      description: `Freezing temperatures (${Math.round(current.temperature)}°C). Wear insulated thermal layers, gloves, and a beanie to guard against frostbite.`,
      iconName: 'Snowflake',
    });
  } else if (current.temperature < 15) {
    recommendations.push({
      id: 'cold-moderate',
      type: 'warning',
      category: 'clothing',
      title: 'Cool Weather - Wear Warm Clothes',
      description: `Chilly conditions (${Math.round(current.temperature)}°C). A jacket, warm sweater, or scarf is recommended.`,
      iconName: 'Shirt',
    });
  } else {
    recommendations.push({
      id: 'temp-comfortable',
      type: 'success',
      category: 'general',
      title: 'Optimal Outdoor Temperature',
      description: `Mild and comfortable temperature (${Math.round(current.temperature)}°C). Perfect weather for outdoor leisure and walking.`,
      iconName: 'Smile',
    });
  }

  // 3. High Winds & Outdoor Safety
  const windMax = Math.max(current.windSpeed, todayForecast?.windSpeedMax || 0);
  if (windMax >= 40) {
    recommendations.push({
      id: 'wind-high',
      type: 'alert',
      category: 'activity',
      title: 'Avoid Outdoor High-Risk Activities',
      description: `Strong wind gusts up to ${Math.round(windMax)} km/h. Secure loose outdoor objects, avoid high places, and drive cautiously.`,
      iconName: 'Wind',
    });
  } else if (windMax >= 25) {
    recommendations.push({
      id: 'wind-moderate',
      type: 'info',
      category: 'activity',
      title: 'Breezy Conditions',
      description: `Moderate winds around ${Math.round(windMax)} km/h. Good for kites and sailing, but take care on open roads.`,
      iconName: 'Wind',
    });
  }

  // 4. UV Protection
  const maxUV = todayForecast?.uvIndexMax || 0;
  if (maxUV >= 8) {
    recommendations.push({
      id: 'uv-extreme',
      type: 'warning',
      category: 'health',
      title: 'Very High UV Index',
      description: `UV Index is peak level (${maxUV.toFixed(1)}). Apply SPF 50+ sunscreen, wear UV-blocking sunglasses and a wide-brim hat.`,
      iconName: 'SunMedium',
    });
  } else if (maxUV >= 5) {
    recommendations.push({
      id: 'uv-moderate',
      type: 'info',
      category: 'health',
      title: 'Moderate UV Exposure',
      description: `Moderate UV index (${maxUV.toFixed(1)}). Sunscreen is advised if spending more than 30 minutes in direct sunlight.`,
      iconName: 'Sun',
    });
  }

  // 5. General Travel & Outdoor Fitness Advisory
  if (current.visibility && current.visibility < 1000) {
    recommendations.push({
      id: 'travel-fog',
      type: 'alert',
      category: 'travel',
      title: 'Hazardous Driving Visibility',
      description: 'Dense fog or heavy precipitation drastically reducing visibility. Use low-beam fog headlights and slow down.',
      iconName: 'Car',
    });
  } else if (maxRainProb < 20 && current.windSpeed < 20 && current.temperature >= 12 && current.temperature <= 26) {
    recommendations.push({
      id: 'travel-ideal',
      type: 'success',
      category: 'travel',
      title: 'Ideal Travel & Jogging Conditions',
      description: 'Clear conditions with pleasant breeze and comfortable humidity. Great window for road trips, cycling, and jogging.',
      iconName: 'Compass',
    });
  }

  return recommendations;
}
