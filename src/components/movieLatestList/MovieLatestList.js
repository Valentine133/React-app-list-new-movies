import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import useTMDBService from '../../services/TMDBService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {Container} from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import './MovieLatestList.scss';

const MovieLatestList = () => {
  const [movieLatestList, setMovieLatestList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(1);
  const [movieEnded, setMovieEnded] = useState(false);
  const {loading, error, getLatestMovies} =  useTMDBService();

  useEffect(() => {
      onRequest(offset, true);
  }, [])

  const onRequest = (offset, initial) => {
      initial ? setNewItemLoading(false) : setNewItemLoading(true);
      getLatestMovies(offset)
          .then(onMovieLatestListLoaded)
  }

  const onMovieLatestListLoaded = (newMovieLatestlist) => {
      let ended = false;
      if (newMovieLatestlist.length < 19) {
          ended = true;
      }

      setMovieLatestList(movieLatestList => [...movieLatestList, ...newMovieLatestlist])
      setNewItemLoading(newItemLoading => false);
      setOffset(offset => offset + 1);
      setMovieEnded(movieEnded => ended);
  }

  function renderItems (arr) {
    const items = arr.map((item, i) => {

        return (
            <SwiperSlide className="movie-latest-list__item" tabIndex={0} key={i}>
                <Link to={`/${item.id}`}>
                    <img className="w-100" src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title}/>
                        <div className="movie-latest-list__stars">{item.stars}</div>
                        <div className="movie-latest-list__name h5 mt-3">{item.title} ({item.date})</div>
                </Link>
            </SwiperSlide>
        )
    });

    // movieLatestList wrapper 
    return (
        <Container>
            <h2 className='mb-5'>Upcoming movies</h2>
            <Swiper
                spaceBetween={30}
                slidesPerView={5}
                >
                {items}
            </Swiper>
        </Container>
    )
  }

  const items = renderItems(movieLatestList);

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;

  return (
    <div className="movie-latest-list">
      {errorMessage}
      {spinner}
      {items} 
    </div> 
  )
}

export default MovieLatestList;