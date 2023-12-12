import { useEffect, useState } from 'react'
import './index.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState('')
  let msg;
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

  const notify = (notification) => {
    console.log("notifying...", notification)
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addPerson = (newNameObject) => {
    personService.create(newNameObject)
      .then(newObject => {
        console.log('Adding new name', newObject);
        notify(`Successfulu added ${newObject.name} to phonebook!`)
        setPersons(persons.concat(newObject))
      })
  }

  const updatePerson = (person, newNumber) => {
    const updatedPerson = { ...person, number: newNumber }

    personService.update(person.id, updatedPerson)
      .then(newObject => {
        const newPersons = persons.map(p => p.id === newObject.id ? newObject : p)
        setPersons(newPersons)
        msg = `Successfully updated number for ${person.name}!`

        console.log(msg);
        notify(msg);
      })
      .catch(error => {
        //alert(`Could not update number for ${person.name} error ${error}`)
        notify(`Could not update number for ${person.name}, error ${error}`)
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
        msg = `Number update declined for ${newName}!`
        console.log(msg);
        notify(msg);
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
          msg = `Deleted ${person.name} with id - ${person.id}`

          console.log(msg);
          notify(msg)
        })
        .catch(error => {
          //console.error(`could not remove person with id ${person.id}, promise rejected ${error}`)
          // alert(`Could not remove person ${person.name}. Please try again!`)
          msg = `Could not remove person ${person.name}. Please try again!`

          console.log(msg);
          notify(msg)
        })
    }
    else {
      msg = `Did not remove ${person.name} as confirmation declined!`;
      console.log(msg);
      notify(msg);
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
      < Notification notification={notification} />

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