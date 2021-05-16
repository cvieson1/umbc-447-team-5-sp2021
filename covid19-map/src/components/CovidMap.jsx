import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./CovidMap.css";
import L from 'leaflet';
//import prison from '../data/icons/prison.jpg';

//added 
import PrisonMap from "./PrisonMap";
import LoadPrisonsTask from "../tasks/LoadPrisonsTasks";
//added
import { MapContainer as Map, GeoJSON, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
/*
const myIcon = new L.Icon({
  iconUrl: prison,
  iconRetinaUrl: prison,
  popupAnchor: [-0,-0],
  iconSize: [25, 25]
});
*/


const CovidMap = ({ counties }) => {
  const [prisons, setPrisons] = useState([]);
  const load = () => {
    console.log("load");
    const loadPrisonsTask = new LoadPrisonsTask();
    loadPrisonsTask.load((prisons) => setPrisons(prisons));
  };
  useEffect(load, []);

  const mapStyle = {
    fillColor: "white",
    weight: 1,
    color: "black",
    fillOpacity: 1,
  };

  const onEachCounty = (county, layer) => {
    layer.options.fillColor = county.properties.color;
    const name = county.properties.name;
    const confirmedText = county.properties.confirmedText;
    layer.bindPopup(`${name} ${confirmedText}`);
  };
  let a =[35.97394934 , -120.1231018];
  let b =[40.97394934 , -120.1231018];
 // const onEachPrison = 
  return (
  
    <Map style={{ height: "90vh" }} zoom={5} center={[38.1700,  -119.7462]}>
      <GeoJSON
        style={mapStyle}
        data={counties}
        onEachFeature={onEachCounty}  
      /> 
        <PrisonMap prisons={prisons} />

    </Map>
            
    
  
  );
};

export default CovidMap;
/*
<Marker 
position={a} icon={myIcon}>
<Popup>
  A pretty CSS3 popup. <br /> Easily customizable.</Popup>
</Marker>
<Marker 
position={b} icon={myIcon}>
<Popup>
  A pretty CSS3 popup. <br /> Easily customizable.</Popup>
</Marker>*/