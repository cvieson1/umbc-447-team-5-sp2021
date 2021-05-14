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
      console.log("cur day: " + dateString);
      const day = parseInt(dateString.substring(8,9));
      const month = parseInt(dateString.substring(7,6));
      const year = parseInt(dateString.substring(0,3));

      const date1 = new Date(Date.UTC(year, month-1, day));

      //subtracts 1 day
      const prevDateMilli = date1.valueOf() - 86400000;
      const prevDate = new Date(prevDateMilli)

      const prevString = prevDate.getFullYear() 
    + "-" + (prevDate.getUTCMonth()+1 < 10 ? ("0" + (prevDate.getUTCMonth()+1)) : prevDate.getUTCMonth()+1)
    + "-" + (prevDate.getUTCDate() < 10 ? ("0" + prevDate.getUTCDate()) : prevDate.getUTCDate());

      console.log("yesterday: " + prevString);
      return prevDate;
    }
    return dateString;
  };

  #processCovidData = (covidcounties, dateString) => {
    for (let i = 0; i < features.length; i++) {
      const county = features[i];
      //console.log(county);
      //console.log(dateString);
      const covidcounty = covidcounties.find(
        //yyyy-mm-dd
        (covidcounty) => county.properties.name === covidcounty.county && covidcounty.date === dateString
      );

      county.properties.confirmed = 0;
      county.properties.confirmedText = 0;

      if (covidcounty != null) {
        let confirmed = Number(covidcounty.cases);
        county.properties.confirmed = confirmed;
        county.properties.confirmedText = this.#formatNumberWithCommas(
          confirmed
        );
        console.log("found: " + county.properties.name + ": " + county.properties.confirmed);
      }
      this.#setcountyColor(county);
    }

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
