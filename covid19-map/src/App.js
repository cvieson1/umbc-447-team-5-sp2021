import React, { useEffect, useState } from "react";
import "./App.css";
import Covid19 from "./components/Covid19";
import axios from 'axios'




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
      
      <div>
        <Covid19 />
      </div>
    </div>
    
  );
}

export default App;
