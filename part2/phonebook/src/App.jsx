import { useState } from 'react'
import Name from './components/Name'


const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
    }

    if(persons.some((name) => JSON.stringify(name) === JSON.stringify(nameObject))){
      alert( `${newName} is already in phonebook`)
    }
    else {
      setPersons(persons.concat(nameObject))
    }

    setNewName('')
    console.log('button clicked', event.target, persons)

  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }


  return (
    <div onSubmit= {addName} >
      <h2>Phonebook</h2>
      <form>
        <div>
          Name: <input value={newName}
                        onChange={handleNameChange}
                />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
            <Name key = {person.name} name = {person.name} />
          )}
      </ul>
    </div>
  )
}

export default App