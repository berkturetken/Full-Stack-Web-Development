// Single Country component
import { useEffect, useState } from "react";
import axios from "axios";

const SingleCountry = ({ countryToShow }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const country = countryToShow[0];
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    const url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${country.capital[0]}&aqi=no`;
    axios.get(url).then((response) => setWeatherInfo(response.data));
  }, [api_key, country.capital]);

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3>langauges:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <p>{country.flag}</p>

      {/* Weather Information */}
      <h2>Weather in {country.capital[0]}</h2>
      {weatherInfo !== null ? (
        <>
          <p>temperature {weatherInfo.current.temp_c} Celcius </p>
          <img
            alt="weather_condition_icon"
            src={`https:${weatherInfo.current.condition.icon}`}
            width={100}
            height={100}
          />
          <p>wind {weatherInfo.current.wind_kph} m/s </p>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SingleCountry;
