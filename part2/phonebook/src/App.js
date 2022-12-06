import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

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
      };
      setPersons(persons.concat(newPerson));
    }
    setNewName("");
  };

  const handleNameChange = (event) => setNewName(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <dl>
        {persons.map((person) => (
          <dt key={person.name}>{person.name}</dt>
        ))}
      </dl>
    </div>
  );
};

export default App;
