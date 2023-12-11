const CountryFilter = ({formHandler, country}) => {
    return (
        <form>
            Find Countries: <input value={country} onChange={formHandler} />
        </form>
    )
}

export default CountryFilter