import { ADMIN_PATH } from '../../constants';

export const INVENTORY_ROOT_PATH = `${ADMIN_PATH}/inventory`;
export const PATH_GOODS_RECEIPT = `${INVENTORY_ROOT_PATH}/goods-receipt`;
export const PATH_GOODS_ISSUE = `${INVENTORY_ROOT_PATH}/goods-issue`;

export const INVENTORY_TYPE = {
  OUT: 1, // Goods Issue = OUT
  IN: 2, // Goods Receipt = IN
};
