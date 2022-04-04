import { ADMIN_PATH } from "../../constants";

export const STUDENT_ROOT_PATH = `${ADMIN_PATH}/student`;
export const STUDENT_CONFIGURATION_ROOT_PATH = `${STUDENT_ROOT_PATH}/configure`;

export const MAIN_CONTACT_TYPE = {
  MOTHER: 1,
  FATHER: 2,
};

export const STUDENT_STATUS = {
  PENDING: 1,
  ACTIVE: 2,
  LEAVE: 3,
};

export const studentStatusStr = id => {
  switch (id) {
    case STUDENT_STATUS.PENDING:
      return "PENDING";
    case STUDENT_STATUS.ACTIVE:
      return "ACTIVE";
    case STUDENT_STATUS.LEAVE:
      return "LEAVE";
    default:
      return id;
  }
};

export const STUDENT_STATUS_LIST = [
  {
    id: STUDENT_STATUS.PENDING,
    name: studentStatusStr(STUDENT_STATUS.PENDING),
  },
  { id: STUDENT_STATUS.ACTIVE, name: studentStatusStr(STUDENT_STATUS.ACTIVE) },
  { id: STUDENT_STATUS.LEAVE, name: studentStatusStr(STUDENT_STATUS.LEAVE) },
];
