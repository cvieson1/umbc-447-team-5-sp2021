/*import React, { useState, useEffect } from "react";
import { MapContainer as Map, GeoJSON, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./CovidMap.css";*/
import L, { marker } from 'leaflet';
import prison from '../data/icons/prison.jpg';

//added 
//import prisonMarker from "./PrisonMarker";
//import LoadPrisonsTask from "../tasks/LoadPrisonsTask";
//added

import React from "react";
import { MapContainer as Map, GeoJSON, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./CovidMap.css";
/*
import * as prisonData from "../data/CA-historical-data.csv";
*/



/*const prisonMarker = () => {
  const [counties, setcounties] = useState([]);*/

 

const myIcon = new L.Icon({
  iconUrl: prison,
  iconRetinaUrl: prison,
  popupAnchor: [-0,-0],
  iconSize: [25, 25]
});
/*
const prison = ({ counties }) => {
  const mapStyle = {
    fillColor: "white",
    weight: 1,
    color: "black",
    fillOpacity: 1,
  };*/
/*
  const onEachCounty = (county, layer) => {
    layer.options.fillColor = county.properties.color;
    const name = county.properties.name;
    const confirmedText = county.properties.confirmedText;
    //layer.options.MapContainer.layer([51.5, -0.09]);
    layer.bindPopup(`county : ${name} <br /> cases : ${confirmedText}`);
    //layer.Marker([38.1700,  -119.7462]);
  };
  let a =[35.97394934 , -120.1231018];
  let b =[40.97394934 , -120.1231018];
 // const onEachPrison = 
  return (
    <Map style={{ height: "90vh" }} zoom={6} center={[38.1700,  -119.7462]}>
      <GeoJSON
        style={mapStyle}
        data={counties}
        onEachFeature={onEachCounty}  
      /> 
      <Marker 
        position={a} icon={myIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.</Popup>
      </Marker>
      <Marker 
        position={b} icon={myIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.</Popup>
      </Marker>
    </Map>
    
  );
};
//Marker position={prisonLocations(locations)} icon={myIcon}>

export default CovidMap;*/


const CovidMap = ({ counties }) => {
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
      <Marker 
        position={a} icon={myIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.</Popup>
      </Marker>
      <Marker 
        position={b} icon={myIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.</Popup>
      </Marker>
    </Map>
  );
};

export default CovidMap;