import React from "react";
import GoogleMapReact from 'google-map-react';


export default function SimpleMap(props:any){
  let lati = Number(props.lati);
  let lon = Number(props.lon);
  let name = props.name;
  const renderMarkers = (map:any, maps:any) => {
    let marker = new maps.Marker({
    position: { lat: lati, lng: lon },
    map,
    title: name
    });
    return marker;
   };
  
  const defaultProps = {
    center: {
      lat: lati,
      lng: lon
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '50vh', width: '100%' }}>
    
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCdsXnMXcV_vTCPjTd5tHGCi2Oed3hVKEQ" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onGoogleApiLoaded={(map: { map:any, maps: any}) => renderMarkers(map.map, map.maps)}
        options={{ streetViewControl: true , mapTypeControl: true , mapTypeId: 'HYBRID' }}
      >
      </GoogleMapReact>
    </div>
  );
}