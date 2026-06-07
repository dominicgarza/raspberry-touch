import { useEffect } from 'react'
import useWeather from './useWeather'

const TEN_MINUTES = 10 * 60 * 1000

// WMO Weather interpretation codes
// https://open-meteo.com/en/docs#weathervariables
const WMO_DESCRIPTIONS = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Icy fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Slight showers',
  81: 'Moderate showers',
  82: 'Violent showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm w/ hail',
  99: 'Thunderstorm w/ heavy hail',
}

const Weather = () => {
  const { weather, error, updateWeather } = useWeather()

  useEffect(() => {
    const interval = setInterval(updateWeather, TEN_MINUTES)
    return () => clearInterval(interval)
  }, [])

  if (error) return <p>Error: {error}</p>
  if (!weather) return <p>Loading weather…</p>

  const description = WMO_DESCRIPTIONS[weather.weather_code] ?? `Code ${weather.weather_code}`

  return (
    <div>
      <h2>Weather in Portland, OR 97209</h2>
      <p>Temperature: {weather.temperature_2m}°F</p>
      <p>Feels like: {weather.apparent_temperature}°F</p>
      <p>Precipitation probability: {weather.precipitation_probability}%</p>
      <p>Condition: {description}</p>
    </div>
  )
}

export { Weather }
