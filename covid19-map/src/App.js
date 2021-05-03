import React, { useEffect, useState } from "react";
import "./App.css";
import Covid19 from "./components/Covid19";
import axios from 'axios'
import DatePickerButton from "./components/Datepicker";
import SearchBar from "./components/Search";



function App() {
  const [getMessage, setGetMessage] = useState({})

  useEffect(()=>{
    axios.get('http://localhost:5000/').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })
  
  }, [])

  return (
    <div className ="App">
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/"> California COVID Prisons</a>
          <form class="d-flex">
            <DatePickerButton />
            <SearchBar />
          </form>
        </div>
      </nav>
      <div>
        <Covid19 />
      </div>
    </div>
    
  );
}

export default App;
