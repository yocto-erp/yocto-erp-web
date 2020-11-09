export const API_URL = '/api';

export const DEFAULT_PAGING = {
  page: 1,
  size: 10,
  sorts: [],
};

export const PERMISSION = {
  PRODUCT: {
    CREATE: 1,
    READ: 2,
    LIST: 2,
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
};

export const FORM_LAYOUT = {
  layout: 'horizontal',
  labelAlign: 'right',
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const FORM_MODAL_LAYOUT = {
  layout: 'horizontal',
  labelAlign: 'left',
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const FORM_MODAL_TAIL_LAYOUT = {
  wrapperCol: {
    offset: 0,
    span: 24,
  },
};

export const FORM_TAIL_LAYOUT = {
  wrapperCol: {
    offset: 8,
    span: 24,
  },
};
