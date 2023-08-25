
import { useState } from 'react';
import './Wheather_Home.css'
function Wheather_Home() {

    const axios = require('axios');
    const [City, setCity] = useState('')
    const [Description, setDescription] = useState('')
    const [Temperature, setTemperature] = useState('')
    const [IconSymbol, setIconSymbol] = useState('')
    const [WindSpeed, setWindSpeed] = useState('')
    const [SearchWord, setSearchWord] = useState('')
    const [Pressure, setPressure] = useState('')
    const [Degrees, setDegrees] = useState('')
 
    //upcoming Weather
    const [FirstTime, setFirstTime] = useState('')
    const [LastTime, setLastTime] = useState('')
    const [FirstIcon, setFirstIcone] = useState('')
    const [LastIcon, setLastIcon] = useState('')
    const [FirstTemp, setFirstTemp] = useState('')
    const [LastTemp, setLastTemp] = useState('')

    const [FindWeather, setFindWeather] = useState(false)


    async function handleWeather() {
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${SearchWord}&appid=4292b6b69f6d2c6c9eb355cb3d374f03&&units=metric`)
            .then((response) => {

                setDescription(response.data.weather[0].description)
                setIconSymbol(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
                if (response.data.main.temp > 0) {
                    setTemperature('+' + response.data.main.temp)
                }
                else {
                    setTemperature('-' + response.data.main.temp)
                }
                setCity(response.data.name)
                setWindSpeed(response.data.wind.speed)
                setDegrees(response.data.main.humidity)
                if (Number(response.data.main.pressure) > 1014) {
                    setPressure(response.data.main.pressure + ' hpa')
                }
                else {
                    setPressure(response.data.main.pressure + ' lpa')
                }

                // second weather forecast
                axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${SearchWord}&appid=4292b6b69f6d2c6c9eb355cb3d374f03&&units=metric`)
                    .then((secondWeatherForecast) => {
                        var dt_txt1 = new Date(secondWeatherForecast.data.list[1].dt_txt)
                        const hour1 = String(dt_txt1.getHours()).padStart(2, '0');
                        const minutes1 = String(dt_txt1.getMinutes()).padStart(2, '0');
                        setFirstTime(hour1 + ':' + minutes1)
                        setFirstIcone(`https://openweathermap.org/img/wn/${secondWeatherForecast.data.list[1].weather[0].icon}@2x.png`)
                        if (secondWeatherForecast.data.list[1].main.temp > 0) {
                            setFirstTemp('+'+ secondWeatherForecast.data.list[1].main.temp)
                        }
                        else {
                            setFirstTemp('-'+ secondWeatherForecast.data.list[1].main.temp)
                        }

                        var dt_txt2 = new Date(secondWeatherForecast.data.list[2].dt_txt)
                        const hour2 = String(dt_txt2.getHours()).padStart(2, '0');
                        const minutes2 = String(dt_txt2.getMinutes()).padStart(2, '0');
                        setLastTime(hour2 + ':' + minutes2)
                        setLastIcon(`https://openweathermap.org/img/wn/${secondWeatherForecast.data.list[2].weather[0].icon}@2x.png`)

                        if (secondWeatherForecast.data.list[2].main.temp > 0) {
                            setLastTemp('+'+ secondWeatherForecast.data.list[2].main.temp)
                        }
                        else {
                            setLastTemp('-'+ secondWeatherForecast.data.list[2].main.temp)
                        }

                        return setFindWeather(true)
                    }, ((err) => {
                        alert('something went wrong')
                        console.log(err)
                    }))
            }, ((err) => {
                if (err.code === 'ERR_BAD_REQUEST') return alert('Location ' + SearchWord + ' cannot be found')
                if (err.code === 'ERR_NETWORK') return alert('Please check your internet connection')
                alert('Please try again')
                console.log(err)
            }))
        return setFindWeather(false)
    }

    let weatherDisplay = (
        <div className="wheather-body">
            <div className="upper-Wheather" >
                <div className="upper-Wheather-details">
                    <div className="upper-left">
                        <h2 className="city">{City}</h2>
                        <h2>{Temperature}°C</h2>
                    </div>
                    <div className="upper-right">
                        <img src={IconSymbol} alt={IconSymbol} />
                        <h4>{Description}</h4>
                    </div>
                </div>

                <div className='wheather-details'>
                    <table className="table table-hover">
                        <tbody>
                            <tr >
                                <td>{WindSpeed} mph</td>
                                <td>Now</td>
                                <td>{FirstTime}</td>
                                <td>{LastTime}</td>
                            </tr>
                            <tr>
                                <td>{Pressure}</td>
                                <td><img src={IconSymbol} alt={IconSymbol} /></td>
                                <td><img src={FirstIcon} alt={FirstIcon} /></td>
                                <td><img src={LastIcon} alt={LastIcon} /></td>
                            </tr>
                            <tr>
                                <td>{Degrees} %</td>
                                <td>{Temperature}°C</td>
                                <td>{FirstTemp}°C</td>
                                <td>{LastTemp}°C</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>

        </div>
    )


    return (
        <div className="wheather">
            <div className="form-group">
                <input input='type' placeholder='type city, town' className="control-form" onChange={(e) => setSearchWord(e.target.value)} />
                <button onClick={handleWeather} className="btn btn-primary">Search</button>
            </div>
            <br />
            {FindWeather && <span>{weatherDisplay}</span>}
        </div>
    )
}

export default Wheather_Home;