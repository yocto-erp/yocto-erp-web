import { create, all, bignumber } from "mathjs";

const config = {
  // Default type of number
  // Available options: 'number' (default), 'BigNumber', or 'Fraction'
  number: "BigNumber",

  // Number of significant digits for BigNumbers
  precision: 20,
};
const math = create(all, config);

export const plus = (num1, num2) =>
  math.add(math.bignumber(num1), math.bignumber(num2));

export const divide = (num1, num2) =>
  math.divide(math.bignumber(num1), math.bignumber(num2));

export const multiply = (num1, num2) =>
  math.multiply(math.bignumber(num1), math.bignumber(num2));
export const subtract = (num1, num2) =>
  math.subtract(math.bignumber(num1), math.bignumber(num2));

export const compare = (num1, num2) =>
  math.compare(bignumber(num1), bignumber(num2));

export const isNumber = num1 => math.isNumber(num1) || math.isBigNumber(num1);
