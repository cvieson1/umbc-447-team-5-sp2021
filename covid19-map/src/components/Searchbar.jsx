import React from "react";
import Select from 'react-select';
import "./visually-hidden.css";
import {counties} from "../data/countyNames.json"



const SearchBar = () => {




    return (
        <div>
            
                <label htmlFor="header-search">
                    <span className="visually-hidden">Search counties or prisons</span>
                </label>
                <Select
                options={counties}
                />
                

            
            
        </div>
    );
};

export default SearchBar;