import { API_URL } from '../../../constants';
import { createSearchApi, fetchJSON, postJSON } from '../fetch';

const API_ENDPOINT_URL = `${API_URL}/survey`;

const surveyApi = {
  read: (id, language = '') =>
    fetchJSON(`${API_ENDPOINT_URL}/${id}?language=${language}`),
  readSurveyQuestion: id => fetchJSON(`${API_ENDPOINT_URL}/${id}/questions`),
  sendCode: (id, clientId, target) =>
    postJSON(`${API_ENDPOINT_URL}/${id}/code`, { id, clientId, target }),
  verify: (code, language = '') =>
    fetchJSON(`${API_ENDPOINT_URL}/${code}/join?language=${language}`),
  answerQuestion: (code, form) =>
    postJSON(`${API_ENDPOINT_URL}/${code}/answer`, form),
  readResult: (surveyId, target) =>
    fetchJSON(`${API_ENDPOINT_URL}/result/${surveyId}/${target}`),
  results: surveyId =>
    createSearchApi(() => `${API_ENDPOINT_URL}/${surveyId}/results`),
  questionSummary: (surveyId, questionId, search) =>
    postJSON(
      `${API_ENDPOINT_URL}/${surveyId}/question/${questionId}/summary`,
      search,
    ),
  personAnswer: surveyId =>
    createSearchApi(() => `${API_ENDPOINT_URL}/${surveyId}/person-answers`),
  summary: surveyId => fetchJSON(`${API_ENDPOINT_URL}/${surveyId}/summary`),
};

export default surveyApi;
