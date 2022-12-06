// Result component
import SingleCountry from "./SingleCountry";
import MultipleCountries from "./MultipleCountries";

const Result = ({ countriesToShow, handleCountryView }) => {
  if (countriesToShow.length === 0) return <></>;
  else if (countriesToShow.length === 1)
    return <SingleCountry countryToShow={countriesToShow} />;
  else if (countriesToShow.length > 1 && countriesToShow.length < 11)
    return <MultipleCountries countriesToShow={countriesToShow} handleCountryView={handleCountryView} />;
  else return <p>Too many matches, specify another filter</p>;
};

export default Result;
