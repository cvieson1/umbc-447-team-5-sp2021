import React, { useState, useEffect } from 'react';
import Loading from "./Loading";
import CovidMap from "./CovidMap";
import Legend from "./Legend";
import LoadCountiesTask from "../tasks/LoadCountiesTask";

const Covid19 = () => {
    const [counties, setCounties]= useState([]);

    const load = () => {
        const loadCountiesTask = new LoadCountiesTask();
        loadCountiesTask.load(setCounties);
    };

    useEffect(load, []); 

    return <div>{counties.length === 0 ? <Loading/> : <div><CovidMap/><Legend/></div>}</div>;
};
 
export default Covid19;