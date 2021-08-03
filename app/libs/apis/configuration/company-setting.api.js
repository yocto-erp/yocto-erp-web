import { API_URL } from '../../../constants';
import { fetchJSON, postJSON } from '../fetch';

const API_ENDPOINT_URL = `${API_URL}/configuration/company`;

export const CompanySettingApi = {
  get: () => fetchJSON(`${API_ENDPOINT_URL}`),
  save: form => postJSON(API_ENDPOINT_URL, form),
};
