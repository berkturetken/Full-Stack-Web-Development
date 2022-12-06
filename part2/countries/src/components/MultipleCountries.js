// Multiple Countries component

const MultipleCountries = ({ countriesToShow }) => {
  return (
    <dl>
      {countriesToShow.map((country) => (
        <dt key={country.name.official}>{country.name.common}</dt>
      ))}
    </dl>
  );
};

export default MultipleCountries;
