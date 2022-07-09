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
  listPageColStatus: {
    id: `${scope}.listPageColStatus`,
    defaultMessage: "Trạng thái",
  },
  listPageColTerm: {
    id: `${scope}.listPageColTerm`,
    defaultMessage: "Kỳ hạn",
  },
  listPageColRemark: {
    id: `${scope}.listPageColRemark`,
    defaultMessage: "Mô tả",
  },
  listPageColApprove: {
    id: `${scope}.listPageColApprove`,
    defaultMessage: "Duyệt bởi",
  },
  listPageFilterSearch: {
    id: `${scope}.listPageFilterSearch`,
    defaultMessage: "Tên, số điện thoại, email",
  },
  listPageFilterTagging: {
    id: `${scope}.listPageFilterTagging`,
    defaultMessage: "Tagging",
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
  createPageTitle: {
    id: `${scope}.createPageTitle`,
    defaultMessage: "Tạo nhà cung cấp",
  },
  updatePageTitle: {
    id: `${scope}.updatePageTitle`,
    defaultMessage: "Cập nhập nhà cung cấp",
  },
  viewPageTitle: {
    id: `${scope}.viewPageTitle`,
    defaultMessage: "Thông tin nhà cung cấp",
  },
  formSaveSuccess: {
    id: `${scope}.formSaveSuccess`,
    defaultMessage: "Lưu nhà cung cấp {name} thành công",
  },
  formPartner: {
    id: `${scope}.formPartner`,
    defaultMessage: "Chọn đối tác",
  },
  formRemark: {
    id: `${scope}.formRemark`,
    defaultMessage: "Mô tả",
  },
  formContractTerm: {
    id: `${scope}.formContractTerm`,
    defaultMessage: "Kỳ hạn hợp đồng",
  },
  formContractStart: {
    id: `${scope}.formContractStart`,
    defaultMessage: "Ngày bắt đầu",
  },
  formContractEnd: {
    id: `${scope}.formContractEnd`,
    defaultMessage: "Ngày kết thúc",
  },
  formStatus: {
    id: `${scope}.formStatus`,
    defaultMessage: "Tình trạng",
  },
  formProduct: {
    id: `${scope}.formProduct`,
    defaultMessage: "Sản phẩm cung cấp",
  },
  providerStatus1: {
    id: `${scope}.providerStatus1`,
    defaultMessage: "Đang chờ",
  },
  providerStatus2: {
    id: `${scope}.providerStatus2`,
    defaultMessage: "Đang xử lý",
  },
  providerStatus3: {
    id: `${scope}.providerStatus3`,
    defaultMessage: "Hoàn thành",
  },
  providerStatus4: {
    id: `${scope}.providerStatus4`,
    defaultMessage: "Huỷ",
  },
  formApproveStatusAccept: {
    id: `${scope}.formApproveStatusAccept`,
    defaultMessage: "Chấp nhận",
  },
  formApproveStatusReject: {
    id: `${scope}.formApproveStatusReject`,
    defaultMessage: "Từ chối",
  },
});
