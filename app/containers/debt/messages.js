import { defineMessages } from "react-intl";

export const scope = "app.page.debt";

export const debtMessages = defineMessages({
  title: {
    id: `${scope}.listPage.title`,
    defaultMessage: "Common",
  },
  debtTitle: {
    id: `${scope}.listPage.title`,
    defaultMessage: "Chi tiết công nợ",
  },
  btnCreateGoodReceipt: {
    id: `${scope}.listPage.btn.goodReceipt`,
    defaultMessage: "Phiếu nhập kho",
  },
  btnCreateGoodIssue: {
    id: `${scope}.listPage.btn.goodIssue`,
    defaultMessage: "Phiếu xuất kho",
  },
});
