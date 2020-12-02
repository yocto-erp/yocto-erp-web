import { API_URL } from '../../../constants';
import { deleteRequest, fetchJSON, postJSON } from '../fetch';

const API_ENDPOINT_URL = `${API_URL}/survey-question-admin`;
const surveyQuestionAdminApi = {
  listQuestions: id => fetchJSON(`${API_ENDPOINT_URL}/${id}/questions`),
  read: id => fetchJSON(`${API_ENDPOINT_URL}/${id}`),
  create: form => postJSON(`${API_ENDPOINT_URL}`, form),
  update: (id, form) => postJSON(`${API_ENDPOINT_URL}/${id}`, form),
  remove: id => deleteRequest(`${API_ENDPOINT_URL}/${id}`),
};

export default surveyQuestionAdminApi;
