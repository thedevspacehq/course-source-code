import { useState, useEffect } from 'react';

function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '84c9be408dcd22442bb2a80696659602'; // Replace with your OpenWeatherMap API key

  async function getWeatherByCoords(lat, lon) {
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );

      if (!weatherResponse.ok) {
        throw new Error('Cannot find weather');
      }

      const weather = await weatherResponse.json();
      setWeatherData(weather);
    } catch (error) {
      setError(error.message);
    }
  }

  async function getWeatherByCity(cityName) {
    setError('');
    setWeatherData(null);

    try {
      const coordinateResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`
      );

      if (!coordinateResponse.ok) {
        throw new Error('City not found');
      }

      const coordinate = await coordinateResponse.json();
      await getWeatherByCoords(coordinate[0].lat, coordinate[0].lon);
    } catch (error) {
      setError(error.message);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    getWeatherByCity(city);
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
