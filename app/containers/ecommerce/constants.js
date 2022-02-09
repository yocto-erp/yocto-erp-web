import { ADMIN_PATH } from "../../constants";

export const ECOMMERCE_ROOT_PATH = `${ADMIN_PATH}/ecommerce`;
export const ECOMMERCE_CONFIGURATION_ROOT_PATH = `${ECOMMERCE_ROOT_PATH}/configure`;
export const ECOMMERCE_PRODUCT_ROOT_PATH = `${ADMIN_PATH}/ecommerce/product`;
export const ECOMMERCE_POS_PATH = `${ADMIN_PATH}/ecommerce/pos`;

export const ECOMMERCE_PAYMENT_METHOD = {
  CASH: 1,
  BANK: 2,
};

export const ecommercePaymentMethodStr = id => {
  switch (id) {
    case ECOMMERCE_PAYMENT_METHOD.CASH:
      return "CASH";
    case ECOMMERCE_PAYMENT_METHOD.BANK:
      return "BANK";
    default:
      return "";
  }
};

export const ECOMMERCE_PAYMENT_METHOD_LIST = [
  {
    id: ECOMMERCE_PAYMENT_METHOD.CASH,
    name: ecommercePaymentMethodStr(ECOMMERCE_PAYMENT_METHOD.CASH),
  },
  {
    id: ECOMMERCE_PAYMENT_METHOD.BANK,
    name: ecommercePaymentMethodStr(ECOMMERCE_PAYMENT_METHOD.BANK),
  },
];
