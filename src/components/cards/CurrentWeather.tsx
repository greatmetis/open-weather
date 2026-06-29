import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";
import type {Coords} from "../../types"

type Props = {
  coords:Coords
};

export default function CurrentWeather({coords}: Props) {
  const { data, isError } = useSuspenseQuery({
    queryKey: ["weather",coords],
    queryFn: () => getWeather({ type: "current", lat: coords.lat, lon: coords.lng }),
  });

  return (
    <>
      {isError && <p>Unable to load current weather.</p>}
      {!isError && data && (
        <Card title="Current Weather" childrenClassName="flex flex-col items-center gap-4">
          <h2 className="text-foreground font-semibold">{Math.round(data.main.temp)}˚C</h2>
          <p>{data.name}</p>
          <WeatherIcon src={data.weather[0].icon} className="size-14"/>
          <p className="capitalize">{data.weather[0]?.description}</p>
          <div className="flex flex-col">
            <p className="text-center text-gray-500/75">Local Time:</p>
            <h5 className="text-foreground">
              {new Intl.DateTimeFormat('en-US',{
              hour:"2-digit",
              minute:"2-digit",
              hour12:true,
              // timeZone:data.timezone
            }).format(new Date(data.dt * 1000))
              }</h5>
          </div>
          <div className="flex justify-between gap-4 w-full">
            <div className="flex flex-col items-center gap-2">
              <p className="text-gray-500/75">Feels like</p>
              <p className="text-foreground">{Math.round(data.main.feels_like)} ˚C</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-gray-500/75">Humidity</p>
              <p className="text-foreground">{data.main.humidity}%</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-gray-500/75">Wind</p>
              <p className="text-foreground"> {Math.round(data.wind.speed)} mph</p>
            </div>
          
          
          </div>
        </Card>
      )}
    </>
  );
}
