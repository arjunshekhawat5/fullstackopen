import Name from './Name'

const Filter = ({ persons, filter, handleFilterChange }) => {
    return (
        <div>
            <form>
                <div>
                    filter with <input
                        value={filter}
                        onChange={handleFilterChange}
                    />
                </div>
            </form>
            <ul>
                {filter.length === 0 ? ' ' : persons.filter(person => person.name
                    .toLowerCase()
                    .startsWith(filter.toLowerCase()))
                    .map(person =>
                        <Name key={person.name} name={person.name} number={person.number} />
                    )}
            </ul>
        </div>
    )
}

export default Filter