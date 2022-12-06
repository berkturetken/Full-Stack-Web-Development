import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
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
      setPersons(persons.concat(newPerson));
    }
    setNewName("");
    setNewNumber("");
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
      <div>
        filter shown with{" "}
        <input value={filteredName} onChange={handleFilteredNameChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <dl>
        {personsToShow.map((person) => (
          <dt key={person.number}>
            {person.name} {person.number}
          </dt>
        ))}
      </dl>
    </div>
  );
};

export default App;
