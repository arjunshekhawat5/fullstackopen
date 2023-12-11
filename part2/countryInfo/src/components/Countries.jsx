const Countries = ({countries}) => {
    console.log(countries);
    if(!countries){
        return null
    }
    else if (countries.length > 10){
        return (
            <p>Too many matches, please specify more!</p>
        )
    }

    return (
        <li>
            {countries.map(country => country.name.common)}
        </li>
    )
}

export default Countries