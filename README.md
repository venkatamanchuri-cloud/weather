# Weather Intelligence App

## Project Overview

**Weather Intelligence** is a modern, high-performance web application built with React, TypeScript, Vite, and Tailwind CSS. It provides accurate, real-time weather analytics, 7-day forecasts, hourly trends, interactive charts, and automated safety recommendations for any location worldwide using the free **Open-Meteo APIs** (Geocoding API + Weather Forecast API). No API keys required.

---

## Features

1. **Search Weather**
   - Search for any city worldwide with debounced autocomplete suggestions.
   - GPS Geolocation support to detect current user location.
   - Input validation and friendly error handling for missing or invalid locations.

2. **Current Weather Dashboard**
   - Displays city name, state, country, and precise local time.
   - Current temperature with °C / °F unit toggle.
   - Weather condition label and dynamic weather icons.
   - Detailed metrics: Wind Speed, Wind Direction, Humidity, Pressure, Visibility, Sunrise, and Sunset.

3. **Smart Weather Intelligence**
   - Automated recommendations based on live weather conditions:
     - **Rain Alert**: Recommends carrying an umbrella if rain probability exceeds 60%.
     - **Extreme Heat Alert**: Hydration and shade warnings for temperatures above 35°C.
     - **Cold Advisory**: Layering and thermal clothing tips for temperatures below 15°C.
     - **Wind Warning**: Outdoor activity safety alerts for wind speeds above 40 km/h.
     - **Travel & Fitness**: Driving visibility and jogging condition advisories.

4. **24-Hour Hourly Forecast**
   - Scrollable hourly timeline showing time, temperature, weather condition, rain chance, and wind speed.

5. **7-Day Weather Forecast**
   - Multi-day outlook displaying daily maximum/minimum temperatures, weather icon, precipitation probability, and wind speeds.

6. **Interactive Charts (Recharts)**
   - Visual trend graphs with tabs for:
     - **Temperature Trend**: Hourly temp and "Feels Like" comparison.
     - **Rain Chance**: Hourly precipitation probability bars.
     - **Wind Speed**: Hourly wind velocity trend area graph.
     - **Max / Min Temp**: 7-Day comparative high vs low bar chart.

7. **User Experience & Local Storage**
   - Light and Dark mode toggle with persistent state in local storage.
   - Favorite cities list stored locally for quick 1-click weather updates.
   - Recent searches history tracking last 5 queried locations.
   - Fully responsive design for mobile, tablet, and desktop screens.

---

## Technologies Used

- **Framework**: React 19, TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Weather API**: Open-Meteo (Geocoding API + Forecast API)

---

## Folder Structure

```
src/
├── components/
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   ├── WeatherCard.tsx
│   ├── ForecastCard.tsx
│   ├── HourlyForecast.tsx
│   ├── WeatherChart.tsx
│   ├── RecommendationCard.tsx
│   ├── ThemeToggle.tsx
│   ├── FavoriteCities.tsx
│   └── Footer.tsx
├── hooks/
│   ├── useWeather.ts
│   └── useTheme.ts
├── services/
│   └── weatherApi.ts
├── types/
│   └── weather.ts
├── utils/
│   ├── formatters.ts
│   ├── recommendations.ts
│   └── wmoCodes.ts
├── App.tsx
├── index.css
└── main.tsx
```

---

## Installation

```bash
npm install
```

---

## Run Locally

```bash
npm run dev
```

The app will start on `http://localhost:3000`.

---

## Production Build

```bash
npm run build
```

This compiles optimized production static files into the `dist/` directory.

---

## Deployment

### Deploy on Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Workers & Pages**.
2. Click **Create Application** > **Pages** > **Connect to Git**.
3. Select your repository and set the build settings:

- **Framework Preset**: Vite / None
- **Build Command**: `npm run build`
- **Build Output Directory**: `dist`

4. Click **Save and Deploy**.

---

## API Used

- **Open-Meteo Geocoding API**: `https://geocoding-api.open-meteo.com/v1/search`
- **Open-Meteo Weather Forecast API**: `https://api.open-meteo.com/v1/forecast`

*Note: Open-Meteo is completely free for non-commercial and open-source use and does not require an API key.*

---

## Screenshots Placeholder

```
+-----------------------------------------------------------+
| [CloudSun] Weather Intelligence    [ °C | °F ]   [ Theme ]|
+-----------------------------------------------------------+
| [ Search city (e.g. Tokyo)... ] [GPS] [ Search ]          |
| Favorites: ★ Tokyo, ★ Paris, ★ New York                   |
+-----------------------------------------------------------+
|                                                           |
|  Tokyo, Japan                                10:30 AM     |
|  [Sun] 24°C  Feels like 25°C                              |
|  Clear Sky • Sunny and clear conditions                   |
|                                                           |
|  Wind: 14 km/h  Humidity: 55%  Pressure: 1013 hPa        |
|  Visibility: 10 km  Sunrise: 06:12 AM  Sunset: 06:45 PM    |
+-----------------------------------------------------------+
| Weather Intelligence Advisory                             |
|  [Smile] Optimal Outdoor Temperature                     |
|  [Compass] Ideal Travel & Jogging Conditions              |
+-----------------------------------------------------------+
| 24-Hour Forecast & Interactive Charts                     |
+-----------------------------------------------------------+
```

---

## Future Enhancements

- Air Quality Index (AQI) detailed breakdown.
- Weather map overlay using Leaflet / OpenStreetMap.
- Weather alerts notification push system.
- Export weather summary as PDF/Image.

---

## Troubleshooting

- **City Not Found**: Check spelling or try including the country name (e.g., "Paris, France").
- **Geolocation Error**: Ensure location permissions are allowed in your browser settings.
- **Network Issues**: Check internet connection; Open-Meteo endpoints require active network access.

---

## Author

Developed with care using React, TypeScript, Vite, and Open-Meteo.
