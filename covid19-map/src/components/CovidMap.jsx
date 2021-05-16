import React from "react";
import "leaflet/dist/leaflet.css";
import "./CovidMap.css";
//import prison from '../data/icons/prison.jpg';

//added 

//added
import {  GeoJSON } from "react-leaflet";
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

 // const onEachPrison = 
  return (
  

      <GeoJSON
        style={mapStyle}
        data={counties}
        onEachFeature={onEachCounty}  
      /> 

            
    
  
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