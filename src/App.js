import coldbg from './assets/coldbg.jpg';
import hotbg from './assets/hotbg.jpg';
import Descriptions from './components/Descriptions';
import {getWheatherData} from './wheatherServics';
import {useEffect, useState} from 'react';
import './App.css';


function App() {
  const [city,setCity] = useState("Paris");
  const [weather,setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotbg);

  useEffect(()=>{
    const fetchUserData = async () =>{
      const data = await getWheatherData(city,units);
      setWeather(data);
      // dynammic bg
      const threshold = units === 'metric'?20:60;
      if(data.temp<=threshold) setBg(coldbg)
      else setBg(hotbg)
    }
    
    fetchUserData();
  },[units,city])

  const handleUnitsClick = (e) =>{
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "○F" : "○C"
    setUnits(isCelsius?'metric':'imperial')
  }

  const enterKeyPressed = (e)=>{
    if(e.keyCode === 13){
      setCity(e.currentTarget.value)
    }
  }
  
  return (
    <div className="App" style ={{backgroundImage :`url(${bg})`}}>
      <div className="overlay">
        {
          weather && (
        
        <div className="container">
          <div className="section section_inputs">
            <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter City..."/>
            <button onClick={(e)=>handleUnitsClick(e)}><sup>○</sup>F</button>
          </div>

          <div className="section section_temperature">
            <div className="icon">
              <h3>{`${weather.name}, ${weather.country}`}</h3>
              <img src={weather.iconURL} alt="watherIcon"/>
              <h3>{weather.description}</h3>
            </div>

            <div className="temperature">
                <h1>{`${weather.temp.toFixed()}`}<sup>○</sup>{`${units === 'metric'?'C':'F'}`}</h1>
            </div>
          </div>
          <Descriptions weather={weather} units={units}/>
        </div>
        )};
      </div>      
    </div>
  );
}

export default App;
