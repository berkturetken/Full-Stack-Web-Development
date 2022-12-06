// Rendering a single person's details component

const Person = ({ name, number }) => {
  return (
    <dt key={number}>
      {name} {number}
    </dt>
  );
};

export default Person;
