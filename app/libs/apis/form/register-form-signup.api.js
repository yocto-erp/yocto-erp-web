import { createCRUDApi } from "../fetch";
import { API_URL } from "../../../constants";

const API_ENDPOINT_URL = `${API_URL}/form/registered`;

const registerFormSignupApi = createCRUDApi(API_ENDPOINT_URL);

export default registerFormSignupApi;
