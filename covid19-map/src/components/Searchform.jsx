import React , { useState } from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import SearchBar from "./Searchbar";

const handleSubmit = () => {

};

function SearchForm(){
    const [theDate, setDate] = useState(new Date());
    
        
    return (
        <form onSubmit={handleSubmit}>
            <DatePicker 
                todayButton="Click for Today"
                selected={theDate}
                onChange={date => setDate(date)}
            />
            <SearchBar />
            <input class="btn btn-primary" type="submit" value="Search" />
        </form>
    )
}


export default SearchForm;