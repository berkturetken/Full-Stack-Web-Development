import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredName, setFilteredName] = useState("");

  const addNewPerson = (event) => {
    event.preventDefault();

    const isUserExist = persons.some((person) => {
      if (person.name === newName) {
        return true;
      }
      return false;
    });

    if (isUserExist) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      axios
        .post("http://localhost:3001/persons", newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
        });
    }
  };

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handleFilteredNameChange = (event) => {
    setFilteredName(event.target.value);
  };

  const personsToShow =
    filteredName !== ""
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(filteredName.toLowerCase())
        )
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>

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

      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
