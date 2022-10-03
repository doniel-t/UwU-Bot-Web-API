import { Command } from '../utils/commandsHandling/Command';
import { APIPayload } from '../types/APIParam';
import { TSMap } from 'typescript-map';
import { fetchMoviesByGenre } from '../utils/services/movieHandling/movieByGenreFetcher';
import { toJSONString } from '../utils/services/movieHandling/utils';

class MovieSuggestion extends Command {
  getDefinition(): { name: string; params: TSMap<string, string> } {
    const paramMap = new TSMap<string, string>();
    paramMap.set('genre', 'which genre you want to get suggested <string>');
    paramMap.set('lowerBound', 'lowest allowed score <number>');
    paramMap.set(
      'wantTheatreMovie',
      'should the movie be in theatre (true) or online (false) <boolean>'
    );
    return { name: 'movieSuggestion', params: paramMap };
  }

  async getResContent(content: APIPayload): Promise<string> {
    if (!content.movieGenre) throw Error('movieGenre must not be empty');
    if (!content.lowerBound) throw Error('lowerBound must not be empty');
    const responseContent = await fetchMoviesByGenre(
      content.movieGenre,
      content.lowerBound,
      5,
      content.wantTheatreMovie ? content.wantTheatreMovie : false
    );
    return JSON.parse(toJSONString(responseContent));
  }
}

export function getInstance() {
  return new MovieSuggestion();
}
