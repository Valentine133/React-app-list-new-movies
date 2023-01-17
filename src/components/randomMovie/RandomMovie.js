import { useState, useEffect } from 'react';
import useTMDBService from '../../services/TMDBService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {Row, Col} from 'react-bootstrap';

import './RandomMovie.scss';

const RandomMovie = (props) => {
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
    // const id = 7213;
    const id = Math.floor(Math.random() * (7000 - 6000)) + 6000;
    getMovie(id)
        .then(onMovieLoaded);
  }

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !movie) ? <View movie={movie}/> : null;

  return (
    <div className="randomovie p-3 mb-5">
      <Row className="align-items-center">
        <Col>
          {errorMessage}
          {spinner}
          {content}
        </Col>
        <Col>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet nemo neque, laborum cumque vel repudiandae recusandae consequatur ipsa ipsam nihil voluptatibus expedita nisi nam minima alias quidem sed doloribus ullam?</p>
          <a className="btn btn-primary" href="">press</a>
        </Col>
      </Row>
    </div>
  )
}

  const View = ({movie}) => {
  const {title, description, poster_path} = movie;

  return (
    <div className="randomovie__block d-flex flex-column flex-md-row">
      <img src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt={title} className="randomovie__img" />
      <div className="randomovie__info">
        <h5 className="randomovie__title">{title}</h5>
        <p className="randomovie__desc">{description}</p>
        <div className="randomovie__btns">
          <a className="btn btn-primary" href="">homepage</a>
        </div>
      </div>
    </div>
  )
}

export default RandomMovie;