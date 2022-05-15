import { defineMessages } from "react-intl";

export const scope = "app.containers.ForgotPassword";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "Bạn quên mật khẩu ?",
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: "Email",
  },
  resetPasswordGuide: {
    id: `${scope}.resetPasswordGuide`,
    defaultMessage: "Nhập email của bạn để thiết lập lại mật khẩu",
  },
  forgotPasswordButton: {
    id: `${scope}.button.forgotPassword`,
    defaultMessage: "Thiết lập lại mật khẩu",
  },
  rememberPasswordMessage: {
    id: `${scope}.remeberPasswordMessage`,
    defaultMessage: "Nếu bạn nhớ mật khẩu,",
  },
  loginHereMessage: {
    id: `${scope}.loginHereMessage`,
    defaultMessage: "vui lòng đăng nhập",
  },
});
