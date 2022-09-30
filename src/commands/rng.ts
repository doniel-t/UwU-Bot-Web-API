import { Command } from '../utils/commandsHandling/Command';
import { APIPayload } from '../types/APIParam';
import { TSMap } from 'typescript-map';

class Rng extends Command {
  getRandomNumberBetween(lowerBound: number, upperBound: number): number {
    return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
  }

  getDefinition(): { name: string; params: TSMap<string, string> } {
    const paramMap = new TSMap<string, string>();
    paramMap.set('lowerBound', 'LowerBound of your random Number <number>');
    paramMap.set('upperBound', 'UpperBound of your random Number <number>');
    return { name: 'rng', params: paramMap };
  }

  async getResContent(content: APIPayload): Promise<number> {
    const lower = content.lowerBound;
    const upper = content.upperBound;
    if (!lower || !isNumber(lower)) throw Error('Lower- and upperBound need to be numbers');
    if (!upper || !isNumber(upper)) throw Error('Lower- and upperBound need to be numbers');
    return this.getRandomNumberBetween(lower, upper);
  }
}

function isNumber(bound: number | undefined): boolean {
  return typeof bound === 'number';
}

export function getInstance() {
  return new Rng();
}
