import { useState } from "react";
import CurrentWeather from "./components/cards/CurrentWeather";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForcast from "./components/cards/HourlyForcast";
import Map from "./components/Map";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import { useQuery } from "@tanstack/react-query";
import { getGeoCode } from "./api";

function App() {
  const [coordinates, setCoords] = useState<Coords>({lat:50,lng:150});
  const [location, setLocation] = useState<string>('Taipei');

  const {data:geocodeData} = useQuery({
    queryKey:['geocode',location],
    queryFn: ()=> getGeoCode(location)
  });

  //change the coordinates to where user clicked on the map
  const onMapClick = (lat:number,lng:number)=>{
    setCoords({lat,lng});
    setLocation('custom'); // this determine if the coords should be from the map or the LocationDropdown
  }

  // Condition checkpoint for coordinate sources
  const coords:Coords = location === 'custom' ? 
    coordinates : 
    {lat:geocodeData?.[0].lat ?? 0, lng:geocodeData?.[0].lon ?? 0}
  return (
    <>
    <div className="flex flex-col gap-4">
      <LocationDropdown location={location} setLocation={setLocation}/>
      <Map coords={coords} onMapClick={onMapClick}/>
      <CurrentWeather coords={coords}/>
      <HourlyForcast coords={coords}/>
      <DailyForecast coords={coords}/>
    </div>
    </>
  )
}

export default App
