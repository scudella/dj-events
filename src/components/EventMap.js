import Image from 'next/image';
import { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const EventMap = ({ evt }) => {
  const [viewState, setViewState] = useState({
    longitude: evt.longitude,
    latitude: evt.latitude,
    zoom: 16,
  });

  const key = process.env.NEXT_PUBLIC_MAPTILER_API_TOKEN;

  return (
    <Map
      mapLib={maplibregl}
      initialViewState={viewState}
      onMove={(e) => setViewState(e.viewState)}
      style={{ width: '100%', height: '500px' }}
      mapStyle={`https://api.maptiler.com/maps/streets-v2/style.json?key=${key}`}
    >
      <Marker key={evt.id} latitude={evt.latitude} longitude={evt.longitude}>
        <Image
          src='/images/pin.svg'
          width={30}
          height={30}
          alt={'pin at location'}
        />
      </Marker>
    </Map>
  );
};
export default EventMap;
