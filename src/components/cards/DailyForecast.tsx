import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import WeatherIcon from "../weatherIcon";
type Props = {};

export default function DailyForecast({}: Props) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["dailyForecast"],
    queryFn: () => getWeather({ type: "dailyForecast", lat: 50, lon: 50 }),
  });

  return (
    <>
      {isLoading && (
        <p className="loadingIcon" aria-label="loading...">
          Loading...
        </p>
      )}
      {isError && <p className="error">unable to load daily forecast</p>}
      {!isLoading && !isError && data && (
        <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
          {data.list.map((item) => (
            <div key={item.dt} className="flex justify-between items-center">
              <h6 className="uppercase w-10">{new Date(item.dt * 1000).toLocaleDateString(undefined,{weekday:"short"})}</h6>
              <WeatherIcon src={item.weather[0].icon}/>
              
              <p>{Math.round(item.main.temp)} C</p>
              <p className="text-gray-500/75">{Math.round(item.main.temp_min)} ˚C</p>
              <p className="text-gray-500/75">{Math.round(item.main.temp_max)} ˚C</p>
            </div>
          ))}
        </Card>
      )}
    </>
  );
}
