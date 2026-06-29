import { useEffect } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import type { Coords } from '../types'
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk'
import MapLegend from './MapLegend'
import { Icon } from "leaflet";
import defaultIconPng from 'leaflet/dist/images/marker-icon.png'

const defaultIcon = new Icon({
  iconUrl: defaultIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type Props = {
  coords:Coords,
  onMapClick: (lat:number,lng:number)=>void,
  mapType:string
}
const API_KEY = import.meta.env.VITE_API_KEY; // use vite env

export default function Map({coords,onMapClick,mapType}: Props) {
  const {lat,lng} = coords;

  return (
    <MapContainer 
      center={[lat,lng]} 
      zoom={3} 
      style={{width: "100%", height: "500px",zIndex:50}}>
      <MapClick onMapClick={onMapClick} coords={coords}/>
      <MapTileLayer />
      <TileLayer 
      opacity={0.7}
      url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`}/>
      <Marker icon={defaultIcon} position={[lat,lng]}/>
      <MapLegend mapType={mapType} />
    </MapContainer>
    
  )
}

function MapClick({onMapClick,coords}:{
  onMapClick:(lat:number,lng:number)=>void
  coords:Coords
}){
  const map = useMap();
  map.panTo([coords.lat,coords.lng]);

  map.on('click',(e)=>{
    const {lat,lng} = e.latlng;
    // map.panTo([lat,lng]); // pan the map to where user clicked
    onMapClick(lat,lng);
  })

  return null;
}


function MapTileLayer(){
  const map = useMap();

  useEffect(()=>{
    const tileLayer = new MaptilerLayer({
      style:'basic-dark',
      apiKey:'aqPYwDsgYmPWMYEU8xx3'})

    tileLayer.addTo(map);

    return ()=>{
      map.removeLayer(tileLayer);
    };
  },[])

  return null;
}
