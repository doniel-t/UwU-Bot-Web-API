import { APIPayload } from './apiParam';

export type APIResponse = {
  command: string;
  input: APIPayload;
  response?: string;
  imageBase64?: string;
};
