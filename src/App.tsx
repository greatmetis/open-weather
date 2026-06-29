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
import MobileHeader from "./components/MobileHeader"
import LightDarkToggle from "./components/LightDarkToggle"

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
    <MobileHeader setIsSidePanelOpen={setIsSidePanelOpen} />
    <div className="flex gap-8 p-4 xs:pt-8 w-full lg:w-[calc(100dvw-var(--sidebar-width)-2rem)]">
        <div className="flex justify-between gap-4 xl:items-start w-[calc(100dvw-48px)]">
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-wrap lg:items-center gap-2">
              <h6 className="my-1 font-semibold">Location: </h6>
              <LocationDropdown location={location} setLocation={setLocation}/>
            </div>
            <div className="flex flex-wrap lg:items-center gap-2">
              <h6 className="my-1 font-semibold">Map Type: </h6>
              <MapTypeDropdown mapType={mapType} setMapType={setMapType}/>
            </div>
          </div>
          <div className="ml-auto flex gap-4 lg:items-center h-full">
            <div className="hidden lg:block">
              <LightDarkToggle />
            </div>
          </div>
        </div>
    </div>
    <div className="grid grid-cols-1  md:grid-cols-2 gap-4 lg:w-[calc(100dvw-var(--sidebar-width)-2rem)]">
      <div className="order-1 md:order-2 relative h-120 col-span-1 md:col-span-2 ">
        <Map coords={coords} onMapClick={onMapClick} mapType={mapType}/>
      </div>
      <div className="col-span-1  order-2">
          <Suspense fallback={<CurrentSkeleton />}>
            <CurrentWeather coords={coords} />
          </Suspense>
        </div>
        <div className="col-span-1 order-3 ">
          <Suspense fallback={<DailySkeleton />}>
            <DailyForecast coords={coords} />
          </Suspense>
        </div>
        <div className="col-span-1 md:col-span-2 order-4 ">
          <Suspense fallback={<HourlySkeleton />}>
            <HourlyForcast coords={coords} />
          </Suspense>
        </div>
    </div>

    <SidePanel coords={coords} isSidePanelOpen={isSidePanelOpen} setIsSidePanelOpen={setIsSidePanelOpen}/>
    </>
  )
}

export default App
