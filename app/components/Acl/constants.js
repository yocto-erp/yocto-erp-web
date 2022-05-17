// MAX = 127

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
      PROVIDER: 125, // Permission allow user set purchase from which provider
      AMOUNT: 126,
      SHOP: 127,
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
  DEBT: {
    READ: 88,
    CREATE: 89,
    UPDATE: 90,
    DELETE: 91,
  },
  PROVIDER: {
    READ: 92,
    CREATE: 93,
    UPDATE: 94,
    DELETE: 95,
    APPROVE: 96,
  },
  COMMENT: {
    READ: 97,
    CREATE: 98,
    DELETE: 99,
    UPDATE: 100,
  },
  STUDENT: {
    READ: 101,
    CREATE: 102,
    DELETE: 103,
    UPDATE: 104,
    CONFIGURE: 124,
    MONTHLY_FEE: {
      READ: 105,
      CREATE: 106,
      DELETE: 107,
      UPDATE: 108,
      PAID: 109,
    },
    BUS: {
      READ: 110,
      CREATE: 111,
      DELETE: 112,
      UPDATE: 113,
      PAID: 114,
    },
    CLASS: {
      READ: 115,
      CREATE: 116,
      DELETE: 117,
      UPDATE: 118,
      PAID: 119,
    },
    DAILY_TRACKING: {
      READ: 120,
      CREATE: 121,
      SIGN: 122,
      UPDATE: 123,
    },
  },
};

export const PERMISSION_TYPE = {
  OWNER: 1, // OWNER: Mean user can only see their own record.
  PARTIAL: 2, // PARTIAL: Mean user can see their own record and other user.
  FULL: 3, // FULL: Mean user can see all record.
};

/**
 * enableType:
 *  - 1: Allow User select type (OWNER/PARTIAL/FULL)
 *  - 2: Not allow (hide) user select type.
 * @type {{permissions: [{enableType: number, name: string, id: number}], name: string, id: number}[]}
 */
export const PERMISSION_ENABLE_TYPE = {
  ALLOW_CHOOSE_TYPE: 1,
  NOT_ALLOW_CHOOSE_TYPE: 2,
};

