/*
 * login Messages
 *
 * This contains all the text for the login container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.login";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "Một ngày yên bình !",
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
  loginButton: {
    id: `${scope}.button.login`,
    defaultMessage: "Đăng nhập",
  },
  notHaveAccountMessage: {
    id: `${scope}.notHaveAccountMessage`,
    defaultMessage: "Bạn chưa có tài khoản ? Vui lòng đăng ký !",
  },
  createAccount: {
    id: `${scope}.createAccount`,
    defaultMessage: "Tạo tài khoản",
  },
  forgetPassword: {
    id: `${scope}.forgetPassword`,
    defaultMessage: "Bạn quên mật khẩu ?",
  },
});
