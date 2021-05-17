import papa from "papaparse";
//import legendItems from "../entities/LegendItems";
import { features } from "../data/prisons.json";
//    this.setState(features);

class LoadprisonTask {
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

  #processCovidData = (covidprisons, dateString) => {
    for (let i = 0; i < features.length; i++) {
      const prison = features[i];
      //console.log(prison);
      //console.log(dateString);
      const prisonExist = covidprisons.find((covidprison) => prison.properties.Name === covidprison.Name);
      if(prisonExist != null){

        let covidprison = covidprisons.find(
          //yyyy-mm-dd
          (covidprison) => prison.properties.Name === covidprison.Name && covidprison.Date === dateString
        );
        console.log(covidprison);
        let newDateString = this.#getPreviousDay(dateString);
        while(!covidprison){
          newDateString = this.#getPreviousDay(newDateString);
          const newNewDateString = newDateString;
          covidprison = covidprisons.find(
            //yyyy-mm-dd
            (covidprison) => prison.properties.Name === covidprison.Name && covidprison.Date === newNewDateString
          );

        }
        
        prison.properties.confirmed = 0;
        prison.properties.confirmedText = 0;

        prison.properties.deaths = 0;  //added
        prison.properties.deathText = 0; //added
  
        if (covidprison != null) {
          let confirmed = Number(covidprison.cases);
          let deaths = Number(covidprison.deaths);    //added
          prison.properties.confirmed = confirmed;
          prison.properties.deaths = deaths;  //added
          prison.properties.confirmedText = this.#formatNumberWithCommas(
            confirmed
          );
          prison.properties.deathsText = this.#formatNumberWithCommas(    //added
            deaths
          );
          console.log("found: " + prison.properties.Name + ": " + prison.properties.confirmed);
          console.log("found:" + prison.properties.Name + ": " + prison.properties.deaths);
        }
        //this.#setprisonColor(prison);
      }
     
    }
    console.log("today: " + dateString + " prev: " + this.#getPreviousDay(dateString));

    this.setState(features);
  };



  #formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
}

export default LoadprisonTask;
