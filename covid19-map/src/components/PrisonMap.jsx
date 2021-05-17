import { Marker, Popup,  } from "react-leaflet";
import "leaflet/dist/leaflet.css";
//import "./CovidMap.css";
import L from 'leaflet';
import prisonIcon from '../data/icons/prison.jpg'
import {prisonLocs} from "../data/prisonLoc.json"
import React from "react";




const PrisonMap = (prisons) => {

  const myIcon = new L.Icon({
    iconUrl: prisonIcon,
    iconRetinaUrl: prisonIcon,
    popupAnchor: [-0,-0],
    iconSize: [25, 25]
  });

  /*
  prisons.length>0 ? 
    prisons.map((prison) => (
    <Marker key={prison[6]}
      position={[prison[1], prison[2]]}
      icon={myIcon}>
        <Popup>
          {prison[0]}
          Resident cases: {prison[3]}
          Resident deaths: {prison[4]}
          Date retrieved: {prison[5]}
        </Popup>
    </Marker>
  )) :
  */

  //.find(x => x[0]===prison.name)[3]}
  const getCases = (name) =>  {
    console.log("length of prisons: " + prisons.prisons.length)
    for(let i = 0; i < prisons.prisons.length; i++){
      if(prisons.prisons[i][0] === name){
        return prisons.prisons[i][3];
      }
    }
    return "No info"
  }

  const getDeaths = (name) =>  {
    for(let i = 0; i < prisons.prisons.length; i++){
      if(prisons.prisons[i][0] === name){
        return prisons.prisons[i][4];
      }
    }
    return "No info"
  }

  const getDate = (name) =>  {
    for(let i = 0; i < prisons.prisons.length; i++){
      if(prisons.prisons[i][0] === name){
        return prisons.prisons[i][5];
      }
    }
    return "No info"
  }

  const renderDots = () => {
    console.log("Prison dots rendering")
    console.log(prisons)
    return prisonLocs.map((prison) =>(
      <Marker
        position={[prison.Latitude, prison.Longitude]}
        icon={myIcon}>
          <Popup>
            <p>{prison.Name}</p>
            <p>Cases: {getCases(prison.Name)} </p> 
            <p>Deaths: {getDeaths(prison.Name)}</p>
            <p>Date retrieved: {getDate(prison.Name)}</p>
          </Popup>

      </Marker>
    ))
  };

 // const onEachPrison = 
 return (

  renderDots()
  

);
};

export default PrisonMap;

