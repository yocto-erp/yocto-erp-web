import { defineMessages } from 'react-intl';

export const scope = 'app.components.form.error';

export const ERROR = {
  required: 'required',
  email: 'email',
  amountGT0: 'amountGT0',
  numberGT0: 'numberGT0',
  max: 'max',
};

export default defineMessages({
  [ERROR.required]: {
    id: `${scope}.${Error.required}`,
    defaultMessage: 'This field is required',
  },
  [ERROR.email]: {
    id: `${scope}.${Error.email}`,
    defaultMessage: 'Invalid Email',
  },
  [ERROR.amountGT0]: {
    id: `${scope}.${Error.amountGT0}`,
    defaultMessage: 'Amount must be greater than zero',
  },
  [ERROR.numberGT0]: {
    id: `${scope}.${Error.numberGT0}`,
    defaultMessage: 'Number must be greater than zero',
  },
  [ERROR.max]: {
    id: `${scope}.${Error.amountGT0}`,
    // eslint-disable-next-line no-template-curly-in-string
    defaultMessage: 'String with max length {max}',
  },
});
