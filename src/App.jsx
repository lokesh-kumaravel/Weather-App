import './App.css'
import { useEffect, useState } from 'react'
/*images*/
import searchIcon from "./assets/search.png";
import cloudIcon from "./assets/cloud.png";
import rainIcon from "./assets/rain.png";
import drizzleIcon from "./assets/drizzle.png";
import snowIcon from "./assets/snow.png";
import sunIcon from "./assets/sun.png";
import humidityIcon from "./assets/humidity.png";
import windIcon from "./assets/wind.png";


const WeatherDetails = ({icon,temp,city,country,lat,log,humidity,wind})=>
{
 return(
  <>
  <div className='image'>
    <img src={icon} alt=''/>
  </div>
  <div className='temp'>{temp}'C</div>
  <div className='location'>{city}</div>
  <div className='country'>{country}</div>
  <div className='cord'>
    <div>
      <span className='lat'>latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className='log'>longitude</span>
      <span>{log}</span>
    </div>
  </div>
  <div className='data-container'>
  <div className='element'>
  <img src={humidityIcon}alt='humidity' className='icon' width={60} height={60}/>
  <div className="data">
    <div className="humidity-percent">%</div>
    <div className="text">{humidity}</div>
  </div>
  </div>
  <div className='element'>
  <img src={windIcon}alt='humidity' className='icon' width={60} height={60}/>
  <div className="data">
    <div className="wind-percent">{wind} km/h</div>
    <div className="text">Wind Speed</div>
  </div>
  </div>
  </div>
  </>
 );
}

const App=()=> {
  let api_key="7fb4d816f7f6f4d3478e3b4aecc8811b";

  const [icon,setIcon]=useState(snowIcon)
  const [temp,setTemp]=useState(0)
  const [city,setCity]=useState("chennai")
  const [country,setCountry]=useState("India")
  const [lat,setLat]=useState(0)
  const [log,setLog]=useState(0)
  const [humidity,setHumidity]=useState(0)
  const [wind,setWind]=useState(0)
  const [text,settext]=useState("Chennai");
  const [citynotfound,setcitynotfound]=useState(false);
  const [loading,setloading]=useState(false);

const weathericonmap ={
"01d": sunIcon,
"01n": sunIcon,  
"02d": cloudIcon,
"02n": cloudIcon,
"03d": cloudIcon,
"03n": cloudIcon,
"04d": cloudIcon,
"04n": cloudIcon,
"09d": drizzleIcon,
"09n": drizzleIcon,
"10d": rainIcon,
"10n": rainIcon,
"13d": snowIcon,
"13n": snowIcon,
"10n": snowIcon
}

  const search=async ()=>
  {
    setloading(true);
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    try{
      let res = await fetch(url);
      let data = await res.json();
      if(data.code === "404" )
      {
        console.error("city not found");
        setcitynotfound(true);
        setloading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weathericoncode = data.weather[0].icon;
      setIcon(weathericonmap[weathericoncode] );
      setcitynotfound(false);
    }catch(error){
      console.error("An error occurred:",error.message);
     alert("City not Found"); 
    }
    finally{
      setloading(false);
    }
  }
  const handlecity=(e)=>{
    settext(e.target.value);
  }
  const handlekeydown=(e)=>{
    if(e.key ==="Enter")
    {
      search();
    }
  }
  useEffect(function(){
    search();
  },[]);
  return(
    <>  
    <div className='container'>
      <br></br>
      <h1>Weather App</h1>
      <div className='input-container'>
        <input type='text' className='cityInput' placeholder='Search City' onChange={handlecity} value={text} onKeyDown={handlekeydown}/>
        <div className='search-icon' onClick={()=>search()}>
          <img src={searchIcon} alt='Search' className='img' width={40} height={40}/>
        </div>
      </div>
      <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/> 
      <br></br><br></br>
      <p className="copyright">Designed by  <a href='https://www.linkedin.com/in/lokesh-k-5b7513276/' className="p">Lokesh K</a></p>
    </div>
    </>
  )
}

export default App
