import { ADMIN_PATH } from "../../constants";

export const LOG_ROOT_PATH = `${ADMIN_PATH}/log`;
export const LOG_EMAIL_ROOT_PATH = `${LOG_ROOT_PATH}/email`;
export const EMAIL_STATUS = {
  PENDING: 0,
  SUCCESS: 1,
  FAIL: 2,
};
