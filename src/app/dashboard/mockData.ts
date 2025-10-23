export const dashboardStats = [
  {
    id: 'revenue',
    label: 'Doanh thu hôm nay',
    value: '45.2M',
    icon: '💰',
    colorScheme: 'green' as const,
    subtitle: '↗ +18.5% so với hôm qua'
  },
  {
    id: 'orders',
    label: 'Đơn hàng',
    value: '142',
    icon: '📋',
    colorScheme: 'blue' as const,
    subtitle: '↗ +12.5% đơn hôm nay'
  },
  {
    id: 'tables',
    label: 'Bàn đang phục vụ',
    value: '18/25',
    icon: '🪑',
    colorScheme: 'purple' as const,
    subtitle: '72% công suất'
  },
  {
    id: 'pending',
    label: 'Đơn chờ bếp',
    value: '7',
    icon: '🔔',
    colorScheme: 'orange' as const,
    subtitle: '⏱️ Avg 12m thời gian chờ'
  }
];