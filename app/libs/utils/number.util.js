import IMask from 'imask';

export const transformUnNumber = value => (Number.isNaN(value) ? 0 : value);

export const isNumber = value => !Number.isNaN(Number(value));

export const numberPipe = (scale = 0, thousandsSeparator = '.') =>
  IMask.createPipe(
    {
      mask: Number,
      scale,
      thousandsSeparator,
      normalizeZeros: false,
      padFractionalZeros: false,
    },
    IMask.PIPE_TYPE.TYPED,
  );

export function formatMoney(amount, currency) {
  return `${numberPipe()(amount)} ${currency}`;
}
