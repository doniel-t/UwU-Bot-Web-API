import { Command } from '../utils/commandsHandling/Command';
import { APIPayload } from '../types/APIParam';
import { ASK_ANSWERS, APRIL_FOOLS_ANSWERS } from '../../assets/askStrings';
import { TSMap } from 'typescript-map';

class Ask extends Command {
  isAprilFools(): boolean {
    let aprilFoolsDay = {
      month: 3,
      date: 1,
    };
    let now = new Date();
    return now.getMonth() == aprilFoolsDay.month && now.getDate() == aprilFoolsDay.date;
  }

  getRandomChoice(optionArr: string[]): string {
    return optionArr[Math.floor(Math.random() * optionArr.length)];
  }

  getDefinition(): { name: string; params: TSMap<string, string> } {
    const paramMap = new TSMap<string, string>();
    paramMap.set('content', 'Question you want to ask <string>');
    return { name: 'ask', params: paramMap };
  }

  async getResContent(content: APIPayload): Promise<string> {
    if (!content.content) throw Error('content must not be empty');
    const responseContent = this.isAprilFools()
      ? this.getRandomChoice(APRIL_FOOLS_ANSWERS)
      : this.getRandomChoice(ASK_ANSWERS);
    return responseContent;
  }
}

export function getInstance() {
  return new Ask();
}
