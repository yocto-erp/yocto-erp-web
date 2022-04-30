/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage component.
 */
import { defineMessages } from "react-intl";

export const scope = "containers.cost";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "Quản lý thu chi",
  },
  listPageBtnCreatePayment: {
    id: `${scope}.listPageBtnCreatePayment`,
    defaultMessage: "Phiếu thu",
  },
  listPageBtnCreateReceipt: {
    id: `${scope}.listPageBtnCreateReceipt`,
    defaultMessage: "Phiếu chi",
  },
  listPageFilterName: {
    id: `${scope}.listPageFilterName`,
    defaultMessage: "Tìm theo tên",
  },
  listPageFilterPartner: {
    id: `${scope}.listPageFilterPartner`,
    defaultMessage: "Chọn đối tác",
  },
  listPageFilterFromDate: {
    id: `${scope}.listPageFilterFromDate`,
    defaultMessage: "Ngày bắt đầu",
  },
  listPageFilterToDate: {
    id: `${scope}.listPageFilterToDate`,
    defaultMessage: "Ngày kết thúc",
  },
  listPageName: {
    id: `${scope}.listPageName`,
    defaultMessage: "Tên phiếu",
  },
  listPageType: {
    id: `${scope}.listPageType`,
    defaultMessage: "Loại phiếu",
  },
  listPagePartner: {
    id: `${scope}.listPagePartner`,
    defaultMessage: "Đối tác",
  },
  listPageAmount: {
    id: `${scope}.listPageAmount`,
    defaultMessage: "Số tiền",
  },
  listPagePaymentMethod: {
    id: `${scope}.listPagePaymentMethod`,
    defaultMessage: "Kênh thanh toán",
  },
  listPageRemark: {
    id: `${scope}.listPageRemark`,
    defaultMessage: "Chú thích",
  },
  costType1: {
    id: `${scope}.costType1`,
    defaultMessage: "Phiếu thu",
  },
  costType2: {
    id: `${scope}.costType2`,
    defaultMessage: "Phiếu chi",
  },
});
