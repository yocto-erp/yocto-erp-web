import { createCRUDApi } from './fetch';
import { API_URL } from '../../constants';

export const TAGGING_TYPE = {
  PURCHASE_ORDER: 1,
  SALE_ORDER: 2,
  INVENTORY_GOOD_RECEIPT: 3,
  INVENTORY_GOOD_ISSUE: 4,
  RECEIPT_VOUCHER: 5,
  PAYMENT_VOUCHER: 6,
  PERSON: 7,
  COMPANY: 8,
  OTHER: 100,
};

const API_ENDPOINT_URL = `${API_URL}/tagging`;

const taggingApi = createCRUDApi(API_ENDPOINT_URL);

export default taggingApi;
