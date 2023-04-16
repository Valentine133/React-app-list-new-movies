import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import useTMDBService from '../../services/TMDBService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {Row, Col} from 'react-bootstrap';

import './MovieList.scss';

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(1);
  const [movieEnded, setMovieEnded] = useState(false);
  const {loading, error, getMovies} =  useTMDBService();

  useEffect(() => {
      onRequest(offset, true);
  }, [])

  const onRequest = (offset, initial) => {
      initial ? setNewItemLoading(false) : setNewItemLoading(true);
      getMovies(offset)
          .then(onMovieListLoaded)
  }

  const onMovieListLoaded = (newMovielist) => {
      let ended = false;
      if (newMovielist.length < 19) {
          ended = true;
      }

      setMovieList(movieList => [...movieList, ...newMovielist])
      setNewItemLoading(newItemLoading => false);
      setOffset(offset => offset + 1);
      setMovieEnded(movieEnded => ended);
  }

  function renderItems (arr) {
    const items = arr.map((item, i) => {

        return (
            <Col 
                className="movie-list__item col gy-5"
                tabIndex={0}
                key={i}
                >
                    <Link to={`movies/${item.id}`}>
                        <div className="movie-list__img-wrapp">
                            <img className="w-100" src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title}/>
                            <div className="movie-list__desc">{item.description}</div>
                        </div>
                        <div className="movie-list__stars">{item.stars}</div>
                        <div className="movie-list__name h5 mt-3">{item.title}</div>
                        <div className="movie-list__name h6 mt-2">{item.date}</div>
                    </Link>
            </Col>
        )
    });

    // movieList wrapper 
    return (
        <>
            <div className="w-100 d-flex justify-content-between mb-4">
                <h2 className='mb-0'>Popular movies</h2>
                <Link to="movies" className="btn btn-primary">Go to category</Link>
            </div>
            
            <Row className="movie-list__grid row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                {items}
            </Row>
        </>
    )
  }

  const items = renderItems(movieList);

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;

  return (
    <div className="movie-list">
      {errorMessage}
      {spinner}
      {items} 
      <button 
            disabled={newItemLoading} 
            style={{'display' : movieEnded ? 'none' : 'block'}}
            className="btn btn-primary btn-lg m-auto mt-5"
            onClick={() => onRequest(offset)}>
            <div className="h5 mb-0">Load more</div>
        </button>
    </div> 
  )
}

export default MovieList;