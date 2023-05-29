import React, {useState} from 'react'
import './Weather.css'
import axios from 'axios'

const Weather=()=>{
    const [weath, setWeath] = useState({})
    const [value, setValue] = useState("")
    const [error, setError] = useState("") 
    
    const handleSubmit= async(e)=>{
        e.preventDefault();
        if(!value){
            setError("Please Input a country or city")
        }

        try {
            const base_url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=46aac0566dfd8efd7186753154c5a106`
            const response = await axios.get(base_url)
            setWeath(response.data)
        } catch (error) {
            console.error(error);
        }
    }    
    
    return(
        <div className='background'>
            <form action="" onSubmit={handleSubmit}>
                <input type="search" placeholder='Enter Location' value={value} onChange={(event)=> setValue(event.target.value)} />
                <button type='submit'>search</button>
            </form>
            {
                error && (
                    <p className='error'>{error}</p>
                )
            }

            <div className='description'>
                <div className='deg'>
                    <h2>City/Country:</h2>
                    {
                        weath &&(
                            
                            <h2>{weath.name}</h2>
                        )
                    }
                    {weath.main? <h1>{Math.round(weath.main.temp-273.17)} <sup>0</sup>C</h1>:null}
                </div>
        
                <div className='clear'>
                    {weath.weather? <h4>{weath.weather[0].main}</h4>:null}
                </div>    
            </div>
            <div className='lower-desc'>
                <div>
                    {weath.main ? <h4>{Math.round(weath.main.feels_like)}</h4>: null}
                    <p>Feels Like</p>
                </div>
                <div>
                    {weath.main ? <h4>{weath.main.humidity}%</h4>:null}
                    <p>Humidity</p>
                </div>
                <div>
                    {weath.wind ? <h4>{Math.round(weath.wind.speed)}</h4>:null}
                    <p>Winds</p>
                </div>
            </div>
        </div>
    )
}
export default Weather;