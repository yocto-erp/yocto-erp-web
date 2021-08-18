import { API_URL } from '../../constants';
import noImage from '../../images/No_image_available.svg';

const API_ENDPOINT_URL = `${API_URL}/image`;
export const imageUrl = fileId => `${API_ENDPOINT_URL}/${fileId}`;
export const imagePath = filename =>
  filename ? `/public/${filename}` : noImage;
