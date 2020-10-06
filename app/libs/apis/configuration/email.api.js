import { fetchJSON, postJSON } from '../fetch';
import { API_URL } from '../../../constants';

const API_ENDPOINT_URL = `${API_URL}/configuration/email`;

const emailConfigurationApi = {
  get: () => fetchJSON(API_ENDPOINT_URL),
  save: form => postJSON(API_ENDPOINT_URL, form),
  test: (configuration, email) =>
    postJSON(`${API_ENDPOINT_URL}/test`, {
      configuration,
      email,
    }),
};

export default emailConfigurationApi;
