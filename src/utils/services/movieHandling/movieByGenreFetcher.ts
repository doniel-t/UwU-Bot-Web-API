import { Movie } from './types';
import { getMovieName, getScore } from './parseHTMLText';
import { escapeHTML } from './utils';

const BASE_URL = 'https://www.rottentomatoes.com/browse/';
const movieTypes = {
  theatre: 'movies_in_theaters',
  home: 'movies_at_home',
};

export async function fetchMoviesByGenre(
  genre: string,
  minRating: number,
  pagesNum: number,
  wantTheatreMovies: boolean | undefined
): Promise<Movie[]> {
  const movieType = wantTheatreMovies ? movieTypes.theatre : movieTypes.home;
  const genreBasedURL = `${BASE_URL}${movieType}/genres:${genre}~sort:popular?page=${pagesNum}`;
  const page = await fetch(genreBasedURL);
  const pageString = await page.text();
  const movies = getMoviesByRating(pageString, minRating);
  return movies;
}

function getMoviesByRating(htmlBody: string, minRating: number): Movie[] {
  const movieSplits = htmlBody.split('href="/m/');
  const movies: Movie[] = [];
  movieSplits.forEach((movieSplit: string) => {
    const score = getScore(movieSplit);
    if (score < minRating || Number.isNaN(score)) {
      return;
    }
    const movie = {
      name: escapeHTML(getMovieName(movieSplit)),
      score: score,
    };
    movies.push(movie);
  });
  return movies;
}
