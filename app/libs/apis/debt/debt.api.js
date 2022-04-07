import { createCRUDApi, fetchJSON } from "../fetch";
import { API_URL } from "../../../constants";

const API_ENDPOINT_URL = `${API_URL}/debt`;

const debtApi = {
  ...createCRUDApi(API_ENDPOINT_URL),
  common: () => fetchJSON(`${API_ENDPOINT_URL}/common`),
};

export default debtApi;
