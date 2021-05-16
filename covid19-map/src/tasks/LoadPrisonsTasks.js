import papa from "papaparse";
import { features } from "../data/prisons.json";
//import * from "../data/prisons.json";

//import React, { Component } from 'react';
//import { StyleSheet, Text, View, Button } from 'react-native';
//    this.setState(features);

class LoadPrisonsTask {
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

  #processCovidData = (covidPrisons) => {
    for (let i = 0; i < features.length; i++) {
      const prison = features[i];
      const covidPrison = covidPrisons.find(
        (covidPrison) => prison.properties.Name === covidPrison.Name
         && prison.properties.State  === covidPrison.State

      );


      if (covidPrison != null) {

        let confirmed = covidPrison.Name//Number(covidCounty.ID);//covidCounty.ID);
        prison.properties.confirmed = confirmed;
        prison.properties.confirmedText = this.#formatNumberWithCommas(
          confirmed
        );
      //}
    }

    }

    this.setState(features);
  };


  #formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  //{prisonData.features}
}

export default LoadPrisonsTask;
