import { ADMIN_PATH } from '../../../constants';

export const SURVEY_MANAGEMENT_ROOT_PATH = `${ADMIN_PATH}/survey-management`;

export const SURVEY_TYPE = {
  PUBLIC: 1,
  EMAIL_VERIFY: 2,
  SMS_VERIFY: 3,
};

export const SURVEY_TYPE_OPTION = [
  { id: 1, name: 'PUBLIC' },
  { id: 2, name: 'EMAIL VERIFY' },
  { id: 3, name: 'SMS VERIFY' },
];
