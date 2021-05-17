import React from "react";
import "leaflet/dist/leaflet.css";
import "./CovidMap.css";
//import prison from '../data/icons/prison.jpg';

//added 

//added
import { MapContainer as Map, GeoJSON } from "react-leaflet";
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
    const confirmedTitle = "<br>Confirmed Cases: ";
    const deathsTitle = "<br> Total Deaths: ";  //added
    const deathsText = county.properties.deathsText;
    layer.bindPopup(`${name} ${confirmedTitle} ${confirmedText} ${deathsTitle} ${deathsText}`);  //added
  };

 // const onEachPrison = 
  return (
    <Map style={{ height: "85vh" }} zoom={6} center={[38.1700, -119.7462]}>
      <GeoJSON
        style={mapStyle}
        data={counties}
        onEachFeature={onEachCounty}  
      /> 
    </Map>

            
    
  
  );
};

export default CovidMap;
