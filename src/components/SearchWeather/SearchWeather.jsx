import "./style.css";

import React, { useState, useEffect, useRef } from "react";
import { weatherApiResponse } from "../../utils/weatherApiResponse";
import { getWindDirection } from "../../utils/getWindDirection";

import { API_KEY } from "../../utils/constants";

function SearchWeather() {
  const [cityName, setCityName] = useState("Київ");
  const [weatherData, setWeatherData] = useState(null);
  const prevCityNameRef = useRef(cityName);

  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=ua&APPID=${API_KEY}`;

  const handleSubmitForm = (event) => {
    event.preventDefault();
    weatherApiResponse(apiUrl, setWeatherData);
    setCityName('');
  };

  const handleInputChange = (event) => {
    setCityName(event.target.value);
  };

  const handleCityButtonClick = (city) => {
    setCityName(city);
  }

  useEffect(() => {
    if (prevCityNameRef.current !== cityName) {
      weatherApiResponse(apiUrl, setWeatherData);
      prevCityNameRef.current = cityName;
    }
  }, [cityName, apiUrl]);

  useEffect(() => {
    weatherApiResponse(apiUrl, setWeatherData);
  }, [apiUrl]);

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <input
          type="text"
          onChange={handleInputChange}
          value={cityName}
          placeholder="Введіть місто"
        ></input>
      </form>
      <div className="btns-wrapper">
        <button onClick={() => handleCityButtonClick("Дніпро")}>Дніпро</button>
        <button onClick={() => handleCityButtonClick("Харків")}>Харків</button>
        <button onClick={() => handleCityButtonClick("Львів")}>Львів</button>
        <button onClick={() => handleCityButtonClick("Одеса")}>Одеса</button>
        <button onClick={() => handleCityButtonClick("Запоріжжя")}>
          Запоріжжя
        </button>
      </div>

      {weatherData ? (
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
              <div className="weather-wrapper__mainInfo__icon">
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                  alt=""
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
      ) : (
        <div className="loader"></div>
      )}
    </>
  );
}

export default SearchWeather;
