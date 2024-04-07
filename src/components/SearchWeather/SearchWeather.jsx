import React, { useState, useEffect } from "react";

function SearchWeather() {
    const [cityName, setCityName] = useState('');

    const handleSubmitForm = (e) => {
        setCityName(cityName);
        
    }

    const handleInputChange = (event) => {
      setCityName(event.target.value);
    };
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
        <p>ваше місто - {cityName}</p>
      </div>
    );
}

export default SearchWeather;