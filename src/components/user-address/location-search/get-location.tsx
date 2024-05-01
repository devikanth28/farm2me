import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker
} from "@react-google-maps/api";
import SearchLocation from "./search-location";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

const libraries: any = ["core", "places", "marker"];

const GetAddressByLocation = ({ getLatitudeLongitude, lat, lng }: any) => {
  const { t } = useTranslation();
  const [address, setAddress] = useState<any>(null);
  const [isCurrentLocationFetching, setIsCurrentLocationFetching] = useState<boolean>(false);
  const mapContainerStyle = {
    width: '100%', height: '400px'
  };
  const options = {
    // styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
  };

  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDL9J82iDhcUWdQiuIvBYa0t5asrtz3Swk",
    libraries
  });
  const [markers, setMarkers] = React.useState<any>([]);
  const mapRef = React.useRef<any>();
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

  const onMapLoad = React.useCallback((map: any) => {
    console.log("map loaded")
    mapRef.current = map;
    if (lat == null || lng == null) {
      getCurrentLocation();
    } else {
      setMapWithLatLng(lat, lng);
    }
    setMarkers([
      {
        lat: lat,
        lng: lng
      }
    ]);


  }, []);

  const getCurrentLocation = () => {
    setIsCurrentLocationFetching(true);
    navigator.geolocation.getCurrentPosition(getCoordinates, handleLocationError);
  }

  const handleLocationError = (error: any) => {
    console.log(error);
    setIsCurrentLocationFetching(false);
  }

  const setMapWithLatLng = (lat: string, lng: string) => {
    if (mapRef && mapRef.current) {
      if (lat && lng) {
        mapRef.current.panTo({ lat, lng });
      }
      mapRef.current.setZoom(14);
      setMarkers([
        {
          lat: lat,
          lng: lng
        }
      ]);
      setLatitude(lat);
      setLongitude(lng);
      setAddress("test");
    }
  }

  const getCoordinates = (position: any) => {
    setIsCurrentLocationFetching(false);
    setMapWithLatLng(position.coords.latitude, position.coords.longitude);
  }

  const onMapClick = React.useCallback((e: any) => {
    setMapWithLatLng(e.latLng.lat(), e.latLng.lng());
  }, []);


  const panTo = React.useCallback(({ lat: latPan, lng: lngPan, address }: any) => {
    setMarkers([
      {
        lat: latPan,
        lng: lngPan
      }
    ]);
    mapRef.current.panTo({ lat: latPan, lng: lngPan });
    mapRef.current.setZoom(14);
    setAddress(address);
    setMapWithLatLng(latPan, lngPan);

  }, []);


  const populateAddress = () => {
    getLatitudeLongitude(latitude + "," + longitude);
  }

  return (
    <> {isLoaded &&
      <div>
        <div className="mb-2 p-input-icon-left flex flex-wrap">
          <SearchLocation panTo={panTo} />
        </div>
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          options={options}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >
          {markers.map((marker: any) => (marker.lat && marker.lng && <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onLoad={() => {
              console.log("marker loaded")
            }}
            onClick={() => {
              console.log(marker);
            }}
          />
          )
          )}

        </GoogleMap>
        <div className="flex justify-content-center flex-wrap">
          <div className="flex align-items-center justify-content-center">
            <Button label="Get Current Location" type="button" className="m-1" loading={isCurrentLocationFetching} severity="info" onClick={getCurrentLocation} />
            <Button label={t('use_this_address')} disabled={address == null} type="button" className="m-1" onClick={populateAddress} />
          </div>
        </div>

      </div>
    }
      {
        !(isLoaded) && <div>Loading....</div>
      }
    </>
  );
}


export default GetAddressByLocation;
