const CountryFilter = ({formHandler, filter}) => {
    return (
        <form>
            Find Countries: <input value={filter} onChange={formHandler} />
        </form>
    )
}

export default CountryFilter