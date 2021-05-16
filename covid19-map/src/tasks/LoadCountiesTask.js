import papa from "papaparse";
import legendItems from "../entities/LegendItems";

import { features } from "../data/counties.json";
//import * from "../data/prisons.json";

//import React, { Component } from 'react';
//import { StyleSheet, Text, View, Button } from 'react-native';
//    this.setState(features);

class LoadCountyTask {
  covidUrl =
    "https://raw.githubusercontent.com/uclalawcovid19behindbars/historical-data/main/data/CA-historical-data.csv";

  setState = null;

  load = (setState, dateString) => {
    this.setState = setState;

    papa.parse(this.covidUrl, {
      download: true,
      header: true,
      complete: (result) => this.#processCovidData(result.data, dateString),
    });
  };

   //yyyy-mm-dd
   
   #getPreviousDay = (dateString) =>{
    if(dateString){
      const day = parseInt(dateString.substring(8,10));
      const month = parseInt(dateString.substring(5,7));
      const year = parseInt(dateString.substring(0,4));

      const date1 = new Date(year, month-1, day);

      //subtracts 1 day
      const prevDateMilli = date1.valueOf() - 86400000;
      const prevDate = new Date(prevDateMilli)

      const prevString = prevDate.getFullYear() 
    + "-" + (prevDate.getMonth()+1 < 10 ? ("0" + (prevDate.getMonth()+1)) : prevDate.getMonth()+1)
    + "-" + (prevDate.getDate() < 10 ? ("0" + prevDate.getDate()) : prevDate.getDate());

      return prevString;
    }
    return dateString;
  };

  #processCovidData = (covidCounties, dateString) => {
    for (let i = 0; i < features.length; i++) {
      const county = features[i];
      //{features[i].map()}
      //console.log(county);
      //console.log(dateString);
      const countyExist = covidCounties.find((covidcounty) => county.properties.name === covidcounty.county);
      if(countyExist != null){

        let covidcounty = covidCounties.find(
          //yyyy-mm-dd
          (covidcounty) => county.properties.name === covidcounty.county && covidcounty.date === dateString
        );
        console.log(covidcounty);
        let newDateString = this.#getPreviousDay(dateString);
        while(!covidcounty){
          newDateString = this.#getPreviousDay(newDateString);
          const newNewDateString = newDateString;
          covidcounty = covidCounties.find(
            //yyyy-mm-dd
            (covidcounty) => county.properties.name === covidcounty.county && covidcounty.date === newNewDateString
          );

        }
        
        county.properties.confirmed = 0;
        county.properties.confirmedText = 0;

        county.properties.deaths = 0;  //added
        county.properties.deathText = 0; //added
  
        if (covidcounty != null) {
          let confirmed = Number(covidcounty.cases);
          let deaths = Number(covidcounty.deaths);    //added
          county.properties.confirmed = confirmed;
          county.properties.deaths = deaths;  //added
          county.properties.confirmedText = this.#formatNumberWithCommas(
            confirmed
          );
          county.properties.deathsText = this.#formatNumberWithCommas(    //added
            deaths
          );
          console.log("found: " + county.properties.name + ": " + county.properties.confirmed);
          console.log("found:" + county.properties.name + ": " + county.properties.deaths);
        }
        this.#setCountyColor(county);
      }
     
    }
    console.log("today: " + dateString + " prev: " + this.#getPreviousDay(dateString));

    this.setState(features);
  };

  #setCountyColor = (county) => {
    const legendItem = legendItems.find((item) =>
      item.isFor(county.properties.confirmed)
    );

    if (legendItem != null) county.properties.color = legendItem.color;
  };

  #formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  //{prisonData.features}
}

export default LoadCountyTask;
