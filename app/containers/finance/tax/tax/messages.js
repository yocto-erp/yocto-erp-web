import { defineMessages } from "react-intl";

const scope = "app.containers.tax";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "Danh sách thuế",
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: "Tên",
  },
  remark: {
    id: `${scope}.remark`,
    defaultMessage: "Mô tả",
  },
  updateTaxTitle: {
    id: `${scope}.updateTaxTitle`,
    defaultMessage: "Cập nhập thuế",
  },
  createTaxButton: {
    id: `${scope}.button.createCompany`,
    defaultMessage: "Tạo thuế",
  },
});
