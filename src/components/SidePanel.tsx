import { getAirPollution } from '@/api';
import type { Coords } from '@/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense, type Dispatch, type SetStateAction } from 'react'
import Card from './cards/Card';
import AirPollutionSkeleton from './skeletons/AirPollutionSkeleton';
import { Slider } from './ui/slider';
import clsx from 'clsx';
import {Tooltip,TooltipContent,TooltipTrigger} from '@/components/ui/tooltip'
import InformationIcon from '@/assets/information.svg?react'
import Chevron from "/src/assets/ChevronLeft.svg?react"
type Props = {
  coords: Coords
  isSidePanelOpen: boolean
  setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>
}

export default function SidePanel(props: Props) {
  //decontruct props
  const {isSidePanelOpen, setIsSidePanelOpen} = props;
  // console.log(isSidePanelOpen)
  return (
    <div className={clsx("fixed top-0 right-0 h-screen w-(--sidebar-width) shadow-md bg-sidebar z-1001 py-6 px-4 overflow-y-scroll transition-transform duration-300 lg:!translate-x-0", isSidePanelOpen ? 'translate-x-0': 'translate-x-full')}>
      <button onClick={() => setIsSidePanelOpen(false)} className="lg:hidden">
        <Chevron className="size-8 -ml-2" />
      </button>
      <Suspense fallback={<AirPollutionSkeleton/>}>
        <AirPollution {...props}/>
      </Suspense>
    </div>
  )
}

function AirPollution({coords}:Props){
  const {data} = useSuspenseQuery({
    queryKey:['airpollution',coords],
    queryFn:()=> getAirPollution(coords)
  });

  if(!data?.list?.[0]){
    return null;
  }
  const dataItem = data.list[0];

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-semibold lg:-mt-2">Air pollution</h4>
      <h2 className="font-semibold">{dataItem.main.aqi}</h2>
      <div className="flex gap-2">
        <h4 className="font-semibold">AQI</h4>
        <Tooltip>
          <TooltipTrigger >
            <InformationIcon className="size-4"/>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">Air Quality Index. Possible values: 1, 2, 3, 4, 5. Where 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor.</p>
            </TooltipContent>
        </Tooltip>
        
      </div>
      {Object.entries(dataItem.components).map(([key,dataValue])=>{
        // Prepare maxValue for each pollutant to use on the sidebar

        // get the last index from airQualityLevels
        const veryPoorAirQualityLevels = airQualityLevels.at(-1);
        //use the min value for each pollutant as the max value of their slider
        const rangeOfVeryPoorAirQualityLevels = veryPoorAirQualityLevels?.ranges;
        if(!rangeOfVeryPoorAirQualityLevels) return null;
        
        const pollutant = key as Pollutant; // explicitly cast key to pollutant type so that
        // get the max value between real value and predefined "very poor min value"
        const pollutantMax = Math.max(rangeOfVeryPoorAirQualityLevels[pollutant].min,dataValue) ?? 0; // fallback to 0 to make typescript happy

        let currentLevel = 'very poor';
        // get current level for each pollutant by checking where is the value fall into the airQualityLevels
        airQualityLevels.forEach((level)=>{
          for(const[key,RangeVal] of Object.entries(level.ranges)){
            // get relevant pollutant from airQualityLevels
            if(key===pollutant){
              //check which range it falls into
              if(dataValue >= RangeVal.min && (RangeVal.max != null || dataValue <= RangeVal.max)){
                currentLevel = level.name.toLocaleLowerCase();
              }
            }
          }
        })

        // get colours
        const qualityColor = (()=>{
          switch(currentLevel){
            case 'good':
              return 'bg-green-500'
            case 'fiar':
              return 'bg-yellow-500'
            case 'moderate':
              return 'bg-orange-500'
            case 'poor':
              return 'bg-red-500'
            case 'very poor':
              return 'bg-purple-500'
            default:
              return 'bg-zinc-500'
          }
        })();

        return(
        <Card 
        key={key} 
        className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 !gap-0"
        childrenClassName="flex flex-col gap-2"
        >
          <div className="flex justify-between">
            <div className="flex gap-2">
            <h6 className="font-bold capitalize">{key}</h6>
              <Tooltip>
                <TooltipTrigger >
                  <InformationIcon className="size-4 self-start"/>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Concentration of {pollutantNameMapping[key]}</p>
                  </TooltipContent>
              </Tooltip>
            </div>
            <span className="font-semibold">{dataValue}</span>
          </div>
          <Slider min={0} max={pollutantMax} value={[dataValue]} disabled/>
          <div className="flex justify-between">
            <span className='text-sm'>0</span>
            <span className='text-sm'>{pollutantMax}</span>
          </div>
          <div className="flex justify-between gap-1">
            {airQualityLevels.map((item,i)=>(
              <span 
              key={i} 
              className={clsx('p-1 rounded-md text-xs font-semibold',item.name.toLocaleLowerCase()===currentLevel ? qualityColor :'bg-muted text-muted-foreground')}>
              {item.name}
              </span>
            ))}
          </div>
        </Card>
        )
      })}
    </div>  
  )
}
type Pollutant = "so2" | "no" |"no2" | "pm10" | "pm2_5" | "o3" | "co" | "nh3";