export const PERMISSION_MODULE = [
  {
    id: 1,
    name: "Product",
    permissions: [
      {
        id: PERMISSION.PRODUCT.CREATE,
        name: "Create",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.PRODUCT.READ,
        name: "Read",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.PRODUCT.DELETE,
        name: "Delete",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.PRODUCT.UPDATE,
        name: "Update",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 2,
    name: "Customer",
    permissions: [
      {
        id: PERMISSION.CUSTOMER.CREATE,
        name: "Create",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.CUSTOMER.READ,
        name: "Read",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.CUSTOMER.DELETE,
        name: "Delete",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.CUSTOMER.UPDATE,
        name: "Update",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 3,
    name: "Order Sale",
    permissions: [
      {
        id: PERMISSION.ORDER.SALE.CREATE,
        name: "Create",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.ORDER.SALE.READ,
        name: "Read",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.ORDER.SALE.DELETE,
        name: "Delete",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.ORDER.SALE.UPDATE,
        name: "Update",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 4,
    name: "Order Purchase",
    permissions: [
      {
        id: PERMISSION.ORDER.PURCHASE.CREATE,
        name: "Create",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.ORDER.PURCHASE.READ,
        name: "Read",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.ORDER.PURCHASE.DELETE,
        name: "Delete",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.ORDER.PURCHASE.UPDATE,
        name: "Update",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.ORDER.PURCHASE.PROVIDER,
        name: "Set Provider for Purchasing",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.ORDER.PURCHASE.SHOP,
        name: "Set Shop for Purchasing",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.ORDER.PURCHASE.AMOUNT,
        name: "Set Amount for Purchasing",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 5,
    name: "Inventory",
    permissions: [
      {
        id: PERMISSION.INVENTORY.GOODS_RECEIPT.CREATE,
        name: "Create Good Receipt",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.INVENTORY.GOODS_RECEIPT.READ,
        name: "Read Good Receipt",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.INVENTORY.GOODS_RECEIPT.DELETE,
        name: "Delete Good Receipt",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.INVENTORY.GOODS_RECEIPT.UPDATE,
        name: "Update Good Receipt",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.INVENTORY.GOODS_ISSUE.CREATE,
        name: "Create Good Issue",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.INVENTORY.GOODS_ISSUE.READ,
        name: "Read Good Issue",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.INVENTORY.GOODS_ISSUE.DELETE,
        name: "Delete Good Issue",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.INVENTORY.GOODS_ISSUE.UPDATE,
        name: "Update Good Issue",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.INVENTORY.READ,
        name: "Read Summary",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 6,
    name: "Warehouse Management",
    permissions: [
      {
        id: PERMISSION.WAREHOUSE.CREATE,
        name: "Create",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.WAREHOUSE.READ,
        name: "Read",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.WAREHOUSE.DELETE,
        name: "Delete",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.WAREHOUSE.UPDATE,
        name: "Update",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 7,
    name: "Cost Management",
    permissions: [
      {
        id: PERMISSION.COST.CREATE,
        name: "Create",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.COST.READ,
        name: "Read",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.COST.DELETE,
        name: "Delete",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.COST.UPDATE,
        name: "Update",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 8,
    name: "Person Management",
    permissions: [
      {
        id: PERMISSION.PERSON.CREATE,
        name: "Create",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.PERSON.READ,
        name: "Read",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.PERSON.DELETE,
        name: "Delete",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.PERSON.UPDATE,
        name: "Update",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 9,
    name: "Thiết lập hệ thống",
    permissions: [
      {
        id: PERMISSION.CONFIGURATION,
        name: "Thiết lập hệ thống",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.AUDIT,
        name: "Lịch sử hoạt động",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.EMAIL.READ,
        name: "Xem log email",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 10,
    name: "Template",
    permissions: [
      {
        id: PERMISSION.TEMPLATE.CREATE,
        name: "Create",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.TEMPLATE.READ,
        name: "Read",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.TEMPLATE.DELETE,
        name: "Delete",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.TEMPLATE.UPDATE,
        name: "Update",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 11,
    name: "User Management",
    permissions: [
      {
        id: PERMISSION.USER.CREATE,
        name: "Invite",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.USER.READ,
        name: "Read",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.USER.DELETE,
        name: "Delete",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.USER.UPDATE,
        name: "Update",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 12,
    name: "Ecommerce Product",
    permissions: [
      {
        id: PERMISSION.ECOMMERCE.PRODUCT.CREATE,
        name: "Create",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.ECOMMERCE.PRODUCT.READ,
        name: "Read",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.ECOMMERCE.PRODUCT.UPDATE,
        name: "Update",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.ECOMMERCE.PRODUCT.DELETE,
        name: "Delete",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 13,
    name: "Ecommerce Order",
    permissions: [
      {
        id: PERMISSION.ECOMMERCE.ORDER.READ,
        name: "Read",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.ECOMMERCE.ORDER.UPDATE,
        name: "Update",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.ECOMMERCE.ORDER.DELETE,
        name: "Delete",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
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
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.POS.UPDATE,
        name: "UPDATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.POS.READ,
        name: "READ",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.POS.DELETE,
        name: "DELETE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.POS.ORDER,
        name: "POS Order",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
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
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.SHOP.UPDATE,
        name: "UPDATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.SHOP.READ,
        name: "READ",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.SHOP.DELETE,
        name: "DELETE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 17,
    name: "Ecommerce Setting",
    permissions: [
      {
        id: PERMISSION.ECOMMERCE.SETTING,
        name: "Setting",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 18,
    name: "Tax",
    permissions: [
      {
        id: PERMISSION.TAX.CREATE,
        name: "CREATE",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.TAX.READ,
        name: "READ",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.TAX.UPDATE,
        name: "UPDATE",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.TAX.DELETE,
        name: "DELETE",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 19,
    name: "Asset",
    permissions: [
      {
        id: PERMISSION.ASSET.CREATE,
        name: "CREATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.ASSET.READ,
        name: "READ",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.ASSET.DELETE,
        name: "DELETE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 20,
    name: "Debt",
    permissions: [
      {
        id: PERMISSION.DEBT.CREATE,
        name: "CREATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.DEBT.READ,
        name: "READ",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.DEBT.UPDATE,
        name: "UPDATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.DEBT.DELETE,
        name: "DELETE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 21,
    name: "Provider",
    permissions: [
      {
        id: PERMISSION.PROVIDER.CREATE,
        name: "CREATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.PROVIDER.READ,
        name: "READ",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.PROVIDER.UPDATE,
        name: "UPDATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.PROVIDER.DELETE,
        name: "DELETE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.PROVIDER.APPROVE,
        name: "APPROVE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 22,
    name: "Comment",
    permissions: [
      {
        id: PERMISSION.COMMENT.CREATE,
        name: "CREATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.COMMENT.READ,
        name: "READ",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.COMMENT.UPDATE,
        name: "UPDATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.COMMENT.DELETE,
        name: "DELETE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 23,
    name: "Student",
    permissions: [
      {
        id: PERMISSION.STUDENT.CREATE,
        name: "CREATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.STUDENT.READ,
        name: "READ",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.STUDENT.UPDATE,
        name: "UPDATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.STUDENT.DELETE,
        name: "DELETE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.STUDENT.CONFIGURE,
        name: "DELETE",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 24,
    name: "Student Class",
    permissions: [
      {
        id: PERMISSION.STUDENT.CLASS.CREATE,
        name: "CREATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.STUDENT.CLASS.READ,
        name: "READ",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.STUDENT.CLASS.UPDATE,
        name: "UPDATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.STUDENT.CLASS.DELETE,
        name: "DELETE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 25,
    name: "Student Bus",
    permissions: [
      {
        id: PERMISSION.STUDENT.BUS.CREATE,
        name: "CREATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.STUDENT.BUS.READ,
        name: "READ",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.STUDENT.BUS.UPDATE,
        name: "UPDATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.STUDENT.BUS.DELETE,
        name: "DELETE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 26,
    name: "Student Monthly Fee",
    permissions: [
      {
        id: PERMISSION.STUDENT.MONTHLY_FEE.CREATE,
        name: "CREATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.STUDENT.MONTHLY_FEE.READ,
        name: "READ",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.STUDENT.MONTHLY_FEE.UPDATE,
        name: "UPDATE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.STUDENT.MONTHLY_FEE.DELETE,
        name: "DELETE",
        enableType: PERMISSION_ENABLE_TYPE.ALLOW_CHOOSE_TYPE,
      },
    ],
  },
  {
    id: 27,
    name: "Student Daily Tracking",
    permissions: [
      {
        id: PERMISSION.STUDENT.DAILY_TRACKING.CREATE,
        name: "CREATE",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.STUDENT.DAILY_TRACKING.READ,
        name: "READ",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.STUDENT.DAILY_TRACKING.UPDATE,
        name: "UPDATE",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
      {
        id: PERMISSION.STUDENT.DAILY_TRACKING.SIGN,
        name: "SIGN",
        enableType: PERMISSION_ENABLE_TYPE.NOT_ALLOW_CHOOSE_TYPE,
      },
    ],
  },
];
