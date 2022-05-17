import { API_URL } from "../../constants";
import { fetchJSON, postFormData } from "./fetch";

const API_ENDPOINT_URL = `${API_URL}/member`;

function updateProfile(form) {
  const { fullName, phone, avatar, isUpdateAvatar, address } = form;
  const formData = new FormData();
  formData.append("fullName", fullName);
  formData.append("phone", phone);
  formData.append("address", address);
  formData.append("isUpdateAvatar", String(isUpdateAvatar ? 1 : 0));
  if (avatar) {
    formData.append("avatar", avatar);
  }

  return postFormData(`${API_ENDPOINT_URL}/profile`, formData);
}

export const memberApi = {
  getProfile: () => fetchJSON(`${API_ENDPOINT_URL}/profile`),
  updateProfile,
  getShop: () => fetchJSON(`${API_ENDPOINT_URL}/shop`),
};
