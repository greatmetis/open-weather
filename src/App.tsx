import { Suspense, useEffect, useState } from "react";
import CurrentWeather from "./components/cards/CurrentWeather";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForcast from "./components/cards/HourlyForcast";
import Map from "./components/Map";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import { useQuery } from "@tanstack/react-query";
import { getGeoCode } from "./api";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton";
import DailySkeleton from "./components/skeletons/DailySkeleton";
import HourlySkeleton from "./components/skeletons/HourlySkeleton";
import SidePanel from "./components/SidePanel";
import Hamburger from "/src/assets/hamburger.svg?react"

function App() {
  const [coordinates, setCoords] = useState<Coords>({ lat: 25.0375, lng: 121.5637 });
  const [location, setLocation] = useState<string>('Taipei');
  const [mapType, setMapType] = useState<string>('clouds_new');
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)

  const {data:geocodeData} = useQuery({
    queryKey:['geocode',location],
    queryFn: ()=> getGeoCode(location)
  });

  //change the coordinates to where user clicked on the map
  const onMapClick = (lat:number,lng:number)=>{
    setCoords({lat,lng});
    setLocation('custom'); // this determine if the coords should be from the map or the LocationDropdown
  }

  useEffect(() => {
    if (location === 'custom' || !geocodeData?.[0]) {
      return;
    }

    setCoords({ lat: geocodeData[0].lat, lng: geocodeData[0].lon });
  }, [geocodeData, location]);

  const coords = coordinates;
  return (
    <>
    <div className="flex gap-8 py-6">
        <div className="flex gap-4">
          <h5>Location: </h5>
          <LocationDropdown location={location} setLocation={setLocation}/>
        </div>
        <div className="flex gap-4">
          <h5>Map Type: </h5>
          <MapTypeDropdown mapType={mapType} setMapType={setMapType}/>
        </div>
        <button className="ml-auto" onClick={() => setIsSidePanelOpen(true)}>
          <Hamburger className="size-8 lg:hidden invert" />
        </button>
      </div>
    <div className="grid grid-cols-1 2xl:flex-1 2xl:min-h-0 md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-4 gap-4">
      <div className="order-1 md:order-2 relative h-120 2xl:h-auto col-span-1 md:col-span-2 2xl:col-span-4 2xl:row-span-2">
        <Map coords={coords} onMapClick={onMapClick} mapType={mapType}/>
      </div>
      <div className="col-span-1 2xl:row-span-2 order-2">
          <Suspense fallback={<CurrentSkeleton />}>
            <CurrentWeather coords={coords} />
          </Suspense>
        </div>
        <div className="col-span-1 order-3 2xl:order-4 2xl:row-span-2">
          <Suspense fallback={<DailySkeleton />}>
            <DailyForecast coords={coords} />
          </Suspense>
        </div>
        <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-4 2xl:order-3">
          <Suspense fallback={<HourlySkeleton />}>
            <HourlyForcast coords={coords} />
          </Suspense>
        </div>
        
      {/* <div className="order-2 md:order-1">
      <Suspense fallback={<CurrentSkeleton/>}>
        <CurrentWeather coords={coords}/>
      </Suspense>
      <Suspense fallback={<HourlySkeleton/>}>
        <HourlyForcast coords={coords}/>
      </Suspense>
      <Suspense fallback={<DailySkeleton/>}>
        <DailyForecast coords={coords}/>
      </Suspense>
      </div> */}
    </div>

    <SidePanel coords={coords} isSidePanelOpen={isSidePanelOpen} setIsSidePanelOpen={setIsSidePanelOpen}/>
    </>
  )
}

export default App
