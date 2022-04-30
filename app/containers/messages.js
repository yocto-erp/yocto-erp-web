import { defineMessages } from "react-intl";

const scope = "app.containers.template";

export const commonMessage = defineMessages({
  searchPartnerPlaceHolder: {
    id: `${scope}.searchPartnerPlaceHolder`,
    defaultMessage: "Tìm theo tên, email, số điện thoại",
  },
  searchByName: {
    id: `${scope}.searchByName`,
    defaultMessage: "Tìm theo tên",
  },
  createdBy: {
    id: `${scope}.createdBy`,
    defaultMessage: "Tạo bởi",
  },
  action: {
    id: `${scope}.action`,
    defaultMessage: "Thao tác",
  },
  textRemark: {
    id: `${scope}.textRemark`,
    defaultMessage: "Chú thích",
  },
  btnSearch: {
    id: `${scope}.btnSearch`,
    defaultMessage: "Tìm kiếm",
  },
  btnReset: {
    id: `${scope}.btnReset`,
    defaultMessage: "Xoá",
  },
  btnCreate: {
    id: `${scope}.btnCreate`,
    defaultMessage: "Tạo",
  },
  btnBack: {
    id: `${scope}.btnBack`,
    defaultMessage: "Quay lại",
  },
  btnSubmit: {
    id: `${scope}.btnSubmit`,
    defaultMessage: "Lưu",
  },
});
