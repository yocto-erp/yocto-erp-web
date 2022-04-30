import { defineMessages } from "react-intl";

const studentFormScope = "containers.student.form";

export const studentFormMessage = defineMessages({
  header: {
    id: `${studentFormScope}.header`,
    defaultMessage: "Thông tin học sinh",
  },
  pageCreateHeader: {
    id: `${studentFormScope}.pageCreateHeader`,
    defaultMessage: "Tạo học sinh",
  },
  pageUpdateHeader: {
    id: `${studentFormScope}.pageUpdateHeader`,
    defaultMessage: "Cập nhập học sinh",
  },
  fullName: {
    id: `${studentFormScope}.fullName`,
    defaultMessage: "Họ tên",
  },
  alias: {
    id: `${studentFormScope}.alias`,
    defaultMessage: "Tên ở nhà",
  },
  birthday: {
    id: `${studentFormScope}.birthday`,
    defaultMessage: "Ngày sinh nhật",
  },
  formGender0: {
    id: `${studentFormScope}.formGenderMALE`,
    defaultMessage: "Bé Trai",
  },
  formGender1: {
    id: `${studentFormScope}.formGenderFEMALE`,
    defaultMessage: "Bé Gái",
  },
  formGenderSelectDefault: {
    id: `${studentFormScope}.formGender`,
    defaultMessage: "Chọn Giới tính",
  },
  formRemark: {
    id: `${studentFormScope}.formRemark`,
    defaultMessage: "Mô tả",
  },
  meal: {
    id: `${studentFormScope}.meal`,
    defaultMessage: "Đăng ký ăn",
  },
  father: {
    id: `${studentFormScope}.father`,
    defaultMessage: "Thông tin cha",
  },
  fatherContact: {
    id: `${studentFormScope}.fatherContact`,
    defaultMessage: "Liên lạc cha",
  },
  mother: {
    id: `${studentFormScope}.mother`,
    defaultMessage: "Thông tin mẹ",
  },
  motherContact: {
    id: `${studentFormScope}.motherContact`,
    defaultMessage: "Liên lạc mẹ",
  },
});

export const listPageMessage = {
  header: {
    id: `${studentFormScope}.listPageHeader`,
    defaultMessage: "Quản lý học sinh",
  },
  filterSearch: {
    id: `${studentFormScope}.listPageFilterSearch`,
    defaultMessage: "Tìm theo tên hoặc ID",
  },
  filterStatus: {
    id: `${studentFormScope}.listPageFilterStatus`,
    defaultMessage: "Trạng thái",
  },
  tableStatus: {
    id: `${studentFormScope}.listPageTableStatus`,
    defaultMessage: "Trạng thái",
  },
  tableStudent: {
    id: `${studentFormScope}.listPageTableStudent`,
    defaultMessage: "Học sinh",
  },
  tableParent: {
    id: `${studentFormScope}.listPageTableParent`,
    defaultMessage: "Phụ huynh",
  },
  tableMeal: {
    id: `${studentFormScope}.listPageTableMeal`,
    defaultMessage: "Đăng ký ăn",
  },
  tableBus: {
    id: `${studentFormScope}.listPageTableBus`,
    defaultMessage: "Xe bus",
  },
  status1: {
    id: `${studentFormScope}.status1`,
    defaultMessage: "Chờ",
  },
  status2: {
    id: `${studentFormScope}.status2`,
    defaultMessage: "Đang học",
  },
  status3: {
    id: `${studentFormScope}.status3`,
    defaultMessage: "Nghỉ học",
  },
};
