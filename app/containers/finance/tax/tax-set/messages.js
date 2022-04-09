import { defineMessages } from "react-intl";

const scope = "app.containers.taxSet";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "Danh sách nhóm thuế",
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: "Tên nhóm thuế",
  },
  remark: {
    id: `${scope}.remark`,
    defaultMessage: "Mô tả",
  },
  updateTaxSetTitle: {
    id: `${scope}.updateTaxSetTitle`,
    defaultMessage: "Cập nhập nhóm thuế",
  },
  createTaxSetButton: {
    id: `${scope}.button.createCompany`,
    defaultMessage: "Tạo nhóm thuế",
  },
});
