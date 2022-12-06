// Multiple Countries component

const MultipleCountries = ({ countriesToShow, handleCountryView }) => {
  return (
    <dl>
      {countriesToShow.map((country) => (
        <dt key={country.name.official}>
          {country.name.common}{" "}
          <button onClick={() => handleCountryView(country.name.common)}>
            show
          </button>
        </dt>
      ))}
    </dl>
  );
};

export default MultipleCountries;
