import { weatherSchema } from "./schemas/weatherSchema";

const API_KEY = import.meta.env.VITE_API_KEY;

type getWeatherProps = {
  lat:number,
  lon:number
}

export async function getWeather({lat,lon}:getWeatherProps){
  if(!API_KEY){
    console.error('VITE_API_KEY not found');
    return;
  }

  const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${API_KEY}`)

  // parse into json
  const data = await res.json();
  return weatherSchema.parse(data);
}


