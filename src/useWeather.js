import { useEffect, useState } from 'react'

// Portland, OR 97209
const LAT = 45.5231
const LON = -122.6765

const API_URL =
  `https://api.open-meteo.com/v1/forecast` +
  `?latitude=${LAT}&longitude=${LON}` +
  `&current=temperature_2m,apparent_temperature,precipitation_probability,weather_code` +
  `&temperature_unit=fahrenheit` +
  `&timezone=America%2FLos_Angeles`

const useWeather = () => {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)
  const [trigger, setTrigger] = useState(0)

  const updateWeather = () => {
    setTrigger((n) => n + 1);
  };

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => setWeather(data.current))
      .catch((err) => setError(err.message))
  }, [trigger])

  return { weather, error, updateWeather }
}

export default useWeather
