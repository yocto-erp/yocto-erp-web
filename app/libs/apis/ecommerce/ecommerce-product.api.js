import { createCRUDApi } from "../fetch";
import { API_URL } from "../../../constants";

const API_ENDPOINT_URL = `${API_URL}/ecommerce/product`;

const EcommerceProductApi = createCRUDApi(API_ENDPOINT_URL);

export default EcommerceProductApi;
