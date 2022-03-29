import { createCRUDApi } from "../fetch";
import { API_URL } from "../../../constants";

const API_ENDPOINT_URL = `${API_URL}/tax-set`;

const taxSetApi = createCRUDApi(API_ENDPOINT_URL);

export default taxSetApi;
