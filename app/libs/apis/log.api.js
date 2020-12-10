import { API_URL } from '../../constants';
import { createSearchApi } from './fetch';

const API_ENDPOINT_URL = `${API_URL}/log`;

export function crudLog(url) {
  const searchEmail = createSearchApi(`${url}/emails`);
  return {
    searchEmail,
  };
}

const logApi = crudLog(API_ENDPOINT_URL);

export default logApi;
