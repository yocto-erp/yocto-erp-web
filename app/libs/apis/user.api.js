import { API_URL } from '../../constants';
import { createCRUDApi } from './fetch';

const API_ENDPOINT_URL = `${API_URL}/user`;

const userApi = createCRUDApi(API_ENDPOINT_URL);

export default userApi;
