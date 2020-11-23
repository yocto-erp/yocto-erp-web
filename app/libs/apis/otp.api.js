import { API_URL } from '../../constants';
import { postJSON } from './fetch';

const API_ENDPOINT_URL = `${API_URL}/otp`;

export const OTP_TARGET_TYPE = {
  EMAIL: 1,
  SMS: 2,
};

const otpApi = {
  sendCode: (clientId, target, type) =>
    postJSON(`${API_ENDPOINT_URL}/code`, { clientId, target, type }),
  verify: (clientId, target, code, type) =>
    postJSON(`${API_ENDPOINT_URL}/verify`, {
      clientId,
      target,
      code,
      type,
    }),
};

export default otpApi;
