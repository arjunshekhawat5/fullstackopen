import Country from "./Country"

const Countries = ({ countries, clickHandler }) => {
    //console.log(countries);
    return (
        <ul>
            {countries.map(country => <Country key={country.area} country={country} clickHandler={clickHandler} />)}
        </ul>
    )
}

export default Countries

