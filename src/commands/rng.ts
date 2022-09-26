import { Command } from '../utils/commandsHandling/Command';
import { APIPayload } from '../types/APIParam';

class Rng extends Command {
  getRandomNumberBetween(lowerBound: number, upperBound: number): number {
    return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
  }

  async getResContent(content: APIPayload): Promise<number> {
    const lower = content.lowerBound;
    const upper = content.upperBound;
    if (!lower || !isNumber(lower)) throw Error('Invalid Input');
    if (!upper || !isNumber(upper)) throw Error('Invalid Input');
    return this.getRandomNumberBetween(lower, upper);
  }
}

function isNumber(bound: number | undefined): boolean {
  return typeof bound === 'number';
}

export function getInstance() {
  return new Rng();
}
