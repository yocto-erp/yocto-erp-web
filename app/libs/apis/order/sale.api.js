import { createCRUDApi, fetchJSON, postJSON } from "../fetch";
import { API_URL } from "../../../constants";

const API_ENDPOINT_URL = `${API_URL}/sale`;

const saleApi = {
  ...createCRUDApi(API_ENDPOINT_URL),
  getConfigure: () => fetchJSON(`${API_ENDPOINT_URL}/configure`),
  saveConfigure: form => postJSON(`${API_ENDPOINT_URL}/configure`, form),
};

export default saleApi;
