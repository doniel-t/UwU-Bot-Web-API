import { Command } from '../utils/commandsHandling/Command';
import { APIPayload } from '../types/APIParam';
import * as Tesseract from 'tesseract.js';
import { TSMap } from 'typescript-map';

class TextFromImageExtractor extends Command {
  async getTextFromURL(url: string): Promise<string> {
    const res = await Tesseract.recognize(url);
    return res.data.text;
  }

  getDefinition(): { name: string; params: TSMap<string, string> } {
    const paramMap = new TSMap<string, string>();
    paramMap.set('imageURL', 'URL of the Image you want text extracted from <string>');
    return { name: 'textFromImageExtractor', params: paramMap };
  }

  async getResContent(content: APIPayload): Promise<string> {
    if (!content.imageURL) throw Error('imageURL must not be empty');
    const imageText = await this.getTextFromURL(content.imageURL);
    return imageText;
  }
}

export function getInstance() {
  return new TextFromImageExtractor();
}
