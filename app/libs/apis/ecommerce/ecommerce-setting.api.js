import { createCRUDApi, fetchJSON, postJSON } from "../fetch";
import { API_URL } from "../../../constants";

const API_ENDPOINT_URL = `${API_URL}/ecommerce/configure`;

export const EcommerceSettingApi = {
  payment: { ...createCRUDApi(`${API_ENDPOINT_URL}/payment`) },
  getNotification: () => fetchJSON(`${API_ENDPOINT_URL}/notification`),
  saveNotification: form => postJSON(`${API_ENDPOINT_URL}/notification`, form),
};
