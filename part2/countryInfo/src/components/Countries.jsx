const Countries = ({ countries }) => {
    //console.log(countries);
    if (!countries) {
        return null
    }
    else if (countries.length > 10) {
        return (
            <p>Too many matches, please specify more!</p>
        )
    }
    return (
        //generate unique ids
        <ul>
            {countries.map(country => <li key={country.length}>{country}</li>)}
        </ul>
    )
}

export default Countries

