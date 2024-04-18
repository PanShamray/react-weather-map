import "./style.css";

import React, { useState, useEffect } from "react";
import { weatherApiResponse } from "../../utils/weatherApiResponse";
import { getWindDirection } from "../../utils/getWindDirection";

import { WEATHER_REFRESH_INTERVAL, API_KEY } from "../../utils/constants";

function SearchWeather() {
  const [cityName, setCityName] = useState("Дніпро");
  const [weatherData, setWeatherData] = useState(null);

  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=ua&APPID=${API_KEY}`;

  const handleSubmitForm = (event) => {
    event.preventDefault();
    weatherApiResponse(apiUrl, setWeatherData);
    setCityName('');
  };

  const handleInputChange = (event) => {
    setCityName(event.target.value);
  };

  useEffect(() => {
    weatherApiResponse(apiUrl, setWeatherData);

    const interval = setInterval(() => {
      weatherApiResponse(apiUrl, setWeatherData);
    }, WEATHER_REFRESH_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [cityName, apiUrl]);

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <input
          type="text"
          onChange={handleInputChange}
          placeholder="Введіть місто"
        ></input>
      </form>
      {weatherData && weatherData.name && (
        <div className="weather-wrapper">
          <div className="weather-wrapper__mainInfo">
            <div className="weather-wrapper__name-temp">
              <div className="weather-wrapper__mainInfo__name">
                {weatherData.name}
              </div>
              <div className="weather-wrapper__mainInfo__temp">
                {Math.round(weatherData.main.temp)}°
              </div>
            </div>

            <div>
              <div className="weather-wrapper__mainInfo__desc">
                {weatherData.weather[0].description}
              </div>
              <div className="weather-wrapper__mainInfo__img">
                <img
                  src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                  alt=''
                />
              </div>
            </div>
          </div>

          <div className="weather-wrapper__otherInfo">
            <div className="weather-wrapper__otherInfo__wind">
              Вітер: {weatherData.wind.speed} м/с
            </div>
            <div className="weather-wrapper__otherInfo__windDir">
              {getWindDirection(weatherData.wind.deg)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SearchWeather;
