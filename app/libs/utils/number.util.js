import IMask from "imask"
import * as Yup from "yup"

export const isNumber = (value) =>
  value !== undefined && value !== null && value !== "" && !Number.isNaN(Number(value))

export const transformUnNumber = (value) => (!isNumber(value) ? 0 : value)

export const transformUnNumberToNull = (value) => (!isNumber(value) ? null : value)

export const numberPipe = (scale = 2, thousandsSeparator = ".") =>
  IMask.createPipe(
    {
      mask: Number,
      scale,
      thousandsSeparator,
      normalizeZeros: true,
      padFractionalZeros: false,
      min: -10000000000,
      max: 10000000000,
    },
    IMask.PIPE_TYPE.TYPED,
  )

export function formatMoney(amount, currency) {
  return `${numberPipe()(amount)} ${currency}`
}

export function roundUp(num, precision) {
  if (isNumber(num)) {
    const scale = 10 ** precision
    return String(Math.ceil(num * scale) / scale)
  }
  return ""
}

export const isPositiveNumber = Yup.number()
  .transform(transformUnNumberToNull)
  .nullable()
  .moreThan(0)
  .required()
