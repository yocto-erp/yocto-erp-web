import { createCRUDApi } from "./fetch";
import { API_URL } from "../../constants";

export const GENDER = {
  MALE: 0,
  FEMALE: 1,
  OTHER: 2,
};

export const genderStr = value => {
  switch (value) {
    case GENDER.FEMALE:
      return "FEMALE";
    case GENDER.MALE:
      return "MALE";
    default:
      return "OTHER";
  }
};

export const LIST_GENDER = [
  { id: GENDER.MALE, name: genderStr(GENDER.MALE) },
  { id: GENDER.FEMALE, name: genderStr(GENDER.FEMALE) },
];

export function mappingPerson(val) {
  if (val) {
    return {
      id: val.id,
      name: val.name,
      firstName: val.firstName,
      lastName: val.lastName,
      gsm: val.gsm,
      email: val.email,
      address: val.address,
    };
  }

  return null;
}

const API_ENDPOINT_URL = `${API_URL}/person`;

const personApi = createCRUDApi(API_ENDPOINT_URL);

export default personApi;
