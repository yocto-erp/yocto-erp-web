import { fetchJSON, postJSON } from "../fetch";
import { PUBLIC_API_URL } from "../public/constant";

const URL = `${PUBLIC_API_URL}/form`;
export const FormPublicApi = {
  get: publicId => fetchJSON(`${URL}/${publicId}`),
  register: (publicId, formData) => postJSON(`${URL}/${publicId}`, formData),
};
