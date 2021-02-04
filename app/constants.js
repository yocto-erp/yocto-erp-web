export const API_URL = '/api';
export const PERMISSION = {
  PRODUCT: {
    CREATE: 1,
    READ: 2,
    UPDATE: 3,
    DELETE: 4,
  },
  CUSTOMER: {
    CREATE: 5,
    READ: 6,
    UPDATE: 7,
    DELETE: 8,
  },
  ORDER: {
    SALE: {
      CREATE: 9,
      READ: 10,
      UPDATE: 11,
      DELETE: 12,
    },
    PURCHASE: {
      CREATE: 25,
      READ: 26,
      UPDATE: 27,
      DELETE: 28,
    },
  },
  INVENTORY: {
    GOODS_RECEIPT: {
      CREATE: 13,
      READ: 14,
      UPDATE: 15,
      DELETE: 16,
    },
    GOODS_ISSUE: {
      CREATE: 21,
      READ: 22,
      UPDATE: 23,
      DELETE: 24,
    },
    READ: 38,
  },
  WAREHOUSE: {
    CREATE: 17,
    READ: 18,
    UPDATE: 19,
    DELETE: 20,
  },
  COST: {
    CREATE: 29,
    READ: 30,
    UPDATE: 31,
    DELETE: 32,
  },
  PERSON: {
    CREATE: 33,
    READ: 34,
    UPDATE: 35,
    DELETE: 36,
  },
  COMPANY: {
    CREATE: 39,
    READ: 40,
    UPDATE: 41,
    DELETE: 42,
  },
  IMAGE: {
    READ: 37,
  },
  CONFIGURATION: 43,
  TEMPLATE: {
    CREATE: 44,
    READ: 45,
    UPDATE: 46,
    DELETE: 47,
  },
  EMAIL: {
    SEND: 48,
    READ: 49,
  },
  LOGIN: 50,
  AUDIT: 51,
};

/**
 * enableType:
 *  - 1: Allow User select type (OWNER/PARTIAL/FULL)
 *  - 2: Not allow (hide) user select type.
 * @type {{permissions: [{enableType: number, name: string, id: number}], name: string, id: number}[]}
 */

export const PERMISSION_MODULE = [
  {
    id: 1,
    name: 'Product',
    permissions: [
      { id: PERMISSION.PRODUCT.CREATE, name: 'Create', enableType: 1 },
      { id: PERMISSION.PRODUCT.READ, name: 'Read', enableType: 1 },
      { id: PERMISSION.PRODUCT.DELETE, name: 'Delete', enableType: 1 },
      { id: PERMISSION.PRODUCT.UPDATE, name: 'Update', enableType: 1 },
    ],
  },
  {
    id: 2,
    name: 'Customer',
    permissions: [
      { id: PERMISSION.CUSTOMER.CREATE, name: 'Create', enableType: 1 },
      { id: PERMISSION.CUSTOMER.READ, name: 'Read', enableType: 1 },
      { id: PERMISSION.CUSTOMER.DELETE, name: 'Delete', enableType: 1 },
      { id: PERMISSION.CUSTOMER.UPDATE, name: 'Update', enableType: 1 },
    ],
  },
  {
    id: 3,
    name: 'Order Sale',
    permissions: [
      { id: PERMISSION.ORDER.SALE.CREATE, name: 'Create', enableType: 1 },
      { id: PERMISSION.ORDER.SALE.READ, name: 'Read', enableType: 1 },
      { id: PERMISSION.ORDER.SALE.DELETE, name: 'Delete', enableType: 1 },
      { id: PERMISSION.ORDER.SALE.UPDATE, name: 'Update', enableType: 1 },
    ],
  },
  {
    id: 4,
    name: 'Order Purchase',
    permissions: [
      { id: PERMISSION.ORDER.PURCHASE.CREATE, name: 'Create', enableType: 1 },
      { id: PERMISSION.ORDER.PURCHASE.READ, name: 'Read', enableType: 1 },
      { id: PERMISSION.ORDER.PURCHASE.DELETE, name: 'Delete', enableType: 1 },
      { id: PERMISSION.ORDER.PURCHASE.UPDATE, name: 'Update', enableType: 1 },
    ],
  },
];
