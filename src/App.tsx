import CurrentWeather from "./components/cards/CurrentWeather";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForcast from "./components/cards/HourlyForcast";

function App() {
  
  return (
    <>
    <div className="flex flex-col gap-4">
      <CurrentWeather />
      <HourlyForcast />
      <DailyForecast />
    </div>
    </>
  )
}

export default App
