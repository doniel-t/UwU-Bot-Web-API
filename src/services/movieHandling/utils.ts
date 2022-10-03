import { Movie } from './types';

export function escapeHTML(movieName: string): string {
  return movieName.replace('&#39;', "'");
}

export function toJSONString(movies: Movie[]): string {
  const stringyfied = JSON.stringify(movies);
  return stringyfied.replace('/', '');
}
