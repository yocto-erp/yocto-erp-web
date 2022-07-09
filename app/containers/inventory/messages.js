import { defineMessages } from "react-intl";

export const scope = "app.page.inventory";

export const inventoryMessages = defineMessages({
  title: {
    id: `${scope}.listPage.title`,
    defaultMessage: "Nhập xuất kho",
  },
  inventoryTitle: {
    id: `${scope}.listPage.inventoryTitle`,
    defaultMessage: "Chi tiết mặt hàng kho",
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
