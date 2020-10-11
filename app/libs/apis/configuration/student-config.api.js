import { fetchJSON, postJSON } from '../fetch';
import { API_URL } from '../../../constants';

const API_ENDPOINT_URL = `${API_URL}/configuration/student`;

const studentConfigurationApi = {
  get: () => fetchJSON(API_ENDPOINT_URL),
  save: form => postJSON(API_ENDPOINT_URL, form),
};

export default studentConfigurationApi;
