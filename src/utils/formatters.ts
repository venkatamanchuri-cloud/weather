/**
 * Weather Intelligence Formatting Helpers
 */

import { TemperatureUnit } from '../types/weather';

export function convertTemperature(celsius: number, unit: TemperatureUnit): number {
  if (unit === 'fahrenheit') {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
}

export function formatTemp(celsius: number, unit: TemperatureUnit): string {
  const value = convertTemperature(celsius, unit);
  return `${value}°${unit === 'fahrenheit' ? 'F' : 'C'}`;
}

export function formatWindSpeed(speedKmH: number, unit: TemperatureUnit): string {
  if (unit === 'fahrenheit') {
    const mph = Math.round(speedKmH * 0.621371);
    return `${mph} mph`;
  }
  return `${Math.round(speedKmH)} km/h`;
}

export function getWindDirectionLabel(degree: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degree / 45) % 8;
  return directions[index];
}

export function formatTime(isoString: string, timezone?: string): string {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      ...(timezone ? { timeZone: timezone } : {}),
    });
  } catch {
    return isoString;
  }
}

export function formatDate(dateString: string): { formatted: string; dayName: string; shortDate: string } {
  try {
    const date = new Date(dateString + 'T00:00:00');
    if (isNaN(date.getTime())) {
      return { formatted: dateString, dayName: 'Today', shortDate: dateString };
    }

    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const isTomorrow = date.toDateString() === tomorrow.toDateString();

    const dayName = isToday
      ? 'Today'
      : isTomorrow
      ? 'Tomorrow'
      : date.toLocaleDateString([], { weekday: 'short' });

    const formatted = date.toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    const shortDate = `${date.getMonth() + 1}/${date.getDate()}`;

    return { formatted, dayName, shortDate };
  } catch {
    return { formatted: dateString, dayName: 'Day', shortDate: dateString };
  }
}

export function formatVisibility(meters: number): string {
  if (!meters && meters !== 0) return 'N/A';
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`;
  }
  return `${Math.round(meters)} m`;
}
