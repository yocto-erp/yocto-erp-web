import React from "react";
import { FormattedMessage } from "react-intl";
import { FaUserTie } from "react-icons/fa";
import { ADMIN_PATH, PERMISSION } from "../../constants";
import messages from "./messages";

export const PROVIDER_ROOT_PATH = `${ADMIN_PATH}/provider`;

export const PROVIDER_STATUS = {
  PENDING: 1,
  PROCESSING: 2,
  DONE: 3,
  CANCEL: 4,
};

export const LIST_PROVIDER_STATUS = [
  {
    id: PROVIDER_STATUS.PENDING,
    color: "badge badge-mute",
  },
  {
    id: PROVIDER_STATUS.PROCESSING,
    color: "badge badge-warning",
  },
  {
    id: PROVIDER_STATUS.DONE,
    color: "badge badge-success",
  },
  {
    id: PROVIDER_STATUS.CANCEL,
    color: "badge badge-danger",
  },
];

export const PROVIDER_MENU_SETTING = {
  header: <FormattedMessage {...messages.menuTitle} />,
  link: "",
  iconName: "fa fa-shopping-basket",
  icon: <FaUserTie />,
  isHeader: true,
  index: "provider",
  permission: [PERMISSION.PROVIDER.READ],
  children: [
    {
      header: "Product",
      link: PROVIDER_ROOT_PATH,
      permission: PERMISSION.PROVIDER.READ,
      index: "provider.list",
    },
  ],
};
