import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useTMDBService from '../../services/TMDBService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {Container, Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import './RandomMovie.scss';

const RandomMovie = () => {
  const [movie, setMovie] = useState(null);
  const {loading, error, getMovie, clearError} =  useTMDBService();

  useEffect (() => {
    updateMovie();
    // const timerId = setInterval(updateMovie, 5000);

    // return () => {
    //   clearInterval(timerId)
    // }
  }, [])

  const onMovieLoaded = (movie) => {
    setMovie(movie);
  }

  const updateMovie = () => {
    clearError();
    const arrMoviesId = [1593, 937278, 315162, 640146, 76600, 436270, 361743];
    const id = Math.floor(Math.random() * arrMoviesId.length);
    getMovie(arrMoviesId[id])
        .then(onMovieLoaded);
  }

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !movie) ? <View movie={movie}/> : null;

  return (
    <div className="randomovie">
      {errorMessage}
      {spinner}
      {content}
    </div>
  )
}

  const View = ({movie}) => {
  const {id, title, date, description, stars, backdrop_path, poster_path} = movie;

  return (
    <div className="randomovie__block" id={`randomovie__id-${id}`}>
      <img src={`https://image.tmdb.org/t/p/original${backdrop_path}`} alt={title} className="randomovie__img" />
      <Container>
        <Row className='gx-5'>
          <Col className='col col-md-3 d-none d-md-block'>
            <img className="w-100" src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt={title}/>
          </Col>
          <Col className='col col-md-9 randomovie__info'>
            <h2 className="randomovie__title">{title}</h2>
            <h4>{date}</h4>
            <h5 className="stars py-2"><FontAwesomeIcon icon={faStar} /> {stars}</h5>
            <p className="randomovie__desc">{description}</p>
            <div className="randomovie__btns">
              <Link to={`movies/${id}`} className="btn btn-primary me-3">More</Link>
              {/* <a className='btn btn-outline-primary' href="">Play Trailer</a> */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default RandomMovie;