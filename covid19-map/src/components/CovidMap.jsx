import React from 'react';
import { MapContainer as LeaftletMap, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./CovidMap.css";

const CovidMap = ({counties}) => {
const mapStyle ={
    fillColor: "white",
    weight: 1,
    color: "black",
    fillOpacity: 1,
};
    const onEachCounty = (county, layer)=>{
        layer.options.fillColor = county.properties.color;
        const name = county.properties.name;
        const confirmedText = county.properties.confirmedText;
        layer.bindPopup(`${name} ${confirmedText}`);
    }
    //console.log(counties);
    return (<LeaftletMap style={{ height: "90vh" }} zoom={13} center={[37.7749, -122.4194]}>
        <GeoJSON  style={mapStyle} data={counties} onEachFeature={onEachCounty} />
    </LeaftletMap>
    );
};
 
export default CovidMap;