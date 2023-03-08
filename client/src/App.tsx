import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Main from "./Main"
import Ranking from "./Ranking"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path='/' element={<Main/>}/>

          <Route path='/ranking' element={<Ranking/>}/>

        </Routes>
      </header>
    </div>
  );
}

export default App;
