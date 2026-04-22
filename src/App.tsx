import { useQuery } from "@tanstack/react-query";
import { getWeather } from "./api";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const {data} = useQuery({
    queryKey:['weather'],
    queryFn: ()=>getWeather({lat:50,lon:50})
  })
  return (
    <>
      <div className="bg-red-500">Test</div>
    </>
  )
}

export default App
