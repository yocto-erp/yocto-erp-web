import * as yup from 'yup';
import { emailSchema } from '../../libs/utils/schema.util';

export const SendEmailFormSchema = {
  from: emailSchema.required(),
  content: yup.string().required(),
  subject: yup.string().required(),
  cc: yup.array(),
  bcc: yup.array(),
};
