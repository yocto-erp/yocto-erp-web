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
    defaultMessage: "Quản lý thông tin cá nhân",
  },
  listPageHeader: {
    id: `${scope}.listPageHeader`,
    defaultMessage: "Quản lý thông tin cá nhân",
  },
  listPageColFullname: {
    id: `${scope}.listPageColFullname`,
    defaultMessage: "Họ Tên",
  },
  listPageColGsm: {
    id: `${scope}.listPageColGsm`,
    defaultMessage: "Số điện thoại",
  },
  listPageColEmail: {
    id: `${scope}.listPageColEmail`,
    defaultMessage: "Email",
  },
  listPageColRemark: {
    id: `${scope}.listPageColRemark`,
    defaultMessage: "Chú thích",
  },
  listPageColCreatedBy: {
    id: `${scope}.listPageColCreatedBy`,
    defaultMessage: "Tạo bởi",
  },
  listPageColAction: {
    id: `${scope}.listPageColAction`,
    defaultMessage: "Thao tác",
  },
  filterSearchPlaceholder: {
    id: `${scope}.filterSearchPlaceholder`,
    defaultMessage: "Tìm theo tên, số điện thoai, email",
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
    id: `${scope}.createPageHeader`,
    defaultMessage: "Tạo thông tin đối tác",
  },
  updatePageHeader: {
    id: `${scope}.updatePageHeader`,
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
    id: `${scope}.formContactPerson`,
    defaultMessage: "Người liên hệ",
  },
});
