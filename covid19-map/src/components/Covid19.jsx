import React, { useState, useEffect } from "react";

import Loading from "./Loading";
import CovidMap from "./CovidMap";
import LoadcountiesTask from "../tasks/LoadCountiesTask";
import Legend from "./Legend";
import legendItems from "../entities/LegendItems";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import SearchBar from "./Searchbar";

const Covid19 = () => {
  const [counties, setcounties] = useState([]);
  const [firstDate, setFirstDate] = useState(new Date());

  const legendItemsReverse = [...legendItems].reverse();

  const load = (dateString) => {
    console.log("load");
    const loadcountiesTask = new LoadcountiesTask();
    loadcountiesTask.load((counties) => setcounties(counties), dateString);
  };

  const dateString = firstDate.getFullYear() 
  + "--" + (firstDate.getUTCMonth()+1 < 10 ? ("0" + (firstDate.getUTCMonth()+1)) : firstDate.getUTCMonth()+1)
  + "--" + (firstDate.getUTCDate() < 10 ? ("0" + firstDate.getUTCDate()) : firstDate.getUTCDate());

  const handleSubmit = (e) => {
    const dateString = firstDate.getFullYear() 
  + "--" + (firstDate.getUTCMonth()+1 < 10 ? ("0" + (firstDate.getUTCMonth()+1)) : firstDate.getUTCMonth()+1)
  + "--" + (firstDate.getUTCDate() < 10 ? ("0" + firstDate.getUTCDate()) : firstDate.getUTCDate());

    load(dateString);
    e.preventDefault();
    
  };

  useEffect(load, []);

  return (
    <div>
      <nav class="navbar navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="/"> California COVID Prisons</a>
              <p>{dateString}</p>
              <form onSubmit={handleSubmit}>
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

            <CovidMap counties={counties} />
            <Legend legendItems={legendItemsReverse} />
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Covid19;

/*
class Covid19 extends Component {
  state = {
    counties: [],
  };

  loadcountyTask = new LoadcountyTask();

  componentDidMount() {
    this.loadcountyTask.load((counties) => this.setState({ counties }));
  }

  render() {
    const { counties } = this.state;
    return (
      <div>
        {counties.length === 0 ? (
          <Loading />
        ) : (
          <div>
            <CovidMap counties={counties} />
            <Legend legendItems={legendItems} />
          </div>
        )}
      </div>
    );
  }
}

export default Covid19;
*/
