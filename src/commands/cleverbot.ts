import { Command } from '../utils/commandsHandling/Command';
import cleverbot from 'cleverbot-free';
import { APIPayload } from '../types/APIParam';

class Cleverbot extends Command {
  async getResContent(payload: APIPayload) {
    if (!payload.content) throw Error('Cleverbot commands needs content string!');
    const answer = await cleverbot(payload.content);
    return answer;
  }
}

export function getInstance() {
  return new Cleverbot();
}
