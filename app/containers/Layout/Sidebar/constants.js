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
    },
    {
      header: 'Mua hàng',
      isHeader: true,
      iconName: 'flaticon-network',
      link: '/purchase',
      index: 'purchase',
    },
    {
      header: 'Thu chi',
      isHeader: true,
      iconName: 'flaticon-network',
      link: '/cost',
      index: 'cost',
    },
    {
      header: 'Nhập, xuất kho',
      isHeader: true,
      iconName: 'flaticon-network',
      link: '/inventory',
      index: 'inventory',
    },
    {
      header: 'Student',
      isHeader: true,
      iconName: 'flaticon-user-2',
      index: 'student',
      link: '',
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
          index: 'management.survey-management',
        },
        {
          header: 'Kho',
          isHeader: true,
          link: '/warehouse',
          index: 'management.warehouse',
        },
        {
          header: 'Sản phẩm',
          link: '/product',
          index: 'management.product',
          isHeader: true,
        },
        {
          header: 'Khách hàng - Company',
          link: '/partner',
          index: 'management.partner',
          isHeader: true,
        },
      ],
    },
    {
      header: 'Mẫu tài liệu',
      link: '',
      iconName: 'flaticon-folder-2',
      isHeader: true,
      index: 'template',
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
  ],
};
