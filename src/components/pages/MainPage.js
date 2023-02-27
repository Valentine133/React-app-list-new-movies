import RandomMovie from "../randomMovie/RandomMovie";
import MovieList from "../movieList/MovieList";
import MovieLatestList from "../movieLatestList/MovieLatestList";
import {Container} from 'react-bootstrap';

const MainPage = () => {
  return (
    <>
      <RandomMovie/>
      <MovieLatestList/>
      <Container className="py-5">
        <MovieList/>
      </Container>
    </>
  );
}

export default MainPage; 