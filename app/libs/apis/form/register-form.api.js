import { createCRUDApi } from "../fetch";
import { API_URL } from "../../../constants";

const API_ENDPOINT_URL = `${API_URL}/form/register`;

const registerFormApi = createCRUDApi(API_ENDPOINT_URL);

export default registerFormApi;
