import { API_URL } from '../../constants';
import { postJSON } from './fetch';

const API_ENDPOINT_URL = `${API_URL}/email`;
export const emailApi = {
  send: messages => postJSON(API_ENDPOINT_URL, messages),
};
