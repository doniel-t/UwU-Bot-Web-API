import { Command } from '../utils/commandsHandling/Command';
import { APIPayload } from '../types/apiParam';

class UwUfy extends Command {
  async getResContent(payload: APIPayload): Promise<string> {
    const content = payload.content;
    if (!content) throw Error('Invalid Input');
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
