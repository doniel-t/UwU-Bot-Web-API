import { Command } from '../utils/commandsHandling/Command';
import { APIPayload } from '../types/APIParam';
import { TSMap } from 'typescript-map';

class Choose extends Command {
  getRandomChoice(optionArr: string[]): string {
    return optionArr[Math.floor(Math.random() * optionArr.length)];
  }

  getDefinition(): { name: string; params: TSMap<string, string> } {
    const paramMap = new TSMap<string, string>();
    paramMap.set('chooseArr', 'String Array of posibilites to choose from');
    return {
      name: 'choose',
      params: paramMap,
    };
  }

  async getResContent(content: APIPayload): Promise<string> {
    if (!content.chooseArr) throw new Error('chooseArr must not be empty');
    return this.getRandomChoice(content.chooseArr);
  }
}

export function getInstance() {
  return new Choose();
}
