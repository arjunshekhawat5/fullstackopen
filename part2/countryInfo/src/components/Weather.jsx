const Weather = ({data}) => {
    if(!data){
        console.log('Getting weather data...');
        return
    }
    console.log('Rendering weather data...',data);
    return (
        <div className="weather">
            <p>Weather: {data.main.temp} Celcius </p>
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt='Weather icon' />
            <p>Wind Speed: {data.wind.speed}</p>
        </div>
    )
}

export default Weather