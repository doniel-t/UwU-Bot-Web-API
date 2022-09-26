import { Command } from './Command';
import requireDir from 'require-dir';
import { Request, Response } from 'express';
import { APIPayload } from '../../types/APIParam';

function getCommand(key: string): Command {
  const commands = requireDir('../../commands');
  const command = commands[key];
  if (!command) throw Error('No command with this key was found!');
  return command.getInstance();
}

export async function getCommandResponse(request: Request, response: Response): Promise<any> {
  const command = getCommand(request.params.command);
  const reqJSON: { payload: APIPayload } = request.body;
  const reply = await command.reply(reqJSON.payload, response);
  return reply;
}

export function getCommandNames(): string[] {
  return Object.keys(requireDir('../../commands'));
}

export function getValidCommands(): string {
  const commandNames = getCommandNames();
  return commandNames.reduce((prev: string, cur: string): string => {
    prev += `, ${cur}`;
    return prev;
  });
}
