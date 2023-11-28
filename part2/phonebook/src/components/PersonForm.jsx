const PersonForm = ({newName, newNumber, handleNameChange, handleNumberChange}) => {
    return (
      <form>
        <div>
          Name: <input value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          Number: <input value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
    )
}

export default PersonForm