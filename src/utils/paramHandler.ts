import { Request, Response } from 'express';
import { getCommandNames, getValidCommands } from './commandsHandling/getCommands';

export function handleInvalidURLParams(
  request: Request<{ command: string }>,
  response: Response
) {
  if (!isValidCommand(request)) {
    console.log('No matching command is found in Request URL');
    response.status(400);
    response.send({
      reason: `accessable commands are ${getValidCommands()}`,
    });
  }
}

export function handleInvalidBody(response: Response): void {
  response.status(400);
  response.send({
    reason:
      'invalid Body in Request, please refer to the docs and send a payload which is suitable for the command that you are trying to invoke',
  });
}

export function isValidCommand(request: Request<{ command: string }>): boolean {
  return getCommandNames().includes(request.params.command);
}
