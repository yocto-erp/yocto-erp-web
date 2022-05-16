import { defineMessages } from "react-intl";

export const scope = "app.containers.user";

export default defineMessages({
  profilePageTitle: {
    id: `${scope}.profilePageTitle`,
    defaultMessage: "Thông tin cá nhân",
  },
  profilePageFormName: {
    id: `${scope}.profilePageFormName`,
    defaultMessage: "Họ và Tên",
  },
  profilePageFormPhone: {
    id: `${scope}.profilePageFormPhone`,
    defaultMessage: "Số điện thoại",
  },
  profilePageFormAddress: {
    id: `${scope}.profilePageFormAddress`,
    defaultMessage: "Địa chỉ",
  },
});
