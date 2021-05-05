import React from "react";
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
                <input
                    type="text"
                    id="header-search"
                    placeholder="Search counties or prisons"
                    name="s" 
                />
                <button type="button" class="btn btn-primary">Search</button>
            </form>
            <ul>
                {filteredCounties.map(county => (
                    <li key={county.id}>{county.name}</li>
                ))}
            </ul>
            
        </div>
    );
};

export default SearchBar;