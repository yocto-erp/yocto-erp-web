import { defineMessages } from "react-intl";

export const scope = "app.components.common.company";

export default defineMessages({
  modalTitle: {
    id: `${scope}.modalTitle`,
    defaultMessage: "Thông tin công ty",
  },
  formName: {
    id: `${scope}.formName`,
    defaultMessage: "Tên",
  },
  formGSM: {
    id: `${scope}.formGSM`,
    defaultMessage: "Số điện thoại",
  },
  formEmail: {
    id: `${scope}.formEmail`,
    defaultMessage: "Email",
  },
  formAddress: {
    id: `${scope}.formAddress`,
    defaultMessage: "Địa chỉ",
  },
  formRemark: {
    id: `${scope}.formRemark`,
    defaultMessage: "Mô tả",
  },
});
