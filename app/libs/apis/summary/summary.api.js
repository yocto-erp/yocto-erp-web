import { fetchJSON } from '../fetch';
import { API_URL } from '../../../constants';

const API_ENDPOINT_URL = `${API_URL}/summary`;

export const globalSummaryApi = {
  get: (dateFrom, dateTo) =>
    fetchJSON(
      `${API_ENDPOINT_URL}?fromDate=${dateFrom.toISOString()}&toDate=${dateTo.toISOString()}`,
    ),
};
