// import { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {MainPage, MoviesPage, SingleMoviePage, SinglePersonPage} from '../pages';

import './App.scss';

function App() {
  

  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/movies" element={<MoviesPage/>}/>
            <Route path="/movies/:movieId" element={<SingleMoviePage/>}/>
            <Route path="/:personId" element={<SinglePersonPage/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
