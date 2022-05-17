import { defineMessages } from "react-intl";

export const scope = "app.containers.warehouse";

export default defineMessages({
  listPageTitle: {
    id: `${scope}.listPageTitle`,
    defaultMessage: "Quản lý kho",
  },
  listPageTableColWarehouse: {
    id: `${scope}.listPageTableColWarehouse`,
    defaultMessage: "Kho",
  },
  createPageTitle: {
    id: `${scope}.createPageTitle`,
    defaultMessage: "Tạo kho",
  },
  editPageTitle: {
    id: `${scope}.editPageTitle`,
    defaultMessage: "Cập nhập kho",
  },
});
