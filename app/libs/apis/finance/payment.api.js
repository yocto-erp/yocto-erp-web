import { createCRUDApi } from "../fetch";
import { API_URL } from "../../../constants";

const API_ENDPOINT_URL = `${API_URL}/finance/payment`;

export const PaymentApi = createCRUDApi(`${API_ENDPOINT_URL}`);
