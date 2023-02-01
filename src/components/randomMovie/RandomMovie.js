import { useState, useEffect } from 'react';
import useTMDBService from '../../services/TMDBService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
// import {Row, Col} from 'react-bootstrap';

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
    const id = 2293;
    // const id = Math.floor(Math.random() * (2000 - 1000)) + 2000;
    getMovie(id)
        .then(onMovieLoaded);
  }

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !movie) ? <View movie={movie}/> : null;

  return (
    <div className="randomovie mb-5">
      {errorMessage}
      {spinner}
      {content}
    </div>
  )
}

  const View = ({movie}) => {
  const {id, title, date, description, stars, backdrop_path} = movie;

  return (
    <div className="randomovie__block" id={`randomovie__id-${id}`}>
      <img src={`https://image.tmdb.org/t/p/original${backdrop_path}`} alt={title} className="randomovie__img" />
      <div className="randomovie__info p-3">
        <h5 className="randomovie__title">{title} ({date}) <span className="stars">{stars}</span></h5>
        <p className="randomovie__desc">{description}</p>
        <div className="randomovie__btns">
          <a className="btn btn-primary" href="">More</a>
        </div>
      </div>
    </div>
  )
}

export default RandomMovie;