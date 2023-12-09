import Name from "./Name"

const Persons = ({ persons, remove }) => {
    return (
        <div>
            <ul>
                {persons.map(person => <Name
                    key={person.id}
                    name={person.name}
                    number={person.number}
                    remove={() => remove(person)}
                />
                )
                }
            </ul>
        </div>
    )
}

export default Persons