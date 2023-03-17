import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import useTMDBService from '../../services/TMDBService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {Row, Col, Form, Button} from 'react-bootstrap';

import './MoviesCategory.scss';

const MoviesCategory = () => {
  const [movieList, setMovieList] = useState([]);
  const [query, setQuery]=useState('');
  const [search, setSearch] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(1);
  const [movieEnded, setMovieEnded] = useState(false);
  const {loading, error, getMovies, getSearch} =  useTMDBService();

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

  const onSearchMovies = (newMovieSearchList) => {
      setMovieList([...newMovieSearchList])

      if (query.length === 0) {
          onRequest(1, true);
      }
  }

  const searchMovie = async(e)=>{
    e.preventDefault();

    setSearch(query.length > 0 ? search => true : search => false);
    getSearch(query)
        .then(onSearchMovies)
  }

  const changeHandler=(e)=>{
    setQuery(e.target.value);
  }

  function renderItems (arr) {
    const items = arr.map((item, i) => {

        return (
            <Col 
                className="movie-list__item col gy-5"
                tabIndex={0}
                key={i}
                >
                    <Link to={`/movies/${item.id}`}>
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
            <Form className="d-flex mb-4" onSubmit={searchMovie} autoComplete="off">
              <Form.Control
              type="search"
              placeholder="Movie Search"
              className="me-2"
              aria-label="search"
              name="query"
              value={query} onChange={changeHandler}></Form.Control>
              <Button className='btn btn-primary' type="submit">Search</Button>
            </Form>

            <h1 className='mb-4'>
                {search === true ? 'Search results' : 'Movies list'}
            </h1>
            
            <Row className="movie-list__grid row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                {items.length > 0 ? items : <h2 className='w-100 mt-5'>Sorry !! No Movies Found</h2>}
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
      {search === false ?
      <button 
            disabled={newItemLoading} 
            style={{'display' : movieEnded ? 'none' : 'block'}}
            className="btn btn-primary btn-lg m-auto mt-5"
            onClick={() => onRequest(offset)}>
            <div className="h5 mb-0">Load more</div>
        </button> : ''}
    </div> 
  )
}

export default MoviesCategory;