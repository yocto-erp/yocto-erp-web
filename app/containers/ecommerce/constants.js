import { ADMIN_PATH } from '../../constants';

export const ECOMMERCE_ROOT_PATH = `${ADMIN_PATH}/ecommerce`;
export const ECOMMERCE_CONFIGURATION_ROOT_PATH = `${ECOMMERCE_ROOT_PATH}/configure`;
export const ECOMMERCE_PRODUCT_ROOT_PATH = `${ADMIN_PATH}/ecommerce/product`;

export const ECOMMERCE_PAYMENT_METHOD = {
  DIRECT_TRANSFER: 1,
};

export const ecommercePaymentMethodStr = id => {
  switch (id) {
    case ECOMMERCE_PAYMENT_METHOD.DIRECT_TRANSFER:
      return 'Direct Transfer';
    default:
      return '';
  }
};

export const ECOMMERCE_PAYMENT_METHOD_LIST = [
  {
    id: ECOMMERCE_PAYMENT_METHOD.DIRECT_TRANSFER,
    name: ecommercePaymentMethodStr(ECOMMERCE_PAYMENT_METHOD.DIRECT_TRANSFER),
  },
];
