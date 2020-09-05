/*
 * login Messages
 *
 * This contains all the text for the login container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.login';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Một ngày yên bình !',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'email',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'password',
  },
  invalidEmail: {
    id: `${scope}.invalid.email`,
    defaultMessage: 'Invalid Email',
  },
  invalidPassword: {
    id: `${scope}.invalid.password`,
    defaultMessage: 'Password bị sai rồi',
  },
  loginButton: {
    id: `${scope}.button.login`,
    defaultMessage: 'Đăng nhập',
  },
});
