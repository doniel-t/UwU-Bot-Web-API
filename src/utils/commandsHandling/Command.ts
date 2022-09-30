import { Response } from 'express';
import { APIPayload } from '../../types/APIParam';
import { APIResponse } from '../../types/APIResponse';
import { TSMap } from 'typescript-map';

export abstract class Command {
  async getResContent(payload: APIPayload): Promise<any> {
    return 'not implemented';
  }

  getDefinition(): { name: string; params: TSMap<string, string> } {
    return {
      name: 'not implemented',
      params: new TSMap<string, string>(),
    };
  }

  async reply(content: APIPayload, response: Response): Promise<APIResponse | undefined> {
    try {
      var res = await this.getResContent(content);
    } catch (e: any) {
      console.error(e);
      response.status(400);
      response.send(
        `${e.message}\n Invalid JSON Body, please refer to the docs https://github.com/doniel-t/UwU-Bot-Web-API and try again`
      );
      return;
    }
    return Promise.resolve({
      command: '',
      input: content,
      response: res,
    });
  }
}
