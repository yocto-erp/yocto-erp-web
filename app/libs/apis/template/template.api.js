import { createCRUDApi } from '../fetch';
import { API_URL } from '../../../constants';

const API_ENDPOINT_URL = `${API_URL}/template`;

export const TEMPLATE_TYPE = {
  STUDENT_FEE: 1,
};

const templateApi = createCRUDApi(API_ENDPOINT_URL);

export default templateApi;
