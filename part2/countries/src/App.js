import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Result from "./components/Result";

const App = () => {
  const [filteredCountryName, setFilteredCountryName] = useState("");
  const [countries, setCountries] = useState([]);

  const handleCountryChange = (event) => {
    setFilteredCountryName(event.target.value);
  };

  const handleCountryView = (countryName) => {
    setFilteredCountryName(countryName);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const countriesToShow =
    filteredCountryName !== ""
      ? countries.filter((country) =>
          country.name.common
            .toLowerCase()
            .includes(filteredCountryName.toLowerCase())
        )
      : [];

  return (
    <div>
      <Filter
        filteredCountryName={filteredCountryName}
        handleCountryChange={handleCountryChange}
      />
      <Result countriesToShow={countriesToShow} handleCountryView={handleCountryView} />
    </div>
  );
};

export default App;
