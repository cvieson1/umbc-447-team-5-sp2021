import React, { useState, useEffect } from "react";

import Loading from "./Loading";
import CovidMap from "./CovidMap";
import LoadcountiesTask from "../tasks/LoadCountiesTask";
import Legend from "./Legend";
import legendItems from "../entities/LegendItems";

const Covid19 = () => {
  const [counties, setcounties] = useState([]);

  const legendItemsReverse = [...legendItems].reverse();

  const load = () => {
    console.log("load");
    const loadcountiesTask = new LoadcountiesTask();
    loadcountiesTask.load((counties) => setcounties(counties));
  };

  useEffect(load, []);

  return (
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
