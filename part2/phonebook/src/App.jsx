import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('in effect');

    personService
      .getAll()
      .then(persons => {
        //console.log(persons)
        setPersons(persons)
      })
      .catch(error => {
        alert(
          `promise rejected ${error}`
        )
      })
  }, [])

  const addPerson = (newNameObject) => {
    personService.create(newNameObject)
      .then(newObject => {
        console.log('Adding new name', newObject);
        setPersons(persons.concat(newObject))
      })
  }

  const updatePerson = (person, newNumber) => {
    const updatedPerson = { ...person, number: newNumber }

    personService.update(person.id, updatedPerson)
      .then(newObject => {
        const newPersons = persons.map(p => p.id === newObject.id ? newObject : p)
        setPersons(newPersons)
        console.log(`Update number for ${person.name}`)
      })
      .catch(error => {
        alert(`Could not update number for ${person.name} error ${error}`)
      })
  }

  const addName = (event) => {
    event.preventDefault()

    const currentPerson = persons.find(person => person.name === newName)

    if (currentPerson) {
      if (window.confirm(`Do you want to replace the number for ${newName}? `)) {
        updatePerson(currentPerson, newNumber)
      }
      else {
        console.log(`Did not update number for ${newName} after confirmation declined!`)
      }
    }
    else {
      const maxId = Math.max(...persons.map(p => p.id), 0)
      const nameObject = {
        name: newName,
        number: newNumber,
        id: maxId + 1
      }
      addPerson(nameObject)
    }
    setNewName('')
    setNewNumber('')
  }

  const remove = (person) => {
    if (window.confirm(`Do you want to delete ${person.name} from phonebook?`)) {
      personService
        .remove(person.id)
        .then(response => {
          const newPersons = persons.filter(p => p.id !== person.id)
          setPersons(newPersons)
          console.log(`Deleted ${person.name} with id - ${person.id}`, response)
        })
        .catch(error => {
          console.error(`could not remove person with id ${person.id}, promise rejected ${error}`)
          alert(`Could not remove person ${person.name}. Please try again!`)
        })
    }
    else {
      console.log(`Did not remove ${person.name} with id ${person.id} because confirmation declined!`);
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase().trim())
  }

  const filteredPersons = filter.length === 0
    ? persons
    : persons.filter(person => person.name
      .toLowerCase()
      .startsWith(filter)
    )
  //console.log(persons, filteredPersons)

  return (
    <div onSubmit={addName} >
      <h2>Phonebook</h2>
      <Filter persons={persons}
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

      <Persons persons={filteredPersons} remove={remove} />

    </div>
  )
}

export default App