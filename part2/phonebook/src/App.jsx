import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState(' ')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id:persons.length + 1
    }

    if (persons.some((name) => JSON.stringify(name) === JSON.stringify(nameObject))) {
      alert(`${newName} is already in phonebook`)
    }
    else {
      setPersons(persons.concat(nameObject))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    console.log(filter);
  }

  return (
    <div onSubmit={addName} >
      <h2>Phonebook</h2>
      <Filter persons ={persons}
              filter={filter}
              handleFilterChange={handleFilterChange} 
      />

      <h2>Add a new</h2>

      <PersonForm newName={newName}
                  newNumber={newNumber}
                  handleNameChange={handleNameChange}
                  handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons persons={persons}/>

    </div>
  )
}

export default App