import { AUDIT_ROOT_PATH } from '../../Audit/constants';
import { TAGGING_ROOT_PATH } from '../../tagging/constants';
import { USER_ROOT_PATH } from '../../user/constants';
import { ADMIN_PATH, PERMISSION } from '../../../constants';
import { SALE_ROOT_PATH } from '../../order/sale/constants';
import { PURCHASE_ROOT_PATH } from '../../order/purchase/constants';
import { COST_ROOT_PATH } from '../../cost/constants';
import { INVENTORY_ROOT_PATH } from '../../inventory/constants';
import { STUDENT_ROOT_PATH } from '../../student/constants';
import { STUDENT_MONTHLY_ROOT_PATH } from '../../student/monthly-fee/constants';
import { SURVEY_MANAGEMENT_ROOT_PATH } from '../../survey/Admin/constants';
import { WAREHOUSE_ROOT_PATH } from '../../warehouse/constants';
import { PRODUCT_ROOT_PATH } from '../../product/constants';
import { PARTNER_ROOT_PATH } from '../../partner/constants';
import { LOG_EMAIL_ROOT_PATH } from '../../log/constants';
import { CONFIGURATION_EMAIL_ROOT_PATH } from '../../configuration/constants';
import {
  TEMPLATE_EMAIL_ROOT_PATH,
  TEMPLATE_PRINT_ROOT_PATH,
} from '../../template/constants';
import { MAIL_MERGE_ROOT_PATH } from '../../tools/mail-merge/constants';

export const SIDE_BAR_MENU = {
  main: [
    {
      header: 'Dashboard',
      isHeader: true,
      iconName: 'flaticon-home',
      link: `${ADMIN_PATH}/dashboard`,
      index: 'dashboard',
      exact: true,
    },
  ],
  utils: [
    {
      header: 'Bán hàng',
      isHeader: true,
      iconName: 'flaticon-network',
      link: SALE_ROOT_PATH,
      index: 'sale',
      permission: PERMISSION.ORDER.SALE.READ,
    },
    {
      header: 'Mua hàng',
      isHeader: true,
      iconName: 'flaticon-network',
      link: PURCHASE_ROOT_PATH,
      index: 'purchase',
      permission: PERMISSION.ORDER.PURCHASE.READ,
    },
    {
      header: 'Thu chi',
      isHeader: true,
      iconName: 'flaticon-network',
      link: COST_ROOT_PATH,
      index: 'cost',
      permission: PERMISSION.COST.READ,
    },
    {
      header: 'Nhập, xuất kho',
      isHeader: true,
      iconName: 'flaticon-network',
      link: INVENTORY_ROOT_PATH,
      index: 'inventory',
      permission: [
        PERMISSION.INVENTORY.GOODS_ISSUE.READ,
        PERMISSION.INVENTORY.GOODS_RECEIPT.READ,
      ],
    },
    {
      header: 'Student',
      isHeader: true,
      iconName: 'flaticon-user-2',
      index: 'student',
      link: '',
      permission: PERMISSION.CUSTOMER.READ,
      children: [
        {
          header: 'List Student',
          isHeader: true,
          link: STUDENT_ROOT_PATH,
          index: 'student.list',
        },
        {
          header: 'Monthly Fee',
          isHeader: true,
          link: STUDENT_MONTHLY_ROOT_PATH,
          index: 'student.monthly-fee',
        },
      ],
    },
    {
      header: 'Công cụ',
      isHeader: true,
      iconName: 'flaticon-controls',
      index: 'tools',
      link: '',
      children: [
        {
          header: 'Mail Merge',
          isHeader: true,
          link: MAIL_MERGE_ROOT_PATH,
          index: 'tools.mail-merge',
        },
      ],
    },
  ],
  management: [
    {
      header: 'Quản lý',
      isHeader: true,
      iconName: 'flaticon-list',
      index: 'management',
      link: '',
      children: [
        {
          header: 'Survey',
          isHeader: true,
          link: SURVEY_MANAGEMENT_ROOT_PATH,
          permission: PERMISSION.SURVEY.READ,
          index: 'management.survey-management',
        },
        {
          header: 'Kho',
          isHeader: true,
          link: WAREHOUSE_ROOT_PATH,
          permission: PERMISSION.WAREHOUSE.READ,
          index: 'management.warehouse',
        },
        {
          header: 'Sản phẩm',
          link: PRODUCT_ROOT_PATH,
          index: 'management.product',
          permission: PERMISSION.PRODUCT.READ,
          isHeader: true,
        },
        {
          header: 'Khách hàng - Company',
          link: PARTNER_ROOT_PATH,
          index: 'management.partner',
          permission: [PERMISSION.CUSTOMER.READ, PERMISSION.COMPANY.READ],
          isHeader: true,
        },
        {
          header: 'Labels',
          link: TAGGING_ROOT_PATH,
          index: 'management.label',
          isHeader: true,
        },
        {
          header: 'User',
          permission: PERMISSION.USER.READ,
          isHeader: true,
          iconName: 'flaticon-user',
          link: USER_ROOT_PATH,
          index: 'management.user',
        },
      ],
    },
    {
      header: 'Mẫu tài liệu',
      link: '',
      iconName: 'flaticon-folder-2',
      isHeader: true,
      index: 'template',
      permission: PERMISSION.TEMPLATE.READ,
      children: [
        {
          header: 'Mẫu in',
          link: TEMPLATE_PRINT_ROOT_PATH,
          index: 'template.print',
        },
        {
          header: 'Mẫu Email',
          link: TEMPLATE_EMAIL_ROOT_PATH,
          index: 'template.email',
        },
      ],
    },
    {
      header: 'Cấu hình',
      permission: PERMISSION.CONFIGURATION,
      isHeader: true,
      iconName: 'flaticon-settings-3',
      index: 'configuration',
      link: '',
      children: [
        {
          header: 'Email',
          link: CONFIGURATION_EMAIL_ROOT_PATH,
          index: 'configuration.email',
        },
      ],
    },
    {
      header: 'Log',
      isHeader: true,
      iconName: 'flaticon-time',
      index: 'log',
      link: '',
      permission: [PERMISSION.EMAIL.READ, PERMISSION.AUDIT],
      children: [
        {
          permission: PERMISSION.EMAIL.READ,
          header: 'Email',
          link: LOG_EMAIL_ROOT_PATH,
          index: 'log.email',
        },
        {
          permission: PERMISSION.AUDIT,
          header: 'Audit',
          link: AUDIT_ROOT_PATH,
          index: 'log.audit',
        },
      ],
    },
  ],
};
