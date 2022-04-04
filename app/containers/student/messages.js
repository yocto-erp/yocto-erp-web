import { defineMessages } from "react-intl";

const studentFormScope = "containers.student.form";

export const studentFormMessage = defineMessages({
  header: {
    id: `${studentFormScope}.header`,
    defaultMessage: "Thông tin đối tác",
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
