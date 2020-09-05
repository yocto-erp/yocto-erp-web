import { defineMessages } from 'react-intl';

export const scope = 'app.containers.RestPassword';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Rest your password!',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'password',
  },

  invalidPassword: {
    id: `${scope}.invalid.password`,
    defaultMessage: 'Password bị sai rồi',
  },
  resetPasswordButton: {
    id: `${scope}.button.resetPassword`,
    defaultMessage: 'Reset Password',
  },
});
