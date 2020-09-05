import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Register';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Register user',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
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
  invalidDisplayName: {
    id: `${scope}.invalid.password`,
    defaultMessage: 'Password bị sai rồi',
  },
  registerButton: {
    id: `${scope}.button.register`,
    defaultMessage: 'Đăng kí',
  },
});
