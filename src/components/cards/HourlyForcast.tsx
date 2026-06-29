import { useSuspenseQuery } from '@tanstack/react-query';
import { getWeather } from '../../api';
import Card from './Card'
import WeatherIcon from '../WeatherIcon';
import type { Coords } from '../../types';

type Props = {
  coords:Coords
}

export default function HourlyForcast({coords}: Props) {
  const { data, isError } = useSuspenseQuery({
    queryKey: ["hourlyForecast",coords],
    queryFn: () => getWeather({ type: "hourlyForecast", lat: coords.lat, lon:coords.lng }),
  });

  return (
    <>
    {isError && <p>Unable to load daily Forecast</p>}
    {!isError && data && (
      <Card title="Hourly Forecast (24 Hours)" childrenClassName="flex gap-3 overflow-x-scroll">
          {data.list.map(item=>(
            <div key={item.dt} className="flex flex-col items-center gap-4 p-2">
              <p className="whitespace-nowrap">{new Date(item.dt * 1000).toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit", hour12:true})}</p>
              <WeatherIcon src={item.weather[0].icon}/>
              <p className="min-w-12">{Math.round(item.main.temp)} ˚C</p>
            </div>
          ))}
      </Card>
      )}
    </>
  )
}