import { useState, useEffect } from 'react'
import CountryFilter from './components/CountryFilter'
import countryServices from './services/countries'
import Countries from './components/Countries'
import InfoCard from './components/InfoCard'

const App = () => {
  const [filter, setFilter] = useState('')
  const [country, setCountry] = useState(null)
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    console.log('in effect');
    countryServices.getAll()
      .then(countriesData => {
        //const allCountries = countries.map(country => country.name.common)
        //console.log(allCountries);
        setCountries(countriesData)
      })
  }, [])

  const formHandler = (event) => {
    //console.log(event.target.value);
    setFilter(event.target.value.trim())
    setCountry(null)
  }

  const clickHandler = (c) => setCountry(c)

  const filteredCountries = filter.length !== 0 && countries
    ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : null;
  
  const countryContent = () => {
    if(!filteredCountries){
      return null
    }
    else if(filteredCountries.length == 1){
      return <InfoCard country={filteredCountries[0]} />
    }
    else if(filteredCountries.length > 10){
      return <p>Too many matches, please specify more!</p>
    }
    else{
      return <Countries countries={filteredCountries} clickHandler={clickHandler} />
    }

  }
  //console.log(filteredCountries);
  
  //console.log('Filter right now',countries.sort());

  return (
    <div>
       <CountryFilter formHandler={formHandler} country={filter} />
      {country? <InfoCard country={country} /> :''}
      {countryContent()}      
    </div>
  )
}

export default App
