import { API_URL } from '../../constants';
import { createCRUDApi, fetchJSON, postJSON } from './fetch';

const API_ENDPOINT_URL = `${API_URL}/user`;

export const USER_INVITE_STATUS = {
  INVITED: 1,
  CONFIRMED: 2,
};

const userApi = {
  ...createCRUDApi(API_ENDPOINT_URL),
  verifyInvitation: (email, token, companyId) =>
    fetchJSON(
      `${API_ENDPOINT_URL}/invite/verify?email=${email}&token=${token}&companyId=${companyId}`,
    ),
  confirmInvitation: form =>
    postJSON(`${API_ENDPOINT_URL}/invite/verify`, form),
};

export default userApi;
