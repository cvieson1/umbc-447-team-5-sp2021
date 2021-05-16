import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import CovidMap from "./CovidMap";
import LoadcountiesTask from "../tasks/LoadCountiesTask";
import Legend from "./Legend";
import legendItems from "../entities/LegendItems";
import { MapContainer as Map, GeoJSON, Marker, Popup } from "react-leaflet";

const Covid19 = () => {
  const [counties, setcounties] = useState([]);

  const legendItemsReverse = [...legendItems].reverse();

  const loadCounties = () => {
    console.log("load");
    const loadcountiesTask = new LoadcountiesTask();
    loadcountiesTask.load((counties) => setcounties(counties));
  };

  useEffect(loadCounties, []);

  return (
    <div>
      {counties.length === 0 ? (
        <Loading />
      ) : (
        <div>
          <CovidMap counties={counties} />
          <Legend legendItems={legendItemsReverse} />

        </div>
      )}
    </div>
  );
};

export default Covid19;

