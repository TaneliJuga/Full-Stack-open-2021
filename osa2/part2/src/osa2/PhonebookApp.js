import React, { useState } from 'react'

class Person{
    static counter = 0;

    constructor(name, number = ''){
        this.name = name;
        this.id = Person.counter++;
        this.number = number;
    }
}
const App = () => {
  const [ persons, setPersons] = useState([
    new Person('Arto Hellas', '040-123456'),
    new Person('Ada Lovelace', '39-44-5323523'),
    new Person('Dan Abramov', '12-43-234345'),
    new Person('Mary Poppendieck', '39-23-6423122')
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [nameFilter, setNameFilter] = useState();
  const [numberFilter, setNumberFilter] = useState();

  const getChangeHandler = (setter) => {
      return (event) => {
          setter(event.target.value);
      }
  }

  const onSubmit = (event) => {
      event.preventDefault();
      if(containsName(newName)){
        alert(`${newName} is already added to phonebook`);
        return;
      }

      setPersons([...persons, new Person(newName, newNumber)]);
      setNewName('');
      setNewNumber('');
      setNumberFilter(undefined);
      setNameFilter(undefined);
  }

  const containsName = (name) => {
      const person = persons.find(p => p.name.toLowerCase() === name.toLowerCase());
      return person !== undefined;
  }

  const matchName = (search, name) => {
    const [test1, test2] = [search, name].map(n => n.toLowerCase());
    return [search, name].map(n => n.toLowerCase())
        .reduce((s, n) => n.indexOf(s) !== -1);
  }
  const matchNumber = (search, number) => {
    const [test1, test2] = [search, number].map(n => n.toLowerCase());
      return [search, number]
        .map(n => n.replace('-', ''))
        .reduce((s, n) => n.indexOf(s) !== -1);
  }

  let personsToShow = persons;
    [
        [nameFilter, matchName, (p) => p.name], 
        [numberFilter, matchNumber, (p) => p.number]
    ]
    .forEach(([filter, predicate, mappingFunction]) => {
        if(filter){
            personsToShow = personsToShow.filter(p => predicate(filter, mappingFunction(p)));
        }
    });

  return (
    <div>
      <h2>Phonebook</h2>
      <label for={"filter-name"}>filter by name</label><br/>
    <input id={"filter-name"} value={nameFilter} 
        onChange={getChangeHandler(setNameFilter)}/><br/>
        <label for={"filter-name"}>filter by number</label><br/>
    <input id={"filter-number"} value={numberFilter} 
        onChange={getChangeHandler(setNumberFilter)}/><br/>

      <h2>Add new contact</h2>
      <form onSubmit={onSubmit}>
        <label for={"name"}>name</label><br/>
        <input id={"name"} value={newName} 
            onChange={getChangeHandler(setNewName)}/><br/>
        <label for={"number"}>number</label><br/>
        <input id={"number"} value={newNumber} 
            onChange={getChangeHandler(setNewNumber)} 
            type={"tel"} pattern={"([0-9]+[-]{1})*[0-9]+"}/><br/>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {
          personsToShow.map(p => 
            <div key={p.id}>
                {p.name}: {p.number}
            </div>)
      }
    </div>
  )

}

export default App