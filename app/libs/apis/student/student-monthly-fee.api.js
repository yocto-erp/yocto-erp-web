import { createCRUDApi, fetchWithAuth } from '../fetch';
import { API_URL } from '../../../constants';

const API_ENDPOINT_URL = `${API_URL}/student-monthly-fee`;

const studentMonthlyFeeApi = {
  ...createCRUDApi(API_ENDPOINT_URL),
  pdf: (id, templateId) =>
    `${API_URL}/student-monthly-fee/${id}/pdf/${templateId}`,
  download: (url, name) =>
    fetchWithAuth(url)
      .then(response => response.blob())
      .then(blobby => {
        console.log(blobby);
        const objectUrl = window.URL.createObjectURL(blobby);
        const anchor = document.createElement('a');
        anchor.href = objectUrl;
        anchor.download = name;
        anchor.click();

        window.URL.revokeObjectURL(objectUrl);
      }),
};

export default studentMonthlyFeeApi;
