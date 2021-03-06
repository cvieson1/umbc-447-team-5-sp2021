import React, { useState, useEffect } from "react";

import Loading from "./Loading";
import CovidMap from "./CovidMap";
import LoadcountiesTask from "../tasks/LoadCountiesTask";
import LoadprisonTask from "../tasks/LoadPrisonTask";
import Legend from "./Legend";
import legendItems from "../entities/LegendItems";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import SearchBar from "./Searchbar";
import {MapContainer as Map} from "react-leaflet";
import PrisonMap from "./PrisonMap"
//import { prisons } from "../data/prisonLoc.json"

const Covid19 = () => {
  const [counties, setcounties] = useState([]);
  const [prisonPoints, setprisonPoints] = useState([]);

  const [firstDate, setFirstDate] = useState(new Date());

  const legendItemsReverse = [...legendItems].reverse();

  const load = (dateString) => {
    console.log("load");
    const loadcountiesTask = new LoadcountiesTask();
    const loadPrisonsTask = new LoadprisonTask();
    
    loadcountiesTask.load((counties) => setcounties(counties), dateString);
    loadPrisonsTask.load((prisonPoints) => setprisonPoints(prisonPoints), dateString);
  };

  const dateString = firstDate.getFullYear() 
  + "-" + (firstDate.getMonth()+1 < 10 ? ("0" + (firstDate.getMonth()+1)) : firstDate.getMonth()+1)
  + "-" + (firstDate.getDate() < 10 ? ("0" + firstDate.getDate()) : firstDate.getDate());

  const handleSubmit = (e) => {
    setcounties([]);
    const dateString = firstDate.getFullYear() 
  + "-" + (firstDate.getMonth()+1 < 10 ? ("0" + (firstDate.getMonth()+1)) : firstDate.getMonth()+1)
  + "-" + (firstDate.getDate() < 10 ? ("0" + firstDate.getDate()) : firstDate.getDate());

    load(dateString);
    e.preventDefault();
    
  };

  //load the page if the dateString changes
  useEffect(() => {
    load(dateString);
  }, [dateString]);


  return (
    <div>
      <nav class="navbar navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="/"> California COVID Prisons</a>
              <p>{dateString}</p>
              <form onSubmit={handleSubmit} method="get">
                <DatePicker 
                    todayButton="Click for Today"
                    selected={firstDate}
                    onChange={date => setFirstDate(date)}
                />
                <SearchBar />
                <input class="btn btn-primary" type="submit" value="Search" />
            </form>
            
          </div>
      </nav>
      <div>
        {counties.length === 0 ? (
          <Loading />
        ) : (
          <div>
            <Map style={{ height: "85vh" }} zoom={6} center={[38.1700, -119.7462]}>
              <CovidMap counties={counties} />
              <PrisonMap prisons={prisonPoints}/> 
              
              
            </Map>
            <Legend legendItems={legendItemsReverse} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Covid19;
