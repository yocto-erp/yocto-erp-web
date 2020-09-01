export const SIDE_BAR_MENU = {
  main: [
    {
      header: 'Dashboard',
      isHeader: true,
      iconName: 'flaticon-home',
      link: '/',
      index: 'dashboard',
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
          header: 'Mua hàng',
          link: '/purchase',
          index: 'management.purchase',
        },
        {
          header: 'Kho',
          link: '/warehouse',
          index: 'management.warehouse',
        },
        {
          header: 'Hàng tồn kho',
          link: '/inventory',
          index: 'management.inventory',
          isHeader: true,
        },
        {
          header: 'Sản phẩm',
          link: '/product',
          index: 'management.product',
          isHeader: true,
        },
        {
          header: 'Khách hàng - Đối tác',
          link: '/partner',
          index: 'management.partner',
          isHeader: true,
        },
      ],
    },
  ],
};