type AirQualityName = "Good" | "Fair" | "Moderate" | "Poor" | "Very Poor";

type PollutantRange = {
  min: number;
  max: number | null; // null means no upper limit
};

type AirQualityLevel = {
  name: AirQualityName;
  index: 1 | 2 | 3 | 4 | 5;
  ranges: Record<Pollutant, PollutantRange>;
};

const airQualityLevels: AirQualityLevel[] = [
  {
    name: "Good",
    index: 1,
    ranges: {
      so2: { min: 0, max: 20 },
      no: { min: 0, max: 20 },
      no2: { min: 0, max: 40 },
      pm10: { min: 0, max: 20 },
      pm2_5: { min: 0, max: 10 },
      o3: { min: 0, max: 60 },
      co: { min: 0, max: 4400 },
      nh3: { min: 0, max: 40 },
    },
  },
  {
    name: "Fair",
    index: 2,
    ranges: {
      so2: { min: 20, max: 80 },
      no: { min: 20, max: 40 },
      no2: { min: 40, max: 70 },
      pm10: { min: 20, max: 50 },
      pm2_5: { min: 10, max: 25 },
      o3: { min: 60, max: 100 },
      co: { min: 4400, max: 9400 },
      nh3: { min: 40, max: 70 },
    },
  },
  {
    name: "Moderate",
    index: 3,
    ranges: {
      so2: { min: 80, max: 250 },
      no: { min: 40, max: 60 },
      no2: { min: 70, max: 150 },
      pm10: { min: 50, max: 100 },
      pm2_5: { min: 25, max: 50 },
      o3: { min: 100, max: 140 },
      co: { min: 9400, max: 12400 },
      nh3: { min: 70, max: 150 },
    },
  },
  {
    name: "Poor",
    index: 4,
    ranges: {
      so2: { min: 250, max: 350 },
      no: { min: 60, max: 80 },
      no2: { min: 150, max: 200 },
      pm10: { min: 100, max: 200 },
      pm2_5: { min: 50, max: 75 },
      o3: { min: 140, max: 180 },
      co: { min: 12400, max: 15400 },
      nh3: { min: 150, max: 200 },
    },
  },
  {
    name: "Very Poor",
    index: 5,
    ranges: {
      so2: { min: 350, max: null },
      no: { min: 80, max: null },
      no2: { min: 200, max: null },
      pm10: { min: 200, max: null },
      pm2_5: { min: 75, max: null },
      o3: { min: 180, max: null },
      co: { min: 15400, max: null },
      nh3: { min: 200, max: null },
    },
  },
];

const pollutantNameMapping: Record<Pollutant, string> = {
  so2: "Sulfur dioxide",
  no2: "Nitrogen dioxide",
  pm10: "Particulate matter 10",
  pm2_5: "Fine particles matter",
  o3: "Ozone",
  co: "Carbon monoxide",
  no: "Nitrogen monoxide",
  nh3: "Ammonia",
}