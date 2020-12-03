import { createCRUDApi } from './fetch';
import { API_URL } from '../../constants';

export const GENDER = {
  MALE: 0,
  FEMALE: 1,
  OTHER: 2,
};

export const genderStr = value => {
  switch (value) {
    case GENDER.FEMALE:
      return 'FEMALE';
    case GENDER.MALE:
      return 'MALE';
    default:
      return 'OTHER';
  }
};

const API_ENDPOINT_URL = `${API_URL}/person`;

const personApi = createCRUDApi(API_ENDPOINT_URL);

export default personApi;
