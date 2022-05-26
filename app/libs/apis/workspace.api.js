import { createCRUDApi } from "./fetch";
import { API_URL } from "../../constants";

const API_ENDPOINT_URL = `${API_URL}/workspace`;

export const workspaceApi = createCRUDApi(API_ENDPOINT_URL);
