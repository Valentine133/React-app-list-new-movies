import {useHttp} from '../hooks/http.hook';

const useTMDBService = () => {
  const {loading, request, error, clearError} = useHttp();

  const _apiBase = 'https://api.themoviedb.org/3/';
  const _apiKey = 'api_key=006c1107693e917a3ce057fd35e962d7';
  const _baseOffset = 1;

  const getMovies = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}discover/movie?sort_by=popularity.desc&${_apiKey}&language=en-US&page=${offset}`);
    return res.results.map(_transformMovie);
  }

  const getMovie = async (id) => {
    const res = await request(`${_apiBase}/movie/${id}?${_apiKey}&language=en-US`);
    return _transformMovie(res);
  }

  const _transformMovie = (movie) => {
      return {
          id: movie.id,
          title: movie.title,
          date: movie.release_date,
          stars: movie.vote_average,
          description: movie.overview ? movie.overview : 'There is no description for this movie',
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path
      }
  }

  return {loading, error, clearError, getMovie, getMovies}
}

export default useTMDBService;