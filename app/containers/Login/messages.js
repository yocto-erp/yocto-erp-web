/*
 * Login Messages
 *
 * This contains all the text for the Login container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Login';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Một ngày yên bình !',
  },
  username: {
    id: `${scope}.username`,
    defaultMessage: 'Username',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'password',
  },
  invalidUsername: {
    id: `${scope}.invalid.username`,
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
