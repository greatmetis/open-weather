import { dailyForecastSchema } from "./schemas/dailyForecastSchema";
import { hourlyForecastSchema } from "./schemas/hourlyForecastSchema";
import { weatherSchema } from "./schemas/weatherSchema";

const API_KEY = import.meta.env.VITE_API_KEY; // use vite env

type CurrentWeatherResponse = ReturnType<typeof weatherSchema.parse>;
type HourlyForecastResponse = ReturnType<typeof hourlyForecastSchema.parse>;
type DailyForecastReponse = ReturnType<typeof dailyForecastSchema.parse>

type getWeatherProps = {
  type: "current" | "hourlyForecast" | "dailyForecast";
  lat: number;
  lon: number;
};

export function getWeather(props: {
  type: "current";
  lat: number;
  lon: number;
}): Promise<CurrentWeatherResponse | undefined>;

export function getWeather(props: {
  type: "hourlyForecast";
  lat: number;
  lon: number;
}): Promise<HourlyForecastResponse | undefined>;

export function getWeather(props: {
  type: "dailyForecast";
  lat: number;
  lon: number;
}): Promise<DailyForecastReponse | undefined>;

export async function getWeather({ type, lat, lon }: getWeatherProps) {
  if (!API_KEY) {
    console.error("VITE_API_KEY not found");
    return;
  }

  let res: Response;
  let data;
  switch (type) {
    case "current":
      res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${API_KEY}`
      );

      // parse into json
      data = await res.json();
      return weatherSchema.parse(data);

    case "hourlyForecast":
      res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=24&units=metric&appid=${API_KEY}`
      );
      data = await res.json();
      return hourlyForecastSchema.parse(data);

    case "dailyForecast":
      res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=7&units=metric&appid=${API_KEY}`
      );
      data = await res.json();
      return dailyForecastSchema.parse(data);
  }
}

