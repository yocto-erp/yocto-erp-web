import { API_URL } from '../../../constants';
import { postJSON } from '../fetch';

const API_ENDPOINT_URL = `${API_URL}/product`;

export function crudProductUnit(url) {
  const update = (id, form) => postJSON(`${url}/${id}/units`, form);
  return {
    update,
  };
}

const productUnitApi = crudProductUnit(API_ENDPOINT_URL);

export default productUnitApi;
