import { API_URL } from '../../constants';
import { fetchJSON, postJSON } from './fetch';

const API_ENDPOINT_URL = `${API_URL}/survey`;
const surveyApi = {
  read: id => fetchJSON(`${API_ENDPOINT_URL}/${id}`),
  readSurveyQuestion: id => fetchJSON(`${API_ENDPOINT_URL}/${id}/questions`),
  sendCode: (id, clientId, target) =>
    postJSON(`${API_ENDPOINT_URL}/${id}/code`, { id, clientId, target }),
  verify: (id, clientId, target, code) =>
    postJSON(`${API_ENDPOINT_URL}/${id}/verify`, {
      id,
      clientId,
      target,
      code,
    }),
};

export default surveyApi;
