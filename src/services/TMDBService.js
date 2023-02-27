import {useHttp} from '../hooks/http.hook';

const useTMDBService = () => {
  const {loading, request, error, clearError} = useHttp();

  const _apiBase = 'https://api.themoviedb.org/3/';
  const _apiKey = 'api_key=006c1107693e917a3ce057fd35e962d7';
  const _baseOffset = 1;

  const getLatestMovies = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}movie/upcoming?${_apiKey}&language=en-US&page=${offset}`);
    return res.results.map(_transformMovies);
  }

  const getMovies = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}movie/popular?${_apiKey}&language=en-US&page=${offset}`);
    return res.results.map(_transformMovies);
  }

  const getMovie = async (id) => {
    const res = await request(`${_apiBase}/movie/${id}?${_apiKey}&append_to_response=credits&language=en-US`);
    return _transformMovie(res);
  }

  const _transformMovies = (movie) => {
      return {
          id: movie.id,
          title: movie.title,
          date: movie.release_date,
          stars: movie.vote_average,
          description: movie.overview ? movie.overview : 'There is no description for this movie',
          poster_path: movie.poster_path
      }
  }

  const _transformMovie = (movie) => {
      return {
          id: movie.id,
          title: movie.title,
          date: movie.release_date,
          language: movie.original_language,
          stars: movie.vote_average,
          description: movie.overview ? movie.overview : 'There is no description for this movie',
          countries: movie.production_countries,
          genres: movie.genres,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          cast: movie.credits.cast
      }
  }

  return {loading, error, clearError, getMovie, getMovies, getLatestMovies}
}

export default useTMDBService;