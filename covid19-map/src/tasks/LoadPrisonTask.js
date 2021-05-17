import papa from "papaparse";
//import legendItems from "../entities/LegendItems";
//import { features } from "../data/prisons.json";
//    this.setState(features);

class LoadprisonTask {
  covidUrl =
    "https://raw.githubusercontent.com/uclalawcovid19behindbars/historical-data/main/data/CA-historical-data.csv";

  setState = null;

  load = (setState, dateString) => {
    console.log("loading prison data")
    this.setState = setState;
    let newPrisons = [];
    papa.parse(this.covidUrl, {
      download: true,
      //step: (prison) =>this.#processRow(prison, dateString, newPrisons),
      complete: (result) =>this.#processData(result.data, dateString, newPrisons)
      
    });
    setState(newPrisons);
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

  #processData = (resultData, dateString, prisonList) => {
    for(let i = 0; i < resultData.length; i++){
      if(i !== 0){
        this.#processRow(resultData[i], dateString, prisonList, i);
      }
    }
  }

  #processRow = (prison, dateString, newPrisons, key) => {
    //ignore header line
    if (prison[0] !== "FacilityID"){
      //if selected date and prison is not already in newPrisons
      console.log("prison: " + prison[3])
      if( /*prison[4] === dateString && */undefined === newPrisons.find( (x) => x[0] === prison[3] )){
        //console.log("prison found: " + prison[3]);
        const thisPrison = [
          prison[3], //name 0
          prison[36], // latitude 1
          prison[37], // longitude 2
          prison[6], //Residents.Confirmed 3
          prison[8], //Residents.Deaths 4
          prison[4], //Date of data 5
          key

        ];
        newPrisons.push(thisPrison);
      }
    }
  }
  
  #formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
}

export default LoadprisonTask;
