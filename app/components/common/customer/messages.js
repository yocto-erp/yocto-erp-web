import { defineMessages } from "react-intl";

export const scope = "app.components.common.customer";

export default defineMessages({
  modalTitle: {
    id: `${scope}.modalTitle`,
    defaultMessage: "Thông tin cá nhân",
  },
  formFullName: {
    id: `${scope}.formFullName`,
    defaultMessage: "Họ và Tên",
  },
  formFirstName: {
    id: `${scope}.formFirstName`,
    defaultMessage: "Họ",
  },
  formLastName: {
    id: `${scope}.formLastName`,
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
  formGender: {
    id: `${scope}.formGender`,
    defaultMessage: "Giới tính",
  },
  formGenderSelectDefault: {
    id: `${scope}.formGenderSelectDefault`,
    defaultMessage: "Chọn chức danh",
  },
  formGender0: {
    id: `${scope}.formGenderMALE`,
    defaultMessage: "Anh",
  },
  formGender1: {
    id: `${scope}.formGenderFEMALE`,
    defaultMessage: "Chị",
  },
  formRemark: {
    id: `${scope}.formRemark`,
    defaultMessage: "Mô tả",
  },
});
