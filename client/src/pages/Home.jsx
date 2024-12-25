import React, { useState } from 'react';
import axios from 'axios';
import {
  WiStrongWind,
  WiHumidity,
  WiBarometer,
  WiThermometer,
  WiCloud,
  WiDaySunny,
} from 'react-icons/wi';
import { MdVisibility } from 'react-icons/md';

const API_KEY = '8fffcfdc776d606671775f91c7011bac';

export default function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      setWeather(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log(response);
      setWeather(response.data);
    } catch (err) {
      setError('Could not fetch weather data. Please check the city name.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-blue-100 text-white font-sans text-center">
      <h1 className="text-4xl font-bold mb-6">Weather App</h1>
      <form
        onSubmit={handleSearch}
        className="flex flex-col items-center gap-4 w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 rounded-lg text-gray-800 outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all"
        >
          Search
        </button>
      </form>
      <div className="mt-8 w-full max-w-md">
        {loading && <div className="text-center text-lg">Loading...</div>}
        {error && (
          <div className="text-center text-red-500 text-lg">{error}</div>
        )}
        {weather && (
          <div className="bg-white rounded-lg shadow-lg p-6 text-gray-800">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold">{weather.name}</h2>
              <p className="text-lg text-gray-500">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div className="flex items-center justify-center text-5xl font-bold text-blue-700 ml-9">
              {Math.round(weather.main.temp)}°C
              {weather.weather[0].main.toLowerCase().includes('cloud') ? (
                <WiCloud className="ml-3 text-blue-600" />
              ) : (
                <WiDaySunny className="ml-3 text-yellow-500" />
              )}
            </div>
            <p className="text-center text-lg text-gray-600">
              {weather.weather[0].description.charAt(0).toUpperCase() +
                weather.weather[0].description.slice(1)}
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <WiStrongWind className="text-3xl mx-auto text-blue-500" />
                <p className="font-bold">Wind</p>
                <p>{Math.round(weather.wind.speed)} km/h</p>
              </div>
              <div className="text-center">
                <WiHumidity className="text-3xl mx-auto text-blue-500" />
                <p className="font-bold">Humidity</p>
                <p>{Math.round(weather.main.humidity)}%</p>
              </div>
              <div className="text-center">
                <WiBarometer className="text-3xl mx-auto text-blue-500" />
                <p className="font-bold">Pressure</p>
                <p>{Math.round(weather.main.pressure)} mb</p>
              </div>
              <div className="text-center">
                <MdVisibility className="text-3xl mx-auto text-blue-500" />
                <p className="font-bold">Visibility</p>
                <p>{(weather.visibility / 1000).toFixed(1)} km</p>
              </div>
              <div className="text-center">
                <WiThermometer className="text-3xl mx-auto text-blue-500" />
                <p className="font-bold">Feels Like</p>
                <p>{Math.round(weather.main.feels_like)}°C</p>
              </div>
              <div className="text-center">
                <WiThermometer className="text-3xl mx-auto text-blue-500" />
                <p className="font-bold">Max Temp</p>
                <p>{Math.round(weather.main.temp_max)}°C</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
