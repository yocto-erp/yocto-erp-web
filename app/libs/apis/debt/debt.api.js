import { createCRUDApi, createSearchApi } from "../fetch";
import { API_URL } from "../../../constants";

const API_ENDPOINT_URL = `${API_URL}/debt`;

const debtApi = {
  ...createCRUDApi(API_ENDPOINT_URL),
  common: () => createSearchApi(() => `${API_ENDPOINT_URL}/common`),
};

export default debtApi;
