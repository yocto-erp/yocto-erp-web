import { defineMessages } from "react-intl";

export const scope = "app.containers.ecommerce";

export default defineMessages({
  menuEcommerceTitle: {
    id: `${scope}.menuEcommerceTitle`,
    defaultMessage: "Quản lý bán hàng",
  },
  menuProductTitle: {
    id: `${scope}.menuTitle`,
    defaultMessage: "Sản phẩm",
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: "Quản lý sản phẩm bán",
  },
  listPageCreateBtn: {
    id: `${scope}.listPageCreateBtn`,
    defaultMessage: "Sản phẩm mới",
  },
});
