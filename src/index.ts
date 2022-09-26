import express, { Request, Response } from 'express';
import { getCommandResponse, getValidCommands } from './utils/commandsHandling/getCommands';
import {
  handleInvalidBody,
  handleInvalidURLParams,
  isValidCommand,
} from './utils/paramHandler';

const app = express();
app.use(express.json());
const port = 6969;

app.get('/commands', (request: Request, response: Response) => {
  response.status(200);
  response.send({
    commandList: getValidCommands(),
  });
});

app.post('/:command', async (request: Request<{ command: string }>, response: Response) => {
  if (!isValidCommand(request)) {
    handleInvalidURLParams(request, response);
    return;
  }
  let cmdResponse;
  cmdResponse = await getCommandResponse(request, response);
  if (!cmdResponse) return;
  cmdResponse.command = request.params.command;
  console.log(
    `invoked ${request.params.command}-command with answer: ${JSON.stringify(cmdResponse)}`
  );
  response.status(200);
  response.send(cmdResponse);
});

app.listen(port, () => {
  console.log('started listening');
});
