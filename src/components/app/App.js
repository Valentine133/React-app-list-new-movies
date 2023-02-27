// import { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {MainPage, SingleMoviePage} from '../pages';

import './App.scss';

function App() {
  

  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/:movieId" element={<SingleMoviePage/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
