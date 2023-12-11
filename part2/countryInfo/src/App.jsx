import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import countryServices from './services/countries'
import Countries from './components/Countries'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    console.log('in effect');
    countryServices.getAll()
                    .then(countries => {
                      const allCountries = countries.map(country => country.name.common)
                      //console.log(allCountries);
                      setCountries(allCountries)
                    })
  }, [])

  const formHandler = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value.trim())
  }

const filteredCountries = filter.length !== 0 && countries?
                          countries.filter(country => country.includes(filter))
                          :null
//console.log(filteredCountries);
console.log('Filter right now',countries.sort());

  return (
    <div>
      <Filter formHandler={formHandler} country={filter} />
      <ul>
        <Countries countries={filteredCountries} />
      </ul>
    </div>
  )
}

export default App
