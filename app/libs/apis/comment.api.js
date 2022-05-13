import { createSearchApi, deleteRequest, fetchJSON, postJSON } from "./fetch";
import { API_URL } from "../../constants";

const API_ENDPOINT_URL = `${API_URL}/comment`;

export const commentApi = {
  create: (purpose, relativeId, form) =>
    postJSON(`${API_ENDPOINT_URL}/${purpose}/${relativeId}`, form),
  search: (purpose, relativeId) =>
    createSearchApi(`${API_ENDPOINT_URL}/${purpose}/${relativeId}`),
  read: (purpose, relativeId, id) =>
    fetchJSON(`${API_ENDPOINT_URL}/${purpose}/${relativeId}/${id}`),
  remove: (purpose, relativeId, id) =>
    deleteRequest(`${API_ENDPOINT_URL}/${purpose}/${relativeId}/${id}`),
};
