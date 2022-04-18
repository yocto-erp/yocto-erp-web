/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage component.
 */
import { defineMessages } from "react-intl";

export const scope = "containers.debt";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "Quản lý nợ",
  },
  listPageCommonHeader: {
    id: `${scope}.header`,
    defaultMessage: "Quản lý nợ",
  },
  tabCommon: {
    id: `${scope}.tabCommon`,
    defaultMessage: "Quản lý nợ",
  },
  tabDebt: {
    id: `${scope}.tabDebt`,
    defaultMessage: "Danh sách nợ chi tiết",
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
  debtType1: {
    id: `${scope}.debtType1`,
    defaultMessage: "Nợ cần thu",
  },
  debtType2: {
    id: `${scope}.debtType2`,
    defaultMessage: "Nợ phải trả",
  },
  debtType3: {
    id: `${scope}.debtType3`,
    defaultMessage: "Thu nợ",
  },
  debtType4: {
    id: `${scope}.debtType4`,
    defaultMessage: "Trả nợ",
  },
  btnAddDebt: {
    id: `${scope}.btnAddDebt`,
    defaultMessage: "Ghi nợ",
  },
  addDebtTitle: {
    id: `${scope}.addDebtTitle`,
    defaultMessage: "Tạo phiếu ghi nợ",
  },
  editDebtTitle: {
    id: `${scope}.editDebtTitle`,
    defaultMessage: "Cập nhập phiếu ghi nợ",
  },
  btnAddDebtPaid: {
    id: `${scope}.btnAddDebt`,
    defaultMessage: "Thanh toán nợ",
  },
  addDebtPaidTitle: {
    id: `${scope}.addDebtPaidTitle`,
    defaultMessage: "Tạo phiếu thanh toán nợ",
  },
  editDebtPaidTitle: {
    id: `${scope}.editDebtPaidTitle`,
    defaultMessage: "Cập nhập phiếu thanh toán nợ",
  },
});
