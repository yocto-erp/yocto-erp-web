import { TOOL_ROOT_PATH } from '../constants';

export const MAIL_MERGE_ROOT_PATH = `${TOOL_ROOT_PATH}/mail-merge`;

export const MAIL_MERGE_ROW_STATE = {
  PENDING: 0,
  PROCESSING: 1,
  DONE: 2,
  FAIL: 3,
};
