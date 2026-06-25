import React from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import type { Coords } from '../types'
type Props = {
  coords:Coords,
  onMapClick: (lat:number,lng:number)=>void
}

export default function Map({coords,onMapClick}: Props) {
  const {lat,lng} = coords;
  console.log(lat,lng)

  return (
    <MapContainer 
      center={[lat,lng]} 
      zoom={3} 
      style={{width:"1000px",height:"500px",zIndex:50}}>
      <MapClick onMapClick={onMapClick} coords={coords}/>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat,lng]}/>
        
    </MapContainer>
  )
}

function MapPan({position}:{position:[number,number]}){
  const map = useMap();
  map.panTo(position); 
  
  return null;
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
