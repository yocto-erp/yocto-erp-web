import { API_URL } from '../../constants';
import { fetchJSON, postJSON } from './fetch';

export const login = ({ username, password }) =>
  postJSON(`${API_URL}/sign-in`, {
    username,
    password,
  });

export const getInfo = () => fetchJSON(`${API_URL}/information`);
