import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import useTMDBService from '../../services/TMDBService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {Container} from 'react-bootstrap';
import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";

import './MovieLatestList.scss';

const MovieLatestList = () => {
  const [movieLatestList, setMovieLatestList] = useState([]);
  const {loading, error, getLatestMovies} =  useTMDBService();

  useEffect(() => {
      onRequest(true);
  }, [])

  const onRequest = () => {
      getLatestMovies()
          .then(onMovieLatestListLoaded)
  }

  const onMovieLatestListLoaded = (newMovieLatestlist) => {
      setMovieLatestList(movieLatestList => [...movieLatestList, ...newMovieLatestlist])
  }

  function renderItems (arr) {
    const items = arr.map((item, i) => {

        return (
            <SwiperSlide className="movie-list__item" tabIndex={0} key={i}>
                <Link to={`/movies/${item.id}`}>
                    <div className="movie-list__img-wrapp">
                        <img className="w-100" src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title}/>
                        <div className="movie-list__desc">{item.description}</div>
                    </div>
                    <div className="movie-list__stars">{item.stars}</div>
                    <div className="movie-list__name h5 mt-3">{item.title}</div>
                    <div className="movie-list__name h6 mt-2">{item.date}</div>
                </Link>
            </SwiperSlide>
        )
    });

    // movieLatestList wrapper 
    return (
        <Container>
            <h2 className='mb-5'>Upcoming movies</h2>
            <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={24}
                slidesPerView={2}
                breakpoints={{
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 5,
                },
                }}
                navigation={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                className="SwiperLatestMovies"
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
    <div className="movie-list movie-latest-list">
      {errorMessage}
      {spinner}
      {items} 
    </div> 
  )
}

export default MovieLatestList;