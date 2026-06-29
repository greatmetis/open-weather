import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";
type Props = {
  coords:Coords
};

export default function DailyForecast({coords}: Props) {
  const { data, isError} = useSuspenseQuery({
    queryKey: ["dailyForecast",coords],
    queryFn: () => getWeather({ type: "dailyForecast", lat: coords.lat, lon: coords.lng }),
  });

  return (
    <>
      {isError && <p className="error">unable to load daily forecast</p>}
      {!isError && data && (
        <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
          {data.list.map((item) => (
            <div key={item.dt} className="flex justify-between items-center">
              <h6 className="uppercase w-10">{new Date(item.dt * 1000).toLocaleDateString(undefined,{weekday:"short"})}</h6>
              <WeatherIcon src={item.weather[0].icon}/>
              
              <p>{Math.round(item.main.temp)} ˚C</p>
              <p className="text-gray-500/75">{Math.round(item.main.temp_min)} ˚C</p>
              <p className="text-gray-500/75">{Math.round(item.main.temp_max)} ˚C</p>
            </div>
          ))}
        </Card>
      )}
    </>
  );
}
