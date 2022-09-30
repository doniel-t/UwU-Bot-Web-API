import { Command } from '../utils/commandsHandling/Command';
import cleverbot from 'cleverbot-free';
import { APIPayload } from '../types/APIParam';
import { TSMap } from 'typescript-map';

class Cleverbot extends Command {
  async getResContent(payload: APIPayload) {
    if (!payload.content) throw Error('content must not be empty');
    const answer = await cleverbot(payload.content);
    return answer;
  }

  getDefinition(): { name: string; params: TSMap<string, string> } {
    const paramMap = new TSMap<string, string>();
    paramMap.set('content', 'Question you want to ask cleverbot <string>');
    return { name: 'cleverbot', params: paramMap };
  }
}

export function getInstance() {
  return new Cleverbot();
}
