import Person from "./Person";

// Rendering all people from the phonebook component

const Persons = ({ personsToShow }) => {
  return (
    <dl>
      {personsToShow.map((person) => (
        <Person key={person.number} name={person.name} number={person.number} />
      ))}
    </dl>
  );
};

export default Persons;
