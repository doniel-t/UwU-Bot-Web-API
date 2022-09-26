import { Command } from '../utils/commandsHandling/Command';
import { APIPayload } from '../types/APIParam';
import * as Tesseract from 'tesseract.js';

class TextFromImageExtractor extends Command {
  async getTextFromURL(url: string): Promise<string> {
    const res = await Tesseract.recognize(url);
    return res.data.text;
  }

  async getResContent(content: APIPayload): Promise<string> {
    if (!content.imageURL) throw Error('Invalid Input');
    const imageText = await this.getTextFromURL(content.imageURL);
    return imageText;
  }
}

export function getInstance() {
  return new TextFromImageExtractor();
}
