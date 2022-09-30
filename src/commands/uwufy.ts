import { Command } from '../utils/commandsHandling/Command';
import { APIPayload } from '../types/APIParam';
import { TSMap } from 'typescript-map';

class UwUfy extends Command {
  getDefinition(): { name: string; params: TSMap<string, string> } {
    const paramMap = new TSMap<string, string>();
    paramMap.set('content', 'Content you want uwufied <string>');
    return { name: 'uwufy', params: paramMap };
  }

  async getResContent(payload: APIPayload): Promise<string> {
    const content = payload.content;
    if (!content) throw Error('content must not be empty');
    return content
      .replace(/L|R|V/g, 'W')
      .replace(/l|r|v/g, 'w')
      .replace('y', 'ie')
      .replace('Y', 'Ie');
  }
}

export function getInstance() {
  return new UwUfy();
}
