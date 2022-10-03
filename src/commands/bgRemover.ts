import { Command } from '../utils/commandsHandling/Command';
import { APIPayload } from '../types/APIParam';
import { TSMap } from 'typescript-map';
import { saveImage, removeBg, getEditedBase64 } from '../services/imageHandling/imageHandler';

class BackgroundRemover extends Command {
  removeBg(base64Image: string): string | boolean {
    saveImage(base64Image);
    const success = removeBg();
    if (!success) return false;
    return getEditedBase64();
  }

  getDefinition(): { name: string; params: TSMap<string, string> } {
    const paramMap = new TSMap<string, string>();
    paramMap.set('base64Image', 'Image as base64 string <string>');
    return { name: 'bgRemover', params: paramMap };
  }

  async getResContent(content: APIPayload): Promise<string> {
    if (!content.base64Image) throw Error('base64Image must not be empty');
    const responseContent = this.removeBg(content.base64Image);
    if (!responseContent) throw Error('Couldnt remove background from image :(');
    return typeof responseContent === 'string' ? responseContent : '';
  }
}

export function getInstance() {
  return new BackgroundRemover();
}
