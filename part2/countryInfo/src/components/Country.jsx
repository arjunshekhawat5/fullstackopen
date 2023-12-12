
const Country = ({country, clickHandler }) => {
    console.log('country id..',country.area);
    return (
        <li key={country.area}>
            {country.name.common}
            <button key={country.area} onClick={() => clickHandler(country)}>Show Info</button>
        </li>
    )
}

export default Country