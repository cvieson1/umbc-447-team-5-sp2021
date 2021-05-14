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

  const loadCounties = (dateString) => {
    console.log("load");
    const loadcountiesTask = new LoadcountiesTask();
    loadcountiesTask.load((counties) => setcounties(counties), dateString);
  };

  const dateString = firstDate.getFullYear() 
  + "-" + (firstDate.getMonth()+1 < 10 ? ("0" + (firstDate.getMonth()+1)) : firstDate.getMonth()+1)
  + "-" + (firstDate.getDate() < 10 ? ("0" + firstDate.getDate()) : firstDate.getDate());

  const handleSubmit = (e) => {
    setcounties([]);
    const dateString = firstDate.getFullYear() 
  + "-" + (firstDate.getMonth()+1 < 10 ? ("0" + (firstDate.getMonth()+1)) : firstDate.getMonth()+1)
  + "-" + (firstDate.getDate() < 10 ? ("0" + firstDate.getDate()) : firstDate.getDate());

    load(dateString);
    e.preventDefault();
    
  };

  //load the page if the dateString changes
  useEffect(() => {
    loadCounties(dateString);
  }, [dateString]);


  return (
    <div>
      <nav class="navbar navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="/"> California COVID Prisons</a>
              <p>{dateString}</p>
              <form onSubmit={handleSubmit} method="get">
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
