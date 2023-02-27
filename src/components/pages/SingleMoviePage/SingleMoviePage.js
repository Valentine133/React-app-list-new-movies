import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useTMDBService from '../../../services/TMDBService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import {Container, Row, Col, Table} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './SingleMoviePage.scss';

const SingleMoviePage = () => {
  const {movieId} = useParams();
  const [movie, setMovie] = useState(null);
  const {loading, error, getMovie} =  useTMDBService();

  useEffect(() => {
      updateMovie();
  }, [movieId])

  const updateMovie = () => {
      // clearError();
      getMovie(movieId)
          .then(onMovieLoaded)
  } 

  const onMovieLoaded = (movie) => {
      setMovie(movie);
  }

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !movie) ? <View movie={movie}/> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

const View = ({movie}) => {
  const {title, date, description, backdrop_path, poster_path, stars, language, countries, genres, cast} = movie;

  return (
    <div className="single-movie">
      <section className="single-movie__backgrount-poster mb-4">
        <img src={`https://image.tmdb.org/t/p/original${backdrop_path}`} alt={title} className="single-movie__backgrount-poster--img w-100" />
        <Container>
          <h1 className="single-movie__backgrount-poster--title">{title} ({stars})</h1>
        </Container>
      </section>
      
      <Container className="single-movie__info-wrapp py-5">
        <Row>
          <Col className="col-12 col-md-3 single-movie__poster mb-4">
            <img className="w-100 mb-4" src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt={title}/>
            <div className="single-movie__details">
              <Table borderless>
                <tbody>
                  <tr>
                    <td><strong>Date</strong></td>
                    <td className='text-end'>{date}</td>
                  </tr>
                  <tr>
                    <td><strong>Language</strong></td>
                    <td className='text-end'>{language}</td>
                  </tr>
                  <tr>
                    <td><strong>Genres</strong></td>
                    <td className='text-end'>{genres.map((item) => item.name + ', ')}</td>
                  </tr>
                  <tr>
                    <td><strong>Countries</strong></td>
                    <td className='text-end'>{countries.map((item) => item.name + ', ')}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
          <Col className="col-12 col-md-9 col-xl-8 offset-xl-1 single-movie__desc-wrapp">
            <div className='navigation mb-4'>
              <Link to="/" className="single-movie__back btn btn-link"><FontAwesomeIcon icon={faArrowLeft} /> Back to home</Link>
            </div>

            <div className="single-movie__desc mb-5">{description}</div>

            <div className="divider my-5"></div>

            <h3 className='mb-4'>Cast</h3>
            <div className="single-movie__cast row row-cols-1 row-cols-md-2 row-cols-lg-3">
              {cast.slice(0,9).map((item, i) => (
                <div key={i} className="col single-movie__cast--item mb-3 d-flex align-items-center">
                  <div className='me-3'><img className='rounded-circle' src={`https://image.tmdb.org/t/p/w200${item.profile_path}`} alt={item.name} /></div>
                  <div><strong>{item.name}</strong><br/><span className='character'>{item.character}</span></div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SingleMoviePage;