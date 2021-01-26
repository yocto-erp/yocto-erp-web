import { API_URL } from '../../constants';
import { createSearchApi } from './fetch';

const API_ENDPOINT_URL = `${API_URL}/audit`;

export const auditApi = {
  search: createSearchApi(API_ENDPOINT_URL),
};
