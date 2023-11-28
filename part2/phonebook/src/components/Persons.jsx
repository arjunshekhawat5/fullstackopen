import Name from "./Name"

const Persons = ({persons}) => {
    return (
        <div>
            <ul>
                {persons.map(person => <Name
                                            key={person.id}
                                            name={person.name}
                                            number={person.number}
                                            />
                            )
                }
            </ul>
        </div>
    )
}

export default Persons