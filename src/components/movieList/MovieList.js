import { useState, useEffect} from 'react';
import useTMDBService from '../../services/TMDBService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {Row, Col} from 'react-bootstrap';

<<<<<<< HEAD
import './MovieList.scss';

const MovieList = (props) => {
=======
const MovieList = () => {
>>>>>>> main
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
<<<<<<< HEAD
                className="movie-list__item col gy-5"
=======
                className="movie__item col-12 col-md-4 col-lg-3 gy-5"
>>>>>>> main
                tabIndex={0}
                // ref={el => itemRefs.current[i] = el}
                key={i}
                // onClick={() => {
                //     props.onMovieSelected(item.id)
                //     focusOnItem(i);
                // }}
                // onKeyPress={(e) => {
                //     if (e.key === ' ' || e.key === "Enter") {
                //         props.onMovieSelected(item.id);
                //         focusOnItem(i);
                //     }
                // }}
                >
<<<<<<< HEAD
                    <img className="w-100" src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title}/>
                    <div className="movie-list__stars">{item.stars}</div>
                    <div className="movie-list__name h5 mt-3">{item.title} ({item.date})</div>
                    <div className="movie-list__desc">{item.description}</div>
=======
                    <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title}/>
                    <div className="movie__name mt-3">{item.title}</div>
                    <div className="movie__desc d-none">{item.description}</div>
>>>>>>> main
            </Col>
        )
    });

    // movieList wrapper 
    return (
<<<<<<< HEAD
        <Row className="movie-list__grid row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
=======
        <Row className="movie__grid g-4">
>>>>>>> main
            {items}
        </Row>
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