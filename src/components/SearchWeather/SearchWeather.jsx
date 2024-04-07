import React, { useState/* , useEffect */ } from "react";
import { weatherApiResponse } from "../../utils/weatherApiResponse";

function SearchWeather() {
  
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState([]);

  const apiKey = "f36464ed89d663794630263c14054ea2";
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=ua&APPID=${apiKey}`;
  
  const handleSubmitForm = (event) => {
    event.preventDefault();
    weatherApiResponse(apiUrl, setWeatherData);
    setCityName('');
  }

  const handleInputChange = (event) => {
    setCityName(event.target.value);
  };


 /*  useEffect(() => {
    const interval = setInterval(() => {
        weatherApiResponse(apiUrl, setWeatherData);
    }, 500);

    return () => { clearInterval(interval) }
  }, [apiUrl]); */


  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <input
          type="text"
          value={cityName}
          onChange={handleInputChange}
          placeholder="Введіть місто"
        ></input>
      </form>

      <div>
        {weatherData && weatherData.name && (
          <>
            <p>Місто: {weatherData.name}</p>
            <p>Температура: {weatherData.main.temp}°C</p>
            <p>Опис: {weatherData.weather[0].description}</p>
            <p>Вологість: {weatherData.main.humidity}%</p>
            <p>Тиск: {weatherData.main.pressure}hPa</p>
            <p>Швидкість вітру: {weatherData.wind.speed} м/с</p>
            <p>Напрям вітру: {weatherData.wind.deg} градусів</p>
          </>
        )}
      </div>
    </div>
  );
}

export default SearchWeather;