import { useState, useEffect } from 'react'
import CountryFilter from './components/CountryFilter'
import countryServices from './services/countries'
import weatherServices from './services/weather'
import Countries from './components/Countries'
import InfoCard from './components/InfoCard'
import Weather from './components/Weather'

const App = () => {
  const [filter, setFilter] = useState('')
  const [country, setCountry] = useState(null)
  const [countries, setCountries] = useState(null)
  const [capitalWeather, setCapitalWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const API_KEY = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    console.log('In initial effect');
    fetchAllCountries();
  }, [])

  useEffect(() => {
    console.log('In weather api call effect...')
    fetchWeather()
  }, [country])

  const fetchAllCountries =() => {
    setLoading(true)
    console.log('Fetching all countries data..');
    countryServices.getAll()
      .then(countriesData => {
        setCountries(countriesData)
        console.log('Fetched all contries data..', countriesData);
      })
      .catch(error => {
        console.error('Error occured during fetching all countries..', error)
      })
      .finally(setLoading(false))
  }

  const fetchWeather = () => {
    if(country){
      const {latlng} = country.capitalInfo
      const [lat, lng] = latlng

      console.log("Fetching weather for [lattitude, longitude] - ",lat, lng);

      setLoading(true)
      weatherServices.getWeather(lat, lng, API_KEY)
                    .then(data => {
                      setCapitalWeather(data)
                      console.log('Fetched weather data...', data);
                    })
                    .catch(error => {
                      console.error('Error occured during getting weather data', error)
                    })
                    .finally(setLoading(false))
    }
  }

  const formHandler = (event) => {
    setFilter(event.target.value.trim())
    setCountry(null)
    setCapitalWeather(null)
  }

  const clickHandler = (c) => {
    console.log('Button clicked, setting the country to', c);
    setCountry(c)
  }

  const filteredCountries = filter.length !== 0 && countries
    ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : null;
  
  const filteredContent = () => {
    if(loading) console.log('Loading....')
    else if(!filteredCountries || country) return null
    else if(filteredCountries.length == 1) setCountry(filteredCountries[0])
    else if(filteredCountries.length > 10) return <p>Too many matches, please specify more!</p>
    else return <Countries countries={filteredCountries} clickHandler={clickHandler} />
  }

  return (
    <div>
       <CountryFilter formHandler={formHandler} country={filter} />
      {country
              ? <div>
                  <InfoCard country={country} />
                  <Weather data={capitalWeather}  />
                </div>
              :''}
      {filteredContent()}      
    </div>
  )
}

export default App
