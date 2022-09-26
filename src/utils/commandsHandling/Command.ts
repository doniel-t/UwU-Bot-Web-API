import { Response } from 'express';
import { APIPayload } from '../../types/APIParam';
import { APIResponse } from '../../types/APIResponse';

export abstract class Command {
  async getResContent(payload: APIPayload): Promise<any> {
    return 'not implemented';
  }

  async reply(content: APIPayload, response: Response): Promise<APIResponse | undefined> {
    try {
      var res = await this.getResContent(content);
    } catch (e) {
      console.error(e);
      response.status(400);
      response.send(
        'Invalid JSON Body, please refer to the docs https://github.com/doniel-t/UwU-Bot-Web-API and try again'
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
