import { useState } from "react";
import "./App.css";
import { weatherApiKey, weatherApiUrl } from "./api";
import CurrentWeather from "./components/current-weather/current-weather";
import Search from "./components/search/search";
import Forecast from "./components/forecast/forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${weatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`
    );
    console.log(currentWeatherFetch);
    const forecastWeatherFetch = fetch(
      `${weatherApiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`
    );

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecastWeather({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log(currentWeather);
  console.log(forecastWeather);

  return (
    <div className="container">
      <div className="home-title">
        <h1>WeatherrUp</h1>
      </div>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecastWeather && <Forecast forecast={forecastWeather} />}
    </div>
  );
}

export default App;
