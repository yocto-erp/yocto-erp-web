import { API_URL } from '../../../constants';
import { fetchJSON } from '../fetch';

const API_ENDPOINT_URL = `${API_URL}/survey-question-admin`;
const surveyQuestionAdminApi = {
  read: id => fetchJSON(`${API_ENDPOINT_URL}/${id}`),
};

export default surveyQuestionAdminApi;
