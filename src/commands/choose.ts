import { Command } from '../utils/commandsHandling/Command';
import { APIPayload } from '../types/APIParam';

class Choose extends Command {
  getRandomChoice(optionArr: string[]): string {
    return optionArr[Math.floor(Math.random() * optionArr.length)];
  }

  async getResContent(content: APIPayload): Promise<string> {
    if (!content.chooseArr) throw new Error('Invalid Input');
    return this.getRandomChoice(content.chooseArr);
  }
}

export function getInstance() {
  return new Choose();
}
