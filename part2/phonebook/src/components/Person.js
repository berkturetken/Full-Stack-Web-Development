// Rendering a single person's details component

const Person = ({ person, deletePerson }) => {
  return (
    <dt key={person.number}>
      {person.name} {person.number}{" "}
      <button onClick={() => deletePerson(person.id)}>delete</button>
    </dt>
  );
};

export default Person;
