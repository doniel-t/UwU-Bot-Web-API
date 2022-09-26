import { Command } from '../utils/commandsHandling/Command';
import { APIPayload } from '../types/APIParam';
import { ASK_ANSWERS, APRIL_FOOLS_ANSWERS } from '../../assets/askStrings';

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

  async getResContent(content: APIPayload): Promise<string> {
    if (!content.content) throw Error('Invalid Input');
    const responseContent = this.isAprilFools()
      ? this.getRandomChoice(APRIL_FOOLS_ANSWERS)
      : this.getRandomChoice(ASK_ANSWERS);
    return responseContent;
  }
}

export function getInstance() {
  return new Ask();
}
