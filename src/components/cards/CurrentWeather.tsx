import { useQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";
import type {Coords} from "../../types"

type Props = {
  coords:Coords
};

export default function CurrentWeather({coords}: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["weather",coords],
    queryFn: () => getWeather({ type: "current", lat: coords.lat, lon: coords.lng }),
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Unable to load current weather.</p>}
      {!isLoading && !isError && data && (
        <Card title="Current Weather" childrenClassName="flex flex-col items-center gap-4">
          <h2 className="text-zinc-100 font-semibold">{Math.round(data.main.temp)}˚C</h2>
          <p>{data.name}</p>
          <WeatherIcon src={data.weather[0].icon} className="size-14"/>
          <p className="capitalize text-xl">{data.weather[0]?.description}</p>
          <div className="flex flex-col">
            <p className="text-center">Local Time:</p>
            <h3 className="text-zinc-100">
              {new Intl.DateTimeFormat('en-US',{
              hour:"2-digit",
              minute:"2-digit",
              hour12:true,
              // timeZone:data.timezone
            }).format(new Date(data.dt * 1000))
              }</h3>
          </div>
          <div className="flex justify-between gap-4 w-full">
            <div className="flex flex-col items-center gap-2">
              <p>Feels like</p>
              <p className="text-zinc-100">{Math.round(data.main.feels_like)} ˚C</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p>Humidity</p>
              <p className="text-zinc-100">{data.main.humidity}%</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p>Wind</p>
              <p className="text-zinc-100"> {Math.round(data.wind.speed)} mph</p>
            </div>
          
          
          </div>
        </Card>
      )}
      {!isLoading && !isError && !data && <p>Weather data is unavailable.</p>}
    </>
  );
}
