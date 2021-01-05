import { createCRUDApi, fetchJSON, postJSON } from '../fetch';
import { API_URL } from '../../../constants';

const API_ENDPOINT_URL = `${API_URL}/student-monthly-fee`;

const studentMonthlyFeeApi = {
  ...createCRUDApi(API_ENDPOINT_URL),
  pdf: (id, templateId) =>
    `${API_URL}/student-monthly-fee/${id}/pdf/${templateId}`,
  printData: id => fetchJSON(`${API_ENDPOINT_URL}/${id}/print-data`),
  pay: (id, data) => postJSON(`${API_ENDPOINT_URL}/${id}/pay`, data),
  sendEmail: (
    ids,
    emailTemplateId,
    isPDFAttached,
    printTemplateId,
    from,
    cc,
    bcc,
  ) =>
    postJSON(`${API_ENDPOINT_URL}/send-email`, {
      listId: ids,
      emailTemplateId,
      isPDFAttached,
      printTemplateId,
      from,
      cc,
      bcc,
    }),
};

export default studentMonthlyFeeApi;
