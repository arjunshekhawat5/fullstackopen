
const Country = ({country, clickHandler }) => {
    console.log('clickHandler type...', typeof(clickHandler));
    return (
        <li key={country.area}>
            {country.name.common}
            <button onClick={() => clickHandler(country)}>Show Info</button>
        </li>
    )
}

export default Country