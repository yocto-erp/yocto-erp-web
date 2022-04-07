import { ADMIN_PATH } from "../../constants";

export const DEBT_ROOT_PATH = `${ADMIN_PATH}/debt`;
export const DEBT_LIST_ROOT_PATH = `${DEBT_ROOT_PATH}/list`;
export const DEBT_COMMON_ROOT_PATH = `${DEBT_ROOT_PATH}/common`;

export const DEBT_DEBIT_ROOT_PATH = `${DEBT_LIST_ROOT_PATH}/debit`;
export const DEBT_PAY_ROOT_PATH = `${DEBT_LIST_ROOT_PATH}/pay`;

export const DEBT_PURPOSE_TYPE = {
  SALE: 1,
  PURCHASE: 2,
  STUDENT_FEE: 3,
  OTHER: 100,
};

export const debtPurposeTypeStr = id => {
  switch (id) {
    case DEBT_PURPOSE_TYPE.SALE:
      return "SALE";
    case DEBT_PURPOSE_TYPE.PURCHASE:
      return "PURCHASE";
    case DEBT_PURPOSE_TYPE.STUDENT_FEE:
      return "STUDENT_FEE";
    default:
      return "OTHER";
  }
};

export const LIST_DEBT_PURPOSE_TYPE = [
  {
    id: DEBT_PURPOSE_TYPE.SALE,
    name: debtPurposeTypeStr(DEBT_PURPOSE_TYPE.SALE),
  },
  {
    id: DEBT_PURPOSE_TYPE.PURCHASE,
    name: debtPurposeTypeStr(DEBT_PURPOSE_TYPE.PURCHASE),
  },
  {
    id: DEBT_PURPOSE_TYPE.STUDENT_FEE,
    name: debtPurposeTypeStr(DEBT_PURPOSE_TYPE.STUDENT_FEE),
  },
  {
    id: DEBT_PURPOSE_TYPE.OTHER,
    name: debtPurposeTypeStr(DEBT_PURPOSE_TYPE.OTHER),
  },
];

export const DEBT_TYPE = {
  DEBIT: 1,
  PAY: 2,
};
