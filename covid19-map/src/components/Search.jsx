import React from "react";
import { useState } from "react";
import "./visually-hidden.css";
import { features } from "../data/counties.json";
import * as JsSearch from 'js-search';


const filterCounties = (counties, query) => {
    if (!query) {
        return counties;
    }
    return counties.filter((county) => {
        const countyName = county.properties.name.toLowerCase();
        return countyName.includes(query);
    });
}


const SearchBar = () => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const filteredCounties = filterCounties(features, query);

    var searcher = new JsSearch.Search('properties.name');
    searcher.addIndex('properties.name');
    searcher.addDocuments(features);

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
                    <li key={county.properties.name}>{county.properties.name}</li>
                ))}
            </ul>
            
        </div>
    );
};

export default SearchBar;