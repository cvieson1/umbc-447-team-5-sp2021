import { Marker, Popup,  } from "react-leaflet";
import "leaflet/dist/leaflet.css";
//import "./CovidMap.css";
import L from 'leaflet';
import prisonIcon from '../data/icons/prison.jpg'
import { prisons } from "../data/prisonLoc.json"
import React from "react";




const prisonMap = () => {

  const myIcon = new L.Icon({
    iconUrl: prisonIcon,
    iconRetinaUrl: prisonIcon,
    popupAnchor: [-0,-0],
    iconSize: [25, 25]
  });


  const renderDots = () => {
    var i;
    for(i = 0; i < prisons.length; i++){
      L.marker([prisons[i].Latitude, prisons[i].Longitude])
    }

    return prisons.map((prison) => (
      <Marker
        position={[prison.Latitude, prison.Longitude]}
        icon={myIcon}>
          <Popup>{prison.Name}</Popup>
      </Marker>
    ))
  };

 // const onEachPrison = 
 return (

  renderDots()
  

);
};

export default prisonMap;

