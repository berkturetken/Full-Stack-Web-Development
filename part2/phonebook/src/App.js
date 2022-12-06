import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/person";
import Success from "./components/Success";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredName, setFilteredName] = useState("");
  const [successMesssage, setSuccessMesssage] = useState(null);

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleFilteredNameChange = (event) => {
    setFilteredName(event.target.value);
  };

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addNewPerson = (event) => {
    event.preventDefault();

    const isUserExist = persons.some((person) => {
      if (person.name === newName) {
        return true;
      }
      return false;
    });

    if (isUserExist) {
      const person = persons.find((p) => p.name === newName);
      const changedPerson = { ...person, number: newNumber };

      const isChangeConfirmed = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (isChangeConfirmed) {
        personService
          .updatePhoneNumber(person.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.name === newName ? returnedPerson : p))
            );

            setSuccessMesssage(`Updated ${newName}'s phone number`);
            // Let success message lasts for 3 seconds
            setTimeout(() => {
              setSuccessMesssage(null);
            }, 3000);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));

        setSuccessMesssage(`Added ${newName}`);
        // Let success message lasts for 3 seconds
        setTimeout(() => {
          setSuccessMesssage(null);
        }, 3000);
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const personsToShow =
    filteredName !== ""
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(filteredName.toLowerCase())
        )
      : persons;

  const deletePerson = (personId) => {
    const personName = persons.find((person) => person.id === personId).name;
    const isDeleteConfirmed = window.confirm(`Delete ${personName} ?`);
    if (isDeleteConfirmed) {
      personService.deletePerson(personId).then(() => {
        setPersons(persons.filter((person) => person.id !== personId));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Success message={successMesssage} />

      <Filter
        filteredName={filteredName}
        handleFilteredNameChange={handleFilteredNameChange}
      />

      <h2>Add a new</h2>

      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
