import React from "react";
import "./visually-hidden.css";

const SearchBar = () => (
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
        <button type="submit">Search</button>
    </form>
);

export default SearchBar;