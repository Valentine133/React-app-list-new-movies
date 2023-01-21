import RandomMovie from "../randomMovie/RandomMovie";
import MovieList from "../movieList/MovieList";
import {Container} from 'react-bootstrap';

const MainPage = () => {
  return (
    <>
      <Container className="py-5">
        <RandomMovie/>
        <MovieList/>
      </Container>
    </>
  );
}

export default MainPage; 