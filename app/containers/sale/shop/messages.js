import { defineMessages } from "react-intl";

// eslint-disable-next-line no-unused-vars
const scope = "app.containers.saleShop";

export default defineMessages({
  listPageTitle: {
    id: `${scope}.listPageTitle`,
    defaultMessage: "Quản lý cửa hàng",
  },
  listPageSearchName: {
    id: `${scope}.listPageSearchName`,
    defaultMessage: "Tìm kiếm theo tên",
  },
  listPageTableColShop: {
    id: `${scope}.listPageTableColShop`,
    defaultMessage: "Cửa hàng",
  },
  listPageTableColAddress: {
    id: `${scope}.listPageTableColAddress`,
    defaultMessage: "Địa chỉ",
  },
  listPageTableColTotalUser: {
    id: `${scope}.listPageTableColTotalUser`,
    defaultMessage: "Số thành viên",
  },
  listPageTableColRemark: {
    id: `${scope}.listPageTableColRemark`,
    defaultMessage: "Ghi chú",
  },
  createPageTitle: {
    id: `${scope}.createPageTitle`,
    defaultMessage: "Tạo cửa hàng",
  },
  editPageTitle: {
    id: `${scope}.editPageTitle`,
    defaultMessage: "Cập nhập cửa hàng",
  },
  formName: {
    id: `${scope}.formName`,
    defaultMessage: "Tên",
  },
  formAddress: {
    id: `${scope}.formPartner`,
    defaultMessage: "Địa chỉ",
  },
  formRemark: {
    id: `${scope}.formRemark`,
    defaultMessage: "Ghi chú",
  },
  formUser: {
    id: `${scope}.formUser`,
    defaultMessage: "Thành viên",
  },
  formSaveSuccess: {
    id: `${scope}.formSaveSuccess`,
    defaultMessage: "Lưu thông tin cửa hàng {name} thành công",
  },
});
