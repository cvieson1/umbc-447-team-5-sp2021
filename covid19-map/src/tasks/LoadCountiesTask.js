import papa from "papaparse";
import { features } from "../data/counties.json";

class LoadCountiesTask{
    covid19DataUrl = "https://raw.githubusercontent.com/uclalawcovid19behindbars/historical-data/main/data/CA-historical-data.csv";
    
    setState = null;
    mapCounties = features;

    load = (setState) => {
        this.setState = setState;

        papa.parse(this.covid19DataUrl, {
            download:true,
            header: true,
            complete: (result) => this.#processCovidData(result.data)
            ,
        });
    };
    #processCovidData = (covidCounties)=>{
        for(let i = 0; i < this.mapCounties.length; i++){
            const mapCounty = this.mapCounties[i];
            const covidCounty = covidCounties.find(
                (covidCounty) => covidCounty.County === mapCounty.properties.name
            );

            mapCounty.properties.confirmed = 0;
            mapCounty.ConfirmedText = "0";

            if (covidCounty != null) {
                const confirmed = Number(covidCounty.Residents.Confirmed);
                mapCounty.properties.confirmed = confirmed;
                mapCounty.properties.ConfirmedText = confirmed;
            }
        }
        this.setState(this.mapCounties);
    };
}

export default LoadCountiesTask;