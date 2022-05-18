import { createCRUDApi, postJSON } from "../fetch";
import { API_URL } from "../../../constants";

const API_ENDPOINT_URL = `${API_URL}/provider`;

export const providerApi = {
  ...createCRUDApi(API_ENDPOINT_URL),
  approve: (id, isApprove) =>
    postJSON(`${API_ENDPOINT_URL}/${id}/approve`, { approve: isApprove }),
};