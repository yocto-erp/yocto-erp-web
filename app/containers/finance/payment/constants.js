import { FINANCE_ROOT_PATH } from "../constants";

export const PAYMENT_ROOT_PATH = `${FINANCE_ROOT_PATH}/payment`;

export const PAYMENT_METHOD = {
  CASH: 1,
  BANK: 2,
};

export const ecommercePaymentMethodStr = id => {
  switch (id) {
    case PAYMENT_METHOD.CASH:
      return "CASH";
    case PAYMENT_METHOD.BANK:
      return "BANK";
    default:
      return "";
  }
};

export const LIST_PAYMENT_METHOD = [
  {
    id: PAYMENT_METHOD.CASH,
    name: ecommercePaymentMethodStr(PAYMENT_METHOD.CASH),
  },
  {
    id: PAYMENT_METHOD.BANK,
    name: ecommercePaymentMethodStr(PAYMENT_METHOD.BANK),
  },
];