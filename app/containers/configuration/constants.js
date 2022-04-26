import { ADMIN_PATH } from "../../constants";

export const EMAIL_PROVIDER = {
  SMTP: "SMTP",
  MAILGUN: "MAILGUN",
};

export const CONFIGURATION_ROOT_PATH = `${ADMIN_PATH}/configuration`;
export const CONFIGURATION_EMAIL_ROOT_PATH = `${CONFIGURATION_ROOT_PATH}/email`;
export const CONFIGURATION_COMPANY_ROOT_PATH = `${CONFIGURATION_ROOT_PATH}/company`;
