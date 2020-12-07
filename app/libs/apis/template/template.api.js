import { createCRUDApi } from '../fetch';
import { API_URL } from '../../../constants';

const API_ENDPOINT_URL = `${API_URL}/template`;
const API_EMAIL_ENDPOINT_URL = `${API_URL}/email-template`;

export const templateApi = createCRUDApi(API_ENDPOINT_URL);

export const templateEmailApi = createCRUDApi(API_EMAIL_ENDPOINT_URL);
