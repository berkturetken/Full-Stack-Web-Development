// Single Country component

const SingleCountry = ({ countryToShow }) => {
  const country = countryToShow[0];
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h2>langauges:</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <p>{country.flag}</p>
    </>
  );
};

export default SingleCountry;