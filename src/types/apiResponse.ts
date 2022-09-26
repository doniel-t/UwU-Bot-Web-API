import { APIPayload } from './APIParam';

export type APIResponse = {
  command: string;
  input: APIPayload;
  response?: string;
  imageBase64?: string;
};
