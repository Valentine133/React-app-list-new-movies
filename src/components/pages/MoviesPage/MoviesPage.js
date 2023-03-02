import { Link } from 'react-router-dom';
import MovieList from "../../movieList/MovieList";

import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import './MoviesPage.scss';

const MoviesPage = () => {
  return (
    <Container className="py-5">
      <div className='navigation mb-4'>
        <Link to="/" className="single-movie__back btn btn-link"><FontAwesomeIcon icon={faArrowLeft} /> Back to home</Link>
      </div>
      <MovieList/>
    </Container>
  )
}

export default MoviesPage;