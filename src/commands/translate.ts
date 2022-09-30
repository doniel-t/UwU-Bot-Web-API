import translate from '@vitalets/google-translate-api';
import { Command } from '../utils/commandsHandling/Command';
import { APIPayload } from '../types/APIParam';
import { TSMap } from 'typescript-map';

class Translate extends Command {
  async translateTo(toTranslate: string, language: translate.IOptions): Promise<string> {
    const translatedText = await translate(toTranslate, language);
    return translatedText.text;
  }

  getDefinition(): { name: string; params: TSMap<string, string> } {
    const paramMap = new TSMap<string, string>();
    paramMap.set('content', 'Content you want translated <string>');
    paramMap.set(
      'language',
      'Language you want the text to be translated <string, refer to https://www.w3schools.com/tags/ref_language_codes.asp>'
    );
    return { name: 'translate', params: paramMap };
  }

  async getResContent(content: APIPayload): Promise<string> {
    if (!content.content) throw new Error('content must not be empty');
    if (!content.language) throw new Error('language must not be empty');
    return this.translateTo(content.content, { to: content.language });
  }
}

export function getInstance() {
  return new Translate();
}
