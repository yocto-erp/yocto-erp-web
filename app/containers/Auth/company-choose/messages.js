import { defineMessages } from "react-intl";

export const scope = "app.containers.Onboard";

export default defineMessages({
  createCompanyButton: {
    id: `${scope}.button.createCompany`,
    defaultMessage: "Tạo công ty",
  },
  chooseCompany: {
    id: `${scope}.button.chooseCompany`,
    defaultMessage: "Chọn",
  },
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
