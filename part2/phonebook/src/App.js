import { useEffect, useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Success from "./components/Success";
import Error from "./components/Error";

import personService from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredName, setFilteredName] = useState("");
  const [successMesssage, setSuccessMesssage] = useState(null);
  const [errorMesssage, setErrorMesssage] = useState(null);

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleFilteredNameChange = (event) => {
    setFilteredName(event.target.value);
  };

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        setErrorMesssage(`Something went wrong while getting persons`);
        // Let error message lasts for 3 seconds
        setTimeout(() => {
          setErrorMesssage(null);
        }, 3000);
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
        // Already added the feature below which is required for exercise 3.17
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
          })
          .catch((error) => {
            setErrorMesssage(
              `Information of ${newName} has already been removed from server`
            );
            // Let error message lasts for 3 seconds
            setTimeout(() => {
              setErrorMesssage(null);
            }, 3000);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));

          setSuccessMesssage(`Added ${newName}`);
          // Let success message lasts for 3 seconds
          setTimeout(() => {
            setSuccessMesssage(null);
          }, 3000);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setErrorMesssage(error.response.data.error);
          // Let error message lasts for 3 seconds
          setTimeout(() => {
            setErrorMesssage(null);
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
      personService
        .deletePerson(personId)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== personId));
        })
        .catch((error) => {
          setErrorMesssage(`Something went wrong while deleting ${personName}`);
          // Let error message lasts for 3 seconds
          setTimeout(() => {
            setErrorMesssage(null);
          }, 3000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Success message={successMesssage} />
      <Error message={errorMesssage} />

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
