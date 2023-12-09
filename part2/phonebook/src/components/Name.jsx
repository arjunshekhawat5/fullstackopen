const Name = ({ id, name, number, remove }) => {
    return (
        <li key={id}>
            {name} {number}
            <button onClick={remove}>Delete</button>
        </li>
    )
}
export default Name