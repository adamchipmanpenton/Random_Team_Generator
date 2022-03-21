import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom"
import {Home, ViewTeams, AddTeam, PageNotFound } from "./pages"
import { useState, useEffect } from 'react';

function App() {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    fetch('/api/teams')
      .then((response) => response.json())
      .then(setTeams)
  }, []);

  const [playersAdded, setPlayersAdded] = useState([]);
  useEffect(() => {
    fetch('/api/playersAdded')
      .then((response) => response.json())
      .then(setPlayersAdded)
  }, []);


  

  return(
    <div>
      <Routes>
        <Route path="/" element={<Home teams={teams} setTeams={setTeams} />}/>
        <Route path="/viewTeams" element={<ViewTeams teams={teams} setTeams={setTeams} />}/>
        <Route path="/addTeam" element={<AddTeam teams={teams} setTeams={setTeams}
        playersAdded={playersAdded} setPlayersAdded={setPlayersAdded}/>}/>
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </div>
  )
}
export default App;