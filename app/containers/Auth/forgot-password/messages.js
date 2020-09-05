import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ForgotPassword';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Forgot your password?',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
  forgotPasswordButton: {
    id: `${scope}.button.forgotPassword`,
    defaultMessage: 'Reset my password',
  },
});
