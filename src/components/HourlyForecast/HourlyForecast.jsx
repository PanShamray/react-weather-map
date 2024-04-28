import "./style.scss";

//react && components
import React, { useState, useEffect } from "react";

//utils
import { weatherApiResponse } from "../../utils/weatherApiResponse";
import { API_KEY, formatHour } from "../../utils/constants";

function HourlyForecast({ cityName }) {
  const [hourlyForecast, setHourlyForecast] = useState(null);

  useEffect(() => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&lang=ua&appid=${API_KEY}`;
    weatherApiResponse(apiUrl, setHourlyForecast, true, 1, 6);
  }, [cityName]);

    return (
      <>
        {hourlyForecast ? (
          <div className="hourly-forecast">
            {hourlyForecast.map((forecast, index) => (
              <div key={index} className="hourly-forecast-item">
                <div>{formatHour(forecast.dt_txt)}</div>
                <img
                  src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                  alt=""
                />
                <div>{Math.round(forecast.main.temp)}°</div>
              </div>
            ))}
          </div>
          // TODO: Create next component with daily forecast
        ) : (
          <div className="loader"></div>
        )}
      </>
    );
}

export default HourlyForecast;