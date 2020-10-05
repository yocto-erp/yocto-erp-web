import { API_URL } from '../../constants';
import { fetchJSON, postJSON } from './fetch';

export const login = ({ email, password }) =>
  postJSON(`${API_URL}/sign-in`, {
    email,
    password,
  });

export const registerUser = ({ displayName, email, password }) =>
  postJSON(`${API_URL}/register`, {
    displayName,
    email,
    password,
  });

export const verifyEmail = ({ email, token }) =>
  postJSON(`${API_URL}/email-verify`, {
    email,
    token,
  });

export const forgotPasswordSendMail = ({ email }) =>
  postJSON(`${API_URL}/forgot-password/send-mail`, {
    email,
  });

export const verifyToken = ({ token }) =>
  fetchJSON(`${API_URL}/forgot-password/verify-token/?token=${token}`);

export const resetPassword = ({ token, password, rePassword }) =>
  postJSON(`${API_URL}/forgot-password/reset`, {
    token,
    password,
    rePassword,
  });

export const createCompany = ({ name, gsm, address, remark }) =>
  postJSON(`${API_URL}/createCompanyOnboard`, {
    name,
    gsm,
    address,
    remark,
  });

export const getInfo = () => fetchJSON(`${API_URL}/information`);
