import * as yup from 'yup';
import { emailSchema } from '../../libs/utils/schema.util';

export const SendEmailFormSchema = {
  from: emailSchema.required(),
  content: yup.string().required(),
  subject: yup.string().required(),
  cc: yup.array().nullable(),
  bcc: yup.array().nullable(),
};

export const emailFormSchema = isRequired => {
  if (isRequired) {
    return SendEmailFormSchema;
  }
  return {
    from: emailSchema,
    content: yup.string(),
    subject: yup.string(),
    cc: yup.array().nullable(),
    bcc: yup.array().nullable(),
  };
};
