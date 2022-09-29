import translate from '@vitalets/google-translate-api';
import { Command } from '../utils/commandsHandling/Command';
import { APIPayload } from '../types/APIParam';

class Translate extends Command {
  async translateTo(toTranslate: string, language: translate.IOptions): Promise<string> {
    const translatedText = await translate(toTranslate, language);
    return translatedText.text;
  }

  async getResContent(content: APIPayload): Promise<string> {
    if (!content.content) throw new Error('Invalid Input');
    if (!content.language) throw new Error('Invalid Input');
    return this.translateTo(content.content, { to: content.language });
  }
}

export function getInstance() {
  return new Translate();
}
