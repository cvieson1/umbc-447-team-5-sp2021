import React from "react";
import { GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./CovidMap.css";
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

  return (
    
      <GeoJSON
        style={mapStyle}
        data={counties}
        onEachFeature={onEachCounty}
      />
    
  );
};


export default CovidMap;
