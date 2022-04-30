import { ADMIN_PATH } from "../../constants";

const COST_ROOT_PATH = `${ADMIN_PATH}/cost`;
const COST_PAYMENT_PATH = `${COST_ROOT_PATH}/payment`;
const COST_RECEIPT_PATH = `${COST_ROOT_PATH}/receipt`;

export { COST_ROOT_PATH, COST_PAYMENT_PATH, COST_RECEIPT_PATH };

export const COST_TYPE = {
  RECEIPT: 1,
  PAYMENT: 2,
};
