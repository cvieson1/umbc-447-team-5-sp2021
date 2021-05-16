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

  load = (setState) => {
    this.setState = setState;

    papa.parse(this.covidUrl, {
      download: true,
      header: true,
      complete: (result) => this.#processCovidData(result.data),
    });
  };

  /*class LoadPrisonTask {
    covidUrl =
      "https://raw.githubusercontent.com/uclalawcovid19behindbars/historical-data/main/data/CA-historical-data.csv";
  
    setState = null;
  
    load = (setState) => {
      this.setState = setState;
  
      papa.parse(this.covidUrl, {
        download: true,
        header: true,
        complete: (result) => this.#processCovidData(result.data),
      });
    }; */
  #processCovidData = (covidCounties) => {
    for (let i = 0; i < features.length; i++) {
      const county = features[i];
      //{features[i].map()}
      //console.log(county);
      const covidCounty = covidCounties.find(
        (covidCounty) => county.properties.name.toUpperCase() === covidCounty.County
         && county.properties.state.toUpperCase()  === covidCounty.State.toUpperCase() 
         //&& covidCounty.Date === "2020-05-22"
      );

      /*county.properties.confirmed = 0;
      county.properties.confirmedText = 0;*/

      if (covidCounty != null) {
        //if(covidcounty.date === "20200510"){
        let confirmed = covidCounty.Name//Number(covidCounty.ID);//covidCounty.ID);
        county.properties.confirmed = confirmed;
        county.properties.confirmedText = this.#formatNumberWithCommas(
          confirmed
        );
      //}
    }
      this.#setCountyColor(county);
    }

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
