import { createCRUDApi, postJSON } from '../fetch';
import { API_URL } from '../../../constants';

const API_ENDPOINT_URL = `${API_URL}/student-monthly-fee`;

const studentMonthlyFeeApi = {
  ...createCRUDApi(API_ENDPOINT_URL),
  pdf: (id, templateId) =>
    `${API_URL}/student-monthly-fee/${id}/pdf/${templateId}`,
  sendEmail: (ids, emailTemplateId, isPDFAttached, printTemplateId) =>
    postJSON(`${API_ENDPOINT_URL}/send-email`, {
      listId: ids,
      emailTemplateId,
      isPDFAttached,
      printTemplateId,
    }),
};

export default studentMonthlyFeeApi;
