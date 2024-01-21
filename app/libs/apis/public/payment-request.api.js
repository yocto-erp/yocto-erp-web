import { fetchJSON } from "../fetch";
import { PUBLIC_API_URL } from "./constant";

const URL = `${PUBLIC_API_URL}/payment`;

export const PaymentRequestApi = {
  get: publicId => fetchJSON(`${URL}/${publicId}`),
};
