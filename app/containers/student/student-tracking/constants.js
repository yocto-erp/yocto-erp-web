import { STUDENT_ROOT_PATH } from "../constants";

export const STUDENT_TRACKING_ROOT_PATH = `${STUDENT_ROOT_PATH}/student-tracking`;

export const STUDENT_DAILY_STATUS = {
  PRESENT: 1,
  ABSENT: 2,
};

export const LIST_STUDENT_DAILY_STATUS = [
  { id: STUDENT_DAILY_STATUS.PRESENT },
  { id: STUDENT_DAILY_STATUS.ABSENT },
];
