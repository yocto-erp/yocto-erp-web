import { AUDIT_ROOT_PATH } from '../../Audit/constants';
import { TAGGING_ROOT_PATH } from '../../tagging/constants';
import { USER_ROOT_PATH } from '../../user/constants';
import { PERMISSION } from '../../../constants';

export const SIDE_BAR_MENU = {
  main: [
    {
      header: 'Dashboard',
      isHeader: true,
      iconName: 'flaticon-home',
      link: '/dashboard',
      index: 'dashboard',
      exact: true,
    },
  ],
  utils: [
    {
      header: 'Bán hàng',
      isHeader: true,
      iconName: 'flaticon-network',
      link: '/sale',
      index: 'sale',
      permission: PERMISSION.ORDER.SALE.READ,
    },
    {
      header: 'Mua hàng',
      isHeader: true,
      iconName: 'flaticon-network',
      link: '/purchase',
      index: 'purchase',
      permission: PERMISSION.ORDER.PURCHASE.READ,
    },
    {
      header: 'Thu chi',
      isHeader: true,
      iconName: 'flaticon-network',
      link: '/cost',
      index: 'cost',
      permission: PERMISSION.COST.READ,
    },
    {
      header: 'Nhập, xuất kho',
      isHeader: true,
      iconName: 'flaticon-network',
      link: '/inventory',
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
          link: '/student',
          index: 'student.list',
        },
        {
          header: 'Monthly Fee',
          isHeader: true,
          link: '/student-monthly-fee',
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
          link: '/tools/mail-merge',
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
          link: '/survey-management',
          permission: PERMISSION.SURVEY.READ,
          index: 'management.survey-management',
        },
        {
          header: 'Kho',
          isHeader: true,
          link: '/warehouse',
          permission: PERMISSION.WAREHOUSE.READ,
          index: 'management.warehouse',
        },

        {
          header: 'Sản phẩm',
          link: '/product',
          index: 'management.product',
          permission: PERMISSION.PRODUCT.READ,
          isHeader: true,
        },
        {
          header: 'Khách hàng - Company',
          link: '/partner',
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
        {
          header: 'Nhân Viên',
          isHeader: true,
          link: '/employee',
          permission: PERMISSION.EMPLOYEE.READ,
          index: 'management.employee',
        },
        {
          header: 'Shift-Work',
          isHeader: true,
          link: '/shift-work',
          permission: PERMISSION.SHIFT.READ,
          index: 'management.shiftWork',
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
          link: '/template/print',
          index: 'template.print',
        },
        {
          header: 'Mẫu Email',
          link: '/template/email',
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
          link: '/configuration/email',
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
      children: [
        {
          permission: PERMISSION.EMAIL.READ,
          header: 'Email',
          link: '/log/email',
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
