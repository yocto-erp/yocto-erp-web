import { defineMessages } from "react-intl";

const scope = "app.containers.purchase";

export default defineMessages({
  listPageTitle: {
    id: `${scope}.listPageTitle`,
    defaultMessage: "Quản lý mua hàng",
  },
  listPageSearchName: {
    id: `${scope}.listPageSearchName`,
    defaultMessage: "Tìm kiếm theo tên",
  },
  listPageSearchProvider: {
    id: `${scope}.listPageSearchProvider`,
    defaultMessage: "Tìm theo nhà cung cấp",
  },
  listPageTableColName: {
    id: `${scope}.listPageTableColName`,
    defaultMessage: "Tên",
  },
  listPageTableColProvider: {
    id: `${scope}.listPageTableColProvider`,
    defaultMessage: "Nhà cung cấp",
  },
  listPageTableColTotalAmount: {
    id: `${scope}.listPageTableColTotalAmount`,
    defaultMessage: "Tổng tiền",
  },
  listPageTableColRemark: {
    id: `${scope}.listPageTableColRemark`,
    defaultMessage: "Ghi chú",
  },
  createPageTitle: {
    id: `${scope}.createPageTitle`,
    defaultMessage: "Tạo phiếu mua hàng",
  },
  editPageTitle: {
    id: `${scope}.editPageTitle`,
    defaultMessage: "Cập nhập phiếu mua hàng",
  },
  formName: {
    id: `${scope}.formName`,
    defaultMessage: "Tên",
  },
  formPartner: {
    id: `${scope}.formPartner`,
    defaultMessage: "Nhà cung cấp",
  },
  formRemark: {
    id: `${scope}.formRemark`,
    defaultMessage: "Ghi chú",
  },
  formTableProduct: {
    id: `${scope}.formTableProduct`,
    defaultMessage: "Sản phẩm",
  },
  formTableUnit: {
    id: `${scope}.formTablUnit`,
    defaultMessage: "Đơn vị",
  },
  formTableQty: {
    id: `${scope}.formTableQty`,
    defaultMessage: "Số lượng",
  },
  formTablePrice: {
    id: `${scope}.formTablePrice`,
    defaultMessage: "Đơn giá",
  },
  formTableRemark: {
    id: `${scope}.formTableRemark`,
    defaultMessage: "Ghi chú",
  },
  formTableBtnAddProduct: {
    id: `${scope}.formTableBtnAddProduct`,
    defaultMessage: "Thêm sản phẩm",
  },
});
