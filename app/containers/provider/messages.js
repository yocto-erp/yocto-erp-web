import { defineMessages } from "react-intl";

const scope = "app.containers.provider";

export default defineMessages({
  menuTitle: {
    id: `${scope}.menuTitle`,
    defaultMessage: "Nhà cung cấp",
  },
  listPageTitle: {
    id: `${scope}.listPageTitle`,
    defaultMessage: "Nhà cung cấp",
  },
  listPageColName: {
    id: `${scope}.listPageColName`,
    defaultMessage: "Tên",
  },
  listPageColSubject: {
    id: `${scope}.listPageColSubject`,
    defaultMessage: "Đối tác",
  },
  deleteConfirmTitle: {
    id: `${scope}.deleteConfirmTitle`,
    defaultMessage: "Xoá nhà cung cấp ?",
  },
  deleteConfirmMessage: {
    id: `${scope}.deleteConfirmMessage`,
    defaultMessage: "Bạn có chắc chắn xoá nhà cung cấp {name} ?",
  },
  deleteSuccessMessage: {
    id: `${scope}.deleteSuccessMessage`,
    defaultMessage: "Xoá nhà cung cấp {name} thành công !",
  },
});
