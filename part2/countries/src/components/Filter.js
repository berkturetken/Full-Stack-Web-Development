// Filter component

const Filter = ({ filteredCountryName, handleCountryChange }) => {
  return (
    <>
      find countries{" "}
      <input value={filteredCountryName} onChange={handleCountryChange} />
    </>
  );
};

export default Filter;
