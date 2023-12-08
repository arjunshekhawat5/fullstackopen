import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState(' ')
  const baseUrl = 'http://localhost:3001/persons'

  useEffect(() => {
    console.log('in effect');
    axios
      .get(baseUrl)
      .then(response => {
        console.log('response handler', response.data);
        setPersons(response.data)
      })
  }, [])

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
      axios
        .post(`${baseUrl}`, nameObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response.data))
        })
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