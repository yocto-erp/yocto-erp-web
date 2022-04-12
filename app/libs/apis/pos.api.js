import { createCRUDApi, fetchJSON, postJSON } from "./fetch";
import { API_URL } from "../../constants";

const API_ENDPOINT_URL = `${API_URL}/pos`;

const posApi = {
  ...createCRUDApi(API_ENDPOINT_URL),
  getUsers: posId => fetchJSON(`${API_ENDPOINT_URL}/${posId}/users`),
  assignUsers: (posId, users) =>
    postJSON(`${API_ENDPOINT_URL}/${posId}/users`, users),
  posOrder: (posId, form) =>
    postJSON(`${API_ENDPOINT_URL}/${posId}/order`, form),
  listPos: () => fetchJSON(`${API_ENDPOINT_URL}/list`),
};

export default posApi;
