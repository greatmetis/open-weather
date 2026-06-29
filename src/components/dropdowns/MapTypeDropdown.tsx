import { type Dispatch, type SetStateAction } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  mapType:string,
  setMapType:Dispatch<SetStateAction<string>>
}

export default function MapTypeDropdown({mapType,setMapType}: Props) {
  return (
    <Select value={mapType} onValueChange={(value)=>{if(value) setMapType(value)}}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Map Type" />
      </SelectTrigger>
      <SelectContent className="z-1001">
        <SelectGroup>
          {types.map((city)=>(
            <SelectItem key={city} value={city} className="capitalize">
              {city.split("_")[0]}
            </SelectItem> 
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}


const types = [
  'clouds_new',
  'precipitation_new',
  'wind_new',
  'temp_new',
  'pressure_new'
]