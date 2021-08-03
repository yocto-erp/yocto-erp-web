import { API_URL } from '../../constants';

const API_ENDPOINT_URL = `${API_URL}/image`;
export const imageUrl = fileId => `${API_ENDPOINT_URL}/${fileId}`;
export const imagePath = filename => `/public/${filename}`;
