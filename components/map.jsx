import { MapContainer, Marker, Popup, TileLayer, Tooltip, Polyline, CircleMarker, Circle  } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import React, { useEffect, useState } from "react";

const Map = ({places}) => {

  const actualOptions = { color: 'black'}
  const realLineOptions = { color: 'black', dashArray: '8'}
  const teoricLineOptions = { color: 'lime', dashArray: '8'}
  const redOptions = { color: 'red' }
  const blueOptions = { color: 'blue' }

  return (
    <MapContainer center={[0,0]} zoom={2} scrollWheelZoom={false} style={{height: 600, width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {places.map((place) => (
        <CircleMarker key={`I-${place.code}`} center={place.origin} pathOptions={blueOptions} radius={5}>
          <Tooltip>{`Inicio ${place.code}`}</Tooltip>
        </CircleMarker>
      ))}

      {places.map((place) => (
        <CircleMarker key={`F-${place.code}`} center={place.destination} pathOptions={redOptions} radius={5}>
          <Tooltip>{`Fin ${place.code}`}</Tooltip>
        </CircleMarker>
      ))}

      {places.map((place) => (
        <Polyline key={`T-${place.code}`}  positions= {[place.origin, place.destination]} pathOptions={teoricLineOptions}>
          <Tooltip>{place.code}</Tooltip>
        </Polyline>
      ))}

    </MapContainer>
  )
}

export default Map