import { createCRUDApi } from './fetch';
import { API_URL } from '../../constants';

const API_ENDPOINT_URL = `${API_URL}/inventory`;

const inventoryApi = createCRUDApi(API_ENDPOINT_URL);

export default inventoryApi;
