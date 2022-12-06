import Person from "./Person";

// Rendering all people from the phonebook component

const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <dl>
      {personsToShow.map((person) => (
        <Person
          key={person.number}
          person={person}
          deletePerson={deletePerson}
        />
      ))}
    </dl>
  );
};

export default Persons;
