import * as yup from "yup";

export const emailSchema = yup.string().email("Invalid Email");

export const isValidEmail = inputValue => {
  let rs = true;
  try {
    emailSchema.validateSync(inputValue);
  } catch (e) {
    rs = false;
  }
  return rs;
};
