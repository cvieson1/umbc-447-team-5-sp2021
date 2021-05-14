import papa from "papaparse";
import legendItems from "../entities/LegendItems";
import { features } from "../data/counties.json";
//    this.setState(features);

class LoadcountyTask {
  covidUrl =
    "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv";

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

  #processCovidData = (covidcounties, dateString) => {
    for (let i = 0; i < features.length; i++) {
      const county = features[i];
      //console.log(county);
      //console.log(dateString);
      const countyExist = covidcounties.find((covidcounty) => county.properties.name === covidcounty.county);
      if(countyExist != null){

        let covidcounty = covidcounties.find(
          //yyyy-mm-dd
          (covidcounty) => county.properties.name === covidcounty.county && covidcounty.date === dateString
        );
        console.log(covidcounty);
        let newDateString = this.#getPreviousDay(dateString);
        while(!covidcounty){
          newDateString = this.#getPreviousDay(newDateString);
          const newNewDateString = newDateString;
          covidcounty = covidcounties.find(
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
        this.#setcountyColor(county);
      }
     
    }
    console.log("today: " + dateString + " prev: " + this.#getPreviousDay(dateString));

    this.setState(features);
  };

  #setcountyColor = (county) => {
    const legendItem = legendItems.find((item) =>
      item.isFor(county.properties.confirmed)
    );

    if (legendItem != null) county.properties.color = legendItem.color;
  };

  #formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
}

export default LoadcountyTask;
