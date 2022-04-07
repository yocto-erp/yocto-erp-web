import React from "react";
import { FormattedMessage } from "react-intl";
import { ADMIN_PATH, PERMISSION } from "../../constants";
import { TEMPLATE_EMAIL_ROOT_PATH } from "../template/constants";
import messages from "./messages";

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

export const ECOMMERCE_MENU_SETTING = {
  header: <FormattedMessage {...messages.menuEcommerceTitle} />,
  link: "",
  iconName: "fa fa-shopping-basket",
  isHeader: true,
  index: "ecommerce",
  permission: PERMISSION.TEMPLATE.READ,
  children: [
    {
      header: "Product",
      link: ECOMMERCE_PRODUCT_ROOT_PATH,
      permission: PERMISSION.ECOMMERCE.PRODUCT.READ,
      index: "ecommerce.product",
    },
    {
      header: "Order",
      link: TEMPLATE_EMAIL_ROOT_PATH,
      permission: PERMISSION.ECOMMERCE.ORDER.READ,
      index: "ecommerce.order",
    },
    {
      header: "Setting",
      link: ECOMMERCE_CONFIGURATION_ROOT_PATH,
      index: "ecommerce.setting",
    },
  ],
};
