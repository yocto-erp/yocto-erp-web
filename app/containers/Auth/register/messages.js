import { defineMessages } from "react-intl";

export const scope = "app.containers.register";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "Đăng ký",
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: "Email",
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: "Mật khẩu",
  },
  invalidEmail: {
    id: `${scope}.invalid.email`,
    defaultMessage: "Email không chính xác",
  },
  invalidPassword: {
    id: `${scope}.invalid.password`,
    defaultMessage: "Password bị sai rồi",
  },
  invalidDisplayName: {
    id: `${scope}.invalid.password`,
    defaultMessage: "Password bị sai rồi",
  },
  registerButton: {
    id: `${scope}.button.register`,
    defaultMessage: "Đăng ký",
  },
  registerSuccess: {
    id: `${scope}.button.registerSuccess`,
    defaultMessage:
      "Đăng ký thành công, một liên kết kích hoạc tài khoản đã được gởi đến email <strong>{email}</strong>, vui lòng kiểm tra hộp thư và kích hoạt tài khoản của bạn",
  },
  alreadyHaveAccount: {
    id: `${scope}.alreadyHaveAccount`,
    defaultMessage: "Nếu bạn đã có tài khoản",
  },
  loginHere: {
    id: `${scope}.loginHere`,
    defaultMessage: "đăng nhập ở đây",
  },
  formFullName: {
    id: `${scope}.formFullName`,
    defaultMessage: "Họ và tên",
  },
  formFirstName: {
    id: `${scope}.formFirstName`,
    defaultMessage: "Họ",
  },
  formLastName: {
    id: `${scope}.formLastName`,
    defaultMessage: "Tên",
  },
  formEmail: {
    id: `${scope}.formEmail`,
    defaultMessage: "Email",
  },
  formPassword: {
    id: `${scope}.formPassword`,
    defaultMessage: "Mật khẩu",
  },
});
