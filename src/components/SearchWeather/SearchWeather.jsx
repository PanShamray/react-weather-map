import "./style.css";

import React, { useState, useEffect } from "react";
import { weatherApiResponse } from "../../utils/weatherApiResponse";
import { getWindDirection } from "../../utils/getWindDirection";

function SearchWeather() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  const apiKey = "f36464ed89d663794630263c14054ea2";
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=ua&APPID=${apiKey}`;

  const handleSubmitForm = (event) => {
    event.preventDefault();
    weatherApiResponse(apiUrl, setWeatherData);
  };

  const handleInputChange = (event) => {
    setCityName(event.target.value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      weatherApiResponse(apiUrl, setWeatherData);
    }, 180 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [cityName, apiUrl]);

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <input
          type="text"
          value={cityName}
          onChange={handleInputChange}
          placeholder="Введіть місто"
        ></input>
      </form>

      <div className="weather-wrapper" >
        {weatherData && weatherData.name && (
          <>
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
          </>
        )}
      </div>
    </>
  );
}

export default SearchWeather;
