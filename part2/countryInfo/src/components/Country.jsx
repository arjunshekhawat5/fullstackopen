
const Country = ({ country, clickHandler }) => {
    //console.log('country id..',country.area);
    return (
        <li key={country.area}>
            {country.name.common}
            <button onClick={() => clickHandler(country)}>Show Info</button>
        </li>
    )
}

export default Country