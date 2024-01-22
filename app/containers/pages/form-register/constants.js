import { ADMIN_PATH } from "../../../constants";

export const FORM_ROOT_PATH = `${ADMIN_PATH}/form`;

export const FormRegisterStatus = {
  REQUEST: 1,
  CONFIRMED: 2,
  PAID: 3,
  CANCEL: 4,
};

export const FORM_STATUS = {
  ACTIVE: 1,
  DISABLE: 2,
};
