import { MapContainer as Map, Marker, Popup,  } from "react-leaflet";
import "leaflet/dist/leaflet.css";
//import "./CovidMap.css";
import L from 'leaflet';
import prison from '../data/icons/prison.jpg'
import * as prisonInfo from "../data/prisons.json";
import React, { useState, useEffect } from "react";




const prisonMap = ({ prisons }) => {

  const myIcon = new L.Icon({
    iconUrl: prison,
    iconRetinaUrl: prison,
    popupAnchor: [-0,-0],
    iconSize: [25, 25]
  });
  const onEachPrison = (prison, layer) => {
    const name = prison.properties.name;
    const confirmedText = prison.properties.confirmedText;
    //layer.Marker.position= 
    //layer.options.MapContainer.layer([51.5, -0.09]);
    layer.bindPopup(`prison name : ${name} <br /> cases : ${confirmedText}`);
    //layer.Marker([38.1700,  -119.7462]);
  };
  let a =[35.97394934 , -120.1231018];
  let b =[40.97394934 , -120.1231018];
 // const onEachPrison = 
 return (

  <Marker 
    position={a} icon={myIcon}>
      position = {prisons.position}
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.</Popup>
  </Marker>
  

);
};
//Marker position={prisonLocations(locations)} icon={myIcon}>

export default prisonMap;

/*        style={mapStyle}
        data={counties}
        onEachFeature={onEachCounty}  */ 


        /*  return (
    
    <Marker 
    position={a} icon={myIcon}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.</Popup>
  </Marker>  );*/