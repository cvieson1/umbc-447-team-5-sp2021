import React from "react";
import Select from 'react-select';
import "./visually-hidden.css";
import {counties} from "../data/countyNames.json"


const filterCounties = (counties, query) => {
    if (!query) {
        return counties;
    }
    return counties.filter((county) => {
        const countyName = county.name.toLowerCase();
        return countyName.includes(query.toLowerCase());
    });
}


const SearchBar = () => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const filteredCounties = filterCounties(counties, query);



    return (
        <div>
            <form action="/" method="get">
                <label htmlFor="header-search">
                    <span className="visually-hidden">Search counties or prisons</span>
                </label>
                <Select
                options={counties}
                />
                <input class="btn btn-primary" type="submit" value="Search" />
            </form>
            
            
        </div>
    );
};

export default SearchBar;