import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import CovidMap from "./CovidMap";
import LoadcountiesTask from "../tasks/LoadCountiesTask";
import Legend from "./Legend";
import legendItems from "../entities/LegendItems";
import { MapContainer as Map, GeoJSON, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import prison from '../data/icons/prison.jpg'


import PrisonMap from "./PrisonMap";
import LoadPrisonsTask from "../tasks/LoadPrisonsTasks";


const myIcon = new L.Icon({
  iconUrl: prison,
  iconRetinaUrl: prison,
  popupAnchor: [-0,-0],
  iconSize: [25, 25]
});

const Covid19 = () => {
  const [counties, setcounties] = useState([]);

  const legendItemsReverse = [...legendItems].reverse();

  const loadCounties = () => {
    console.log("load");
    const loadcountiesTask = new LoadcountiesTask();
    loadcountiesTask.load((counties) => setcounties(counties));
  };

  useEffect(loadCounties, []);

  const [prisons, setPrisons] = useState([]);
  const loadPrisons = () => {
    console.log("load");
    const loadPrisonsTask = new LoadPrisonsTask();
    loadPrisonsTask.load((prisons) => setPrisons(prisons));
  };
  useEffect(loadPrisons, []);


  return (
    <div>
      {counties.length === 0 ? (
        <Loading />
      ) : (
        <div>
         <Map style={{ height: "90vh" }} zoom={5} center={[38.1700,  -119.7462]}>

          <CovidMap counties={counties} /> 
          <PrisonMap prisons={prisons} />  </Map>
          <Legend legendItems={legendItemsReverse} />
          
        </div>
      )}
    </div>
  );
};

export default Covid19;

