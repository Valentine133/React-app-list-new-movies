// import { useEffect, useState } from "react";
// import RandomMovie from "../randomMovie/RandomMovie";
import MovieList from "../movieList/MovieList";
import {Container} from 'react-bootstrap';

import './App.scss';

function App() {
  

  return (
    <Container className="App py-5">
      {/* <RandomMovie/> */}
      <MovieList/>
    </Container>
  );
}

export default App;
