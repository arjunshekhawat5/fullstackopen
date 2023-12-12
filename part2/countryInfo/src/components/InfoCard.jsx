const InfoCard = ({country}) => {
    //console.log('country in info card is ', country)
    //console.log('languages..', country.languages);
    return (
        <div>
            <div className="info">
                <h1>{country.name.common}</h1>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area}</p>
                <h3>Languages</h3>
                <ul>
                    {Object.entries(country.languages).map(([key, language]) => <li key={key}>{language}</li>)}
                </ul>
                <img src={country.flags.png} alt={country.flags.alt} />
            </div>
        </div>
    )

}

export default InfoCard
