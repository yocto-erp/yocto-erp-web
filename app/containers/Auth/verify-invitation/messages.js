import { defineMessages } from 'react-intl';

export const scope = 'app.containers.verify-invitation';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Approve Invitation',
  },
  createConfirmButton: {
    id: `${scope}.createConfirm`,
    defaultMessage: 'Create Account and Confirm Invitation',
  },
  confirmButton: {
    id: `${scope}.confirm`,
    defaultMessage: 'Confirm Invitation',
  },
});
