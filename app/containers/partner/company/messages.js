/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage component.
 */
import { defineMessages } from "react-intl";

export const scope = "containers.partner.person";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "Thông tin đối tác",
  },
  listPageHeader: {
    id: `${scope}.header`,
    defaultMessage: "Quản lý đối tác",
  },
  listPageType2: {
    id: `${scope}.listPageTypeCOMPANY`,
    defaultMessage: "Công ty",
  },
  listPageType1: {
    id: `${scope}.listPageTypePERSONAL`,
    defaultMessage: "Cá nhân",
  },
  createPageHeader: {
    id: `${scope}.header`,
    defaultMessage: "Tạo thông tin đối tác",
  },
  updatePageHeader: {
    id: `${scope}.header`,
    defaultMessage: "Cập nhập thông tin đối tác",
  },
  formCompanyLabel: {
    id: `${scope}.formCompanyName`,
    defaultMessage: "Chọn công ty",
  },
  formPersonLabel: {
    id: `${scope}.formFullName`,
    defaultMessage: "Chọn cá nhân",
  },
  formGenderMALE: {
    id: `${scope}.formGenderMALE`,
    defaultMessage: "Anh",
  },
  formGenderFEMALE: {
    id: `${scope}.formGenderFEMALE`,
    defaultMessage: "Chị",
  },
  formGenderSelectDefault: {
    id: `${scope}.formGender`,
    defaultMessage: "Chọn Giới tính",
  },
  formRemark: {
    id: `${scope}.formRemark`,
    defaultMessage: "Mô tả",
  },
  formContactPerson: {
    id: `${scope}.formRemark`,
    defaultMessage: "Người liên hệ",
  },
});
