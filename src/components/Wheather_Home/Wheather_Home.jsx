
import { useEffect, useState } from 'react';
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

    useEffect(() => {



    })

    async function handleWeather() {
        const url = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${SearchWord}&appid=4292b6b69f6d2c6c9eb355cb3d374f03&&units=metric`)
        setDescription(url.data.weather[0].description)
        setIconSymbol(`https://openweathermap.org/img/wn/${url.data.weather[0].icon}@2x.png`)
        setTemperature(url.data.main.temp)
        setCity(url.data.name)
        setWindSpeed(url.data.wind.speed)
        setDegrees(url.data.main.humidity)
        if (Number(url.data.main.pressure) > 1014) {
            setPressure(url.data.main.pressure + ' hpa')
        }
        else {
            setPressure(url.data.main.pressure + ' lpa')
        }

    }



    return (
        <div className="wheather">
            <div className="form-group">
                <input input='type' placeholder='type city, town' onChange={(e) => setSearchWord(e.target.value)} />
                <button onClick={handleWeather}>Search</button>
            </div>
            <br/>
            <div className="wheather-body">
                <div className="upper-Wheather" >
                    <div className="upper-Wheather-details">
                        <div className="upper-left">
                            <h2 className="city">{City}</h2>
                            <h2>+{Temperature}°C</h2>
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
                                    <td>18:00</td>
                                    <td>21:00</td>
                                </tr>
                                <tr>
                                    <td>{Pressure}</td>
                                    <td><img src={IconSymbol} alt={IconSymbol} /></td>
                                    <td>symbol</td>
                                    <td>symbol</td>
                                </tr>
                                <tr>
                                    <td>{Degrees} %</td>
                                    <td>+{Temperature}°C</td>
                                    <td>+67°C</td>
                                    <td>+73°C</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>

                <div className="bottom-Wheather">
                    <div className="bottom-left">
                        <label className="date">June</label>
                        <label className="date-time">Today</label>
                    </div>
                    <div className="bottom-right">
                        <label className="symbol">symbol</label>
                        <label className="celcius">+63°C</label>
                        <label className="celcius-maybe">+63°C</label>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Wheather_Home;