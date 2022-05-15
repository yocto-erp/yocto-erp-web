import React from "react";
import { FormattedMessage } from "react-intl";
import { ADMIN_PATH } from "../../constants";
import { TEMPLATE_EMAIL_ROOT_PATH } from "../template/constants";
import messages from "./messages";
import { SALE_CONFIGURE_PATH } from "../sale/constants";
import { PERMISSION } from "../../components/Acl/constants";

export const ECOMMERCE_ROOT_PATH = `${ADMIN_PATH}/ecommerce`;
export const ECOMMERCE_CONFIGURATION_ROOT_PATH = `${ECOMMERCE_ROOT_PATH}/configure`;
export const ECOMMERCE_PRODUCT_ROOT_PATH = `${ADMIN_PATH}/ecommerce/product`;

export const SALE_MENU_SETTING = {
  header: <FormattedMessage {...messages.menuEcommerceTitle} />,
  link: "",
  iconName: "fa fa-shopping-basket",
  isHeader: true,
  index: "sale",
  permission: [
    PERMISSION.ECOMMERCE.PRODUCT.READ,
    PERMISSION.ECOMMERCE.ORDER.READ,
    PERMISSION.ECOMMERCE.SETTING,
  ],
  children: [
    {
      header: "Product",
      link: ECOMMERCE_PRODUCT_ROOT_PATH,
      permission: PERMISSION.ECOMMERCE.PRODUCT.READ,
      index: "sale.product",
    },
    {
      header: "Order",
      link: TEMPLATE_EMAIL_ROOT_PATH,
      permission: PERMISSION.ECOMMERCE.ORDER.READ,
      index: "sale.order",
    },
    {
      header: "Setting",
      link: SALE_CONFIGURE_PATH,
      index: "sale.setting",
    },
  ],
};
