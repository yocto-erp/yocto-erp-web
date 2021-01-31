import IMask from 'imask';

export const transformUnNumber = value => (Number.isNaN(value) ? 0 : value);

export const isNumber = value => !Number.isNaN(Number(value));

export const numberPipe = (scale = 2, thousandsSeparator = '.') =>
  IMask.createPipe(
    {
      mask: Number,
      scale,
      thousandsSeparator,
      normalizeZeros: true,
      padFractionalZeros: false,
    },
    IMask.PIPE_TYPE.TYPED,
  );

export function formatMoney(amount, currency) {
  return `${numberPipe()(amount)} ${currency}`;
}

export function roundUp(num, precision) {
  const scale = 10 ** precision;
  return Math.ceil(num * scale) / scale;
}
