import { useEffect, useState } from 'react'

// Portland, OR 97209
const LAT = 45.5231
const LON = -122.6765

const API_URL =
  `https://api.open-meteo.com/v1/forecast` +
  `?latitude=${LAT}&longitude=${LON}` +
  `&current=temperature_2m,apparent_temperature,precipitation_probability,weather_code` +
  `&temperature_unit=fahrenheit` +
  `&timezone=America%2FLos_Angeles`;

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
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => setWeather(data.current))
      .catch((err) => setError(err.message))
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
