import React from 'react';
import "./current-weather.css";

function CurrentWeather({ data, forecast }) {
    // Function to convert Fahrenheit to Celsius
    const convertToFahrenheit = (temp) => {
        return Math.round((temp - 32) / 1.8000);
    };

    return (
        <div className="weather-card">
            <div className="top">
                <div className="top-right">
                    <div className="weather-heading">
                        <span className="city">{data.city}</span>
                    </div>
                    <div className="weather-details">
                        <span className="temperature">{convertToFahrenheit(data.main?.temp)}°C</span>
                        <span className="weather-description">{data.weather[0]?.description}</span>
                    </div>
                </div>
                <img className="top-left" src={require(`../../assets/icons/${data.weather[0].icon}.png`)} alt='weather-img'/>
            </div>
            <div className="bottom">
                <div className="weather-stats">
                    <div className="stats-1">
                        <span className="label">Pressure</span>
                        <span className="value">{data.main?.pressure} hPa</span>
                    </div>
                    <div className="stats-2">
                        <span className="label">Visibility</span>
                        <span className="value">{data.visibility} m</span>
                    </div>
                    <div className="stats-3">
                        <span className="label">Humidity</span>
                        <span className="value">{data.main?.humidity}%</span>
                    </div>
                </div>
            </div>
            {forecast && (
                <div className="forecast">
                    {/* Render forecast data here */}
                </div>
            )}
        </div>
    );
}

export default CurrentWeather;
