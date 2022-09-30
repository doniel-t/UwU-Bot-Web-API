import { Command } from './Command';
import requireDir from 'require-dir';
import { Request, Response } from 'express';
import { APIPayload } from '../../types/APIParam';
import { TSMap } from 'typescript-map';

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

function getCommands(): Command[] {
  let commands: Command[] = [];
  const cmdNames = getCommandNames();
  cmdNames.forEach((cmdName: string) => {
    commands.push(getCommand(cmdName));
  });
  return commands;
}

function tsMapToJSONString(map: TSMap<string, string>): string {
  return JSON.stringify(map.toJSON());
}

export function commandToJSONString(): string {
  let cmdString = '';
  const commands = getCommands();
  commands.forEach((command: Command, index: number) => {
    const cmdDefinition = command.getDefinition();
    if (index === commands.length - 1) {
      cmdString += `"${cmdDefinition.name}": ${tsMapToJSONString(cmdDefinition.params)}`;
      return;
    }
    cmdString += `"${cmdDefinition.name}": ${tsMapToJSONString(cmdDefinition.params)},`;
  });
  return `{${cmdString}}`;
}

export function getValidCommands(): string {
  const commandNames = getCommandNames();
  return commandNames.reduce((prev: string, cur: string): string => {
    prev += `, ${cur}`;
    return prev;
  });
}
