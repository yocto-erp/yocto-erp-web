import { defineMessages } from 'react-intl';

export const scope = 'app.components.form.error';

export const ERROR = {
  required: 'required',
  email: 'email',
  amountGT0: 'amountGT0',
  numberGT0: 'numberGT0',
  priceGT0: 'priceGT0',
  max: 'max',
};

export default defineMessages({
  required: {
    id: `${scope}.required`,
    defaultMessage: 'This field is required',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Invalid Email',
  },
  amountGT0: {
    id: `${scope}.amountGT0`,
    defaultMessage: 'Amount must be greater than zero',
  },
  numberGT0: {
    id: `${scope}.numberGT0`,
    defaultMessage: 'Number must be greater than zero',
  },
  priceGT0: {
    id: `${scope}.priceGT0`,
    defaultMessage: 'Price must be greater than zero',
  },
  max: {
    id: `${scope}.max`,
    // eslint-disable-next-line no-template-curly-in-string
    defaultMessage: 'String with max length {max}',
  },
});
