import { ADMIN_PATH } from "../../constants";

export const DEBT_ROOT_PATH = `${ADMIN_PATH}/debt`;
export const DEBT_LIST_ROOT_PATH = `${DEBT_ROOT_PATH}/list`;
export const DEBT_COMMON_ROOT_PATH = `${DEBT_ROOT_PATH}/common`;

export const DEBT_DEBIT_ROOT_PATH = `${DEBT_ROOT_PATH}/debit`;
export const DEBT_PAID_ROOT_PATH = `${DEBT_ROOT_PATH}/paid`;

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
  RECEIVABLES: 1, // Khách hàng nợ
  TO_PAY_DEBT: 2, // Công ty nợ
  RECOVERY_PUBLIC_DEBT: 3, // Thu nợ khách hàng
  PAID_DEBT: 4, // Công ty trả nợ
};

export const DEBIT_TYPE = {
  RECEIVABLES: 1, // Khách hàng nợ
  TO_PAY_DEBT: 2, // Công ty nợ
};

export const debitTypeStr = id => {
  switch (id) {
    case DEBIT_TYPE.RECEIVABLES:
      return "RECEIVABLES";
    default:
      return "TO_PAY_DEBT";
  }
};
export const LIST_DEBIT_TYPE = [
  {
    id: DEBIT_TYPE.RECEIVABLES,
    name: debitTypeStr(DEBIT_TYPE.RECEIVABLES),
  },
  {
    id: DEBIT_TYPE.TO_PAY_DEBT,
    name: debitTypeStr(DEBIT_TYPE.TO_PAY_DEBT),
  },
];

export const PAID_TYPE = {
  RECOVERY_PUBLIC_DEBT: 3, // Thu nợ khách hàng
  PAID_DEBT: 4, // Công ty trả nợ
};

export const paidTypeStr = id => {
  switch (id) {
    case PAID_TYPE.RECOVERY_PUBLIC_DEBT:
      return "RECOVERY_PUBLIC_DEBT";
    default:
      return "PAID_DEBT";
  }
};
export const LIST_PAID_TYPE = [
  {
    id: PAID_TYPE.RECOVERY_PUBLIC_DEBT,
    name: paidTypeStr(PAID_TYPE.RECOVERY_PUBLIC_DEBT),
  },
  {
    id: PAID_TYPE.PAID_DEBT,
    name: paidTypeStr(PAID_TYPE.PAID_DEBT),
  },
];
