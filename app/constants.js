export const API_URL = "/api";
export const ADMIN_PATH = "/admin";
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
  ASSET: {
    READ: 37,
    CREATE: 86,
    DELETE: 87,
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
  USER: {
    CREATE: 52,
    READ: 53,
    UPDATE: 54,
    DELETE: 55,
  },
  SURVEY: {
    CREATE: 56,
    READ: 57,
    UPDATE: 58,
    DELETE: 59,
  },
  ECOMMERCE: {
    PRODUCT: {
      CREATE: 60,
      READ: 61,
      UPDATE: 62,
      DELETE: 63,
    },
    ORDER: {
      READ: 64,
      UPDATE: 65,
      DELETE: 66,
    },
    SETTING: 67,
  },
  SHOP: {
    READ: 69,
    CREATE: 70,
    UPDATE: 71,
    DELETE: 72,
  },
  PAYMENT: {
    READ: 73,
    CREATE: 74,
    UPDATE: 75,
    DELETE: 76,
  },
  POS: {
    READ: 77,
    CREATE: 78,
    UPDATE: 79,
    DELETE: 80,
    ORDER: 81,
  },
  TAX: {
    READ: 82,
    CREATE: 83,
    UPDATE: 84,
    DELETE: 85,
  },
};

export const PERMISSION_TYPE = {
  OWNER: 1,
  PARTIAL: 2,
  FULL: 3,
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
    name: "Product",
    permissions: [
      { id: PERMISSION.PRODUCT.CREATE, name: "Create", enableType: 1 },
      { id: PERMISSION.PRODUCT.READ, name: "Read", enableType: 1 },
      { id: PERMISSION.PRODUCT.DELETE, name: "Delete", enableType: 1 },
      { id: PERMISSION.PRODUCT.UPDATE, name: "Update", enableType: 1 },
    ],
  },
  {
    id: 2,
    name: "Customer",
    permissions: [
      { id: PERMISSION.CUSTOMER.CREATE, name: "Create", enableType: 1 },
      { id: PERMISSION.CUSTOMER.READ, name: "Read", enableType: 1 },
      { id: PERMISSION.CUSTOMER.DELETE, name: "Delete", enableType: 1 },
      { id: PERMISSION.CUSTOMER.UPDATE, name: "Update", enableType: 1 },
    ],
  },
  {
    id: 3,
    name: "Order Sale",
    permissions: [
      { id: PERMISSION.ORDER.SALE.CREATE, name: "Create", enableType: 1 },
      { id: PERMISSION.ORDER.SALE.READ, name: "Read", enableType: 1 },
      { id: PERMISSION.ORDER.SALE.DELETE, name: "Delete", enableType: 1 },
      { id: PERMISSION.ORDER.SALE.UPDATE, name: "Update", enableType: 1 },
    ],
  },
  {
    id: 4,
    name: "Order Purchase",
    permissions: [
      { id: PERMISSION.ORDER.PURCHASE.CREATE, name: "Create", enableType: 1 },
      { id: PERMISSION.ORDER.PURCHASE.READ, name: "Read", enableType: 1 },
      { id: PERMISSION.ORDER.PURCHASE.DELETE, name: "Delete", enableType: 1 },
      { id: PERMISSION.ORDER.PURCHASE.UPDATE, name: "Update", enableType: 1 },
    ],
  },
  {
    id: 5,
    name: "Inventory",
    permissions: [
      {
        id: PERMISSION.INVENTORY.GOODS_RECEIPT.CREATE,
        name: "Create Good Receipt",
        enableType: 1,
      },
      {
        id: PERMISSION.INVENTORY.GOODS_RECEIPT.READ,
        name: "Read Good Receipt",
        enableType: 1,
      },
      {
        id: PERMISSION.INVENTORY.GOODS_RECEIPT.DELETE,
        name: "Delete Good Receipt",
        enableType: 1,
      },
      {
        id: PERMISSION.INVENTORY.GOODS_RECEIPT.UPDATE,
        name: "Update Good Receipt",
        enableType: 1,
      },
      {
        id: PERMISSION.INVENTORY.GOODS_ISSUE.CREATE,
        name: "Create Good Issue",
        enableType: 1,
      },
      {
        id: PERMISSION.INVENTORY.GOODS_ISSUE.READ,
        name: "Read Good Issue",
        enableType: 1,
      },
      {
        id: PERMISSION.INVENTORY.GOODS_ISSUE.DELETE,
        name: "Delete Good Issue",
        enableType: 1,
      },
      {
        id: PERMISSION.INVENTORY.GOODS_ISSUE.UPDATE,
        name: "Update Good Issue",
        enableType: 1,
      },
      {
        id: PERMISSION.INVENTORY.READ,
        name: "Read Summary",
        enableType: 0,
      },
    ],
  },
  {
    id: 6,
    name: "Warehouse Management",
    permissions: [
      { id: PERMISSION.WAREHOUSE.CREATE, name: "Create", enableType: 1 },
      { id: PERMISSION.WAREHOUSE.READ, name: "Read", enableType: 1 },
      { id: PERMISSION.WAREHOUSE.DELETE, name: "Delete", enableType: 1 },
      { id: PERMISSION.WAREHOUSE.UPDATE, name: "Update", enableType: 1 },
    ],
  },
  {
    id: 7,
    name: "Cost Management",
    permissions: [
      { id: PERMISSION.COST.CREATE, name: "Create", enableType: 1 },
      { id: PERMISSION.COST.READ, name: "Read", enableType: 1 },
      { id: PERMISSION.COST.DELETE, name: "Delete", enableType: 1 },
      { id: PERMISSION.COST.UPDATE, name: "Update", enableType: 1 },
    ],
  },
  {
    id: 8,
    name: "Person Management",
    permissions: [
      { id: PERMISSION.PERSON.CREATE, name: "Create", enableType: 1 },
      { id: PERMISSION.PERSON.READ, name: "Read", enableType: 1 },
      { id: PERMISSION.PERSON.DELETE, name: "Delete", enableType: 1 },
      { id: PERMISSION.PERSON.UPDATE, name: "Update", enableType: 1 },
    ],
  },
  {
    id: 9,
    name: "Configuration",
    permissions: [
      { id: PERMISSION.CONFIGURATION, name: "Configuration", enableType: 1 },
    ],
  },
  {
    id: 10,
    name: "Template",
    permissions: [
      { id: PERMISSION.TEMPLATE.CREATE, name: "Create", enableType: 1 },
      { id: PERMISSION.TEMPLATE.READ, name: "Read", enableType: 1 },
      { id: PERMISSION.TEMPLATE.DELETE, name: "Delete", enableType: 1 },
      { id: PERMISSION.TEMPLATE.UPDATE, name: "Update", enableType: 1 },
    ],
  },
  {
    id: 11,
    name: "User Management",
    permissions: [
      { id: PERMISSION.USER.CREATE, name: "Invite", enableType: 1 },
      { id: PERMISSION.USER.READ, name: "Read", enableType: 1 },
      { id: PERMISSION.USER.DELETE, name: "Delete", enableType: 1 },
      { id: PERMISSION.USER.UPDATE, name: "Update", enableType: 1 },
    ],
  },
  {
    id: 12,
    name: "Ecommerce Product",
    permissions: [
      {
        id: PERMISSION.ECOMMERCE.PRODUCT.CREATE,
        name: "Create",
        enableType: 0,
      },
      { id: PERMISSION.ECOMMERCE.PRODUCT.READ, name: "Read", enableType: 0 },
      {
        id: PERMISSION.ECOMMERCE.PRODUCT.UPDATE,
        name: "Update",
        enableType: 0,
      },
      {
        id: PERMISSION.ECOMMERCE.PRODUCT.DELETE,
        name: "Delete",
        enableType: 0,
      },
    ],
  },
  {
    id: 13,
    name: "Ecommerce Order",
    permissions: [
      { id: PERMISSION.ECOMMERCE.ORDER.READ, name: "Read", enableType: 0 },
      {
        id: PERMISSION.ECOMMERCE.ORDER.UPDATE,
        name: "Update",
        enableType: 0,
      },
      {
        id: PERMISSION.ECOMMERCE.ORDER.DELETE,
        name: "Delete",
        enableType: 0,
      },
    ],
  },
  {
    id: 14,
    name: "POS",
    permissions: [
      {
        id: PERMISSION.POS.CREATE,
        name: "CREATE",
        enableType: 1,
      },
      {
        id: PERMISSION.POS.UPDATE,
        name: "UPDATE",
        enableType: 1,
      },
      {
        id: PERMISSION.POS.READ,
        name: "READ",
        enableType: 1,
      },
      {
        id: PERMISSION.POS.DELETE,
        name: "DELETE",
        enableType: 1,
      },
      {
        id: PERMISSION.POS.ORDER,
        name: "POS Order",
        enableType: 1,
      },
    ],
  },
  {
    id: 16,
    name: "Shop",
    permissions: [
      {
        id: PERMISSION.SHOP.CREATE,
        name: "CREATE",
        enableType: 1,
      },
      {
        id: PERMISSION.SHOP.UPDATE,
        name: "UPDATE",
        enableType: 1,
      },
      {
        id: PERMISSION.SHOP.READ,
        name: "READ",
        enableType: 1,
      },
      {
        id: PERMISSION.SHOP.DELETE,
        name: "DELETE",
        enableType: 1,
      },
    ],
  },
  {
    id: 17,
    name: "Ecommerce Setting",
    permissions: [
      { id: PERMISSION.ECOMMERCE.SETTING, name: "Setting", enableType: 0 },
    ],
  },
  {
    id: 18,
    name: "Tax",
    permissions: [
      { id: PERMISSION.TAX.CREATE, name: "CREATE", enableType: 0 },
      { id: PERMISSION.TAX.READ, name: "READ", enableType: 0 },
      { id: PERMISSION.TAX.UPDATE, name: "UPDATE", enableType: 0 },
      { id: PERMISSION.TAX.DELETE, name: "DELETE", enableType: 0 },
    ],
  },
  {
    id: 19,
    name: "Asset",
    permissions: [
      { id: PERMISSION.ASSET.CREATE, name: "CREATE", enableType: 1 },
      { id: PERMISSION.ASSET.READ, name: "READ", enableType: 1 },
      { id: PERMISSION.ASSET.DELETE, name: "DELETE", enableType: 1 },
    ],
  },
];
