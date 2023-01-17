import { useState, useEffect} from 'react';
import useTMDBService from '../../services/TMDBService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {Row, Col} from 'react-bootstrap';

const MovieList = (props) => {
  const [movieList, setMovieList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(1);
  const [movieEnded, setMovieEnded] = useState(false);
  const {loading, error, getMovies} =  useTMDBService();

  useEffect(() => {
      onRequest(offset, true);
  }, [])

  const onRequest = (initial) => {
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
                className="char__item col-12 col-md-4 col-lg-3"
                tabIndex={0}
                // ref={el => itemRefs.current[i] = el}
                key={i}
                // onClick={() => {
                //     props.onCharSelected(item.id)
                //     focusOnItem(i);
                // }}
                // onKeyPress={(e) => {
                //     if (e.key === ' ' || e.key === "Enter") {
                //         props.onCharSelected(item.id);
                //         focusOnItem(i);
                //     }
                // }}
                >
                    <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title}/>
                    <div className="char__name">{item.title}</div>
            </Col>
        )
    });

    // charList wrapper 
    return (
        <Row className="char__grid g-4">
            {items}
        </Row>
    )
  }

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const items = renderItems(movieList);

  return (
    <div className="movie__list">
      {errorMessage}
      {spinner}
      {items}
    </div> 
  )
}

export default MovieList;