import { createCRUDApi, fetchJSON } from '../fetch';
import { API_URL } from '../../../constants';

const API_ENDPOINT_URL = `${API_URL}/product`;

const productApi = {
  ...createCRUDApi(API_ENDPOINT_URL),
  assets: id => fetchJSON(`${API_ENDPOINT_URL}/${id}/assets`),
};

export default productApi;
