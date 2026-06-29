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
  location:string,
  setLocation:Dispatch<SetStateAction<string>>
}

export default function LocationDropdown({location,setLocation}: Props) {
  return (
    <Select value={location} onValueChange={(value)=>{if(value) setLocation(value)}}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Location" />
      </SelectTrigger>
      <SelectContent className="z-1001">
        <SelectGroup>
          {location === 'custom' && (
            <SelectItem value="custom">
              Custom
            </SelectItem>
          )
          }
          {PopularCities.map((city)=>(
            <SelectItem key={city} value={city}>{city}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}


const PopularCities = [
  "Brisbane",
  "Sydney",
  "Melbourne",
  "Perth",
  "Adelaide",

  "Auckland",
  "Wellington",

  "Singapore",
  "Tokyo",
  "Osaka",
  "Seoul",
  "Beijing",
  "Shanghai",
  "Hong Kong",
  "Taipei",
  "Bangkok",
  "Kuala Lumpur",
  "Jakarta",
  "Manila",
  "Ho Chi Minh City",
  "Delhi",
  "Mumbai",

  "London",
  "Paris",
  "Berlin",
  "Madrid",
  "Rome",
  "Amsterdam",
  "Vienna",
  "Prague",
  "Zurich",
  "Stockholm",

  "New York",
  "Los Angeles",
  "Chicago",
  "San Francisco",
  "Seattle",
  "Vancouver",
  "Toronto",
  "Mexico City",

  "Rio de Janeiro",
  "São Paulo",
  "Buenos Aires",
  "Santiago",
  "Lima",

  "Cape Town",
  "Cairo",
  "Nairobi",

  "Dubai",
  "Doha",
  "Abu Dhabi",
  "Istanbul"
]