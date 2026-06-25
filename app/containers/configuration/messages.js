import { defineMessages } from "react-intl"

export const scope = "app.components.general.conf.company"

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: "Công ty",
  },
  schoolTitle: {
    id: `${scope}.schoolTitle`,
    defaultMessage: "Thông tin trường học",
  },
  btnUpdateSchool: {
    id: `${scope}.btnUpdateSchool`,
    defaultMessage: "Cập nhập",
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: "Tên",
  },
})
