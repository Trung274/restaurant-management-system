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

export const quickActions = [
  {
    id: 1,
    title: 'Thực đơn',
    description: 'Quản lý món ăn & giá',
    emoji: '🍽️',
    gradientFrom: 'from-blue-600/20',
    gradientTo: 'to-purple-600/20',
  },
  {
    id: 2,
    title: 'Nhân viên',
    description: 'Quản lý ca làm việc',
    emoji: '👥',
    gradientFrom: 'from-green-600/20',
    gradientTo: 'to-emerald-600/20',
  },
  {
    id: 3,
    title: 'Báo cáo',
    description: 'Xem phân tích chi tiết',
    emoji: '📈',
    gradientFrom: 'from-orange-600/20',
    gradientTo: 'to-red-600/20',
  },
];