import { API_URL } from '../../constants';
import { fetchJSON, postJSON } from './fetch';

const API_ENDPOINT_URL = `${API_URL}/survey`;
const surveyApi = {
  read: id => fetchJSON(`${API_ENDPOINT_URL}/${id}`),
  readSurveyQuestion: id => fetchJSON(`${API_ENDPOINT_URL}/${id}/questions`),
  sendCode: (id, clientId, target) =>
    postJSON(`${API_ENDPOINT_URL}/${id}/code`, { id, clientId, target }),
  verify: code => fetchJSON(`${API_ENDPOINT_URL}/${code}/join`),
  answerQuestion: (code, form) =>
    postJSON(`${API_ENDPOINT_URL}/${code}/answer`, form),
};

export default surveyApi;