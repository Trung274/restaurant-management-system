export const revenueData = {
  today: {
    revenue: 12500000,
    orders: 47,
    customers: 38,
    avgOrderValue: 265957,
    change: 12.5
  },
  week: {
    revenue: 78400000,
    orders: 312,
    customers: 245,
    avgOrderValue: 251282,
    change: 8.3
  },
  month: {
    revenue: 342000000,
    orders: 1456,
    customers: 1089,
    avgOrderValue: 234890,
    change: 15.7
  },
  year: {
    revenue: 3850000000,
    orders: 15678,
    customers: 8934,
    avgOrderValue: 245567,
    change: 22.4
  }
};

export const dailyRevenue = [
  { day: 'T2', revenue: 11200000, orders: 42 },
  { day: 'T3', revenue: 13500000, orders: 51 },
  { day: 'T4', revenue: 10800000, orders: 39 },
  { day: 'T5', revenue: 14200000, orders: 54 },
  { day: 'T6', revenue: 16800000, orders: 63 },
  { day: 'T7', revenue: 19400000, orders: 72 },
  { day: 'CN', revenue: 15600000, orders: 58 }
];

export const topProducts = [
  { name: 'Phở bò đặc biệt', sold: 234, revenue: 19890000, growth: 15.2 },
  { name: 'Bún chả Hà Nội', sold: 198, revenue: 14850000, growth: 12.8 },
  { name: 'Lẩu Thái hải sản', sold: 89, revenue: 31150000, growth: 22.5 },
  { name: 'Cơm chiên dương châu', sold: 167, revenue: 10855000, growth: 8.4 },
  { name: 'Cà phê sữa đá', sold: 312, revenue: 7800000, growth: 18.9 }
];

export const paymentMethods = [
  { method: 'Tiền mặt', amount: 45600000, percentage: 40, color: 'from-green-500 to-emerald-500' },
  { method: 'Chuyển khoản', amount: 38400000, percentage: 34, color: 'from-blue-500 to-cyan-500' },
  { method: 'Thẻ tín dụng', amount: 22800000, percentage: 20, color: 'from-purple-500 to-pink-500' },
  { method: 'Ví điện tử', amount: 6840000, percentage: 6, color: 'from-orange-500 to-amber-500' }
];

export const revenueByTimeSlot = [
  { time: '7-10h', revenue: 8400000, percentage: 12, color: 'from-yellow-500 to-orange-500' },
  { time: '10-14h', revenue: 25200000, percentage: 36, color: 'from-orange-500 to-red-500' },
  { time: '14-17h', revenue: 11200000, percentage: 16, color: 'from-blue-500 to-cyan-500' },
  { time: '17-22h', revenue: 25200000, percentage: 36, color: 'from-purple-500 to-pink-500' }
];

export const revenueStats = [
  {
    id: 'revenue',
    label: 'Tổng doanh thu',
    value: 0, // Sẽ được tính động từ currentData.revenue
    icon: '💰',
    colorScheme: 'green' as const,
    subtitle: undefined // Sẽ được set động với change percentage
  },
  {
    id: 'orders',
    label: 'Tổng đơn hàng',
    value: 0, // Sẽ được tính động
    icon: '🛒',
    colorScheme: 'blue' as const,
    subtitle: 'Đơn đã hoàn thành'
  },
  {
    id: 'customers',
    label: 'Tổng khách hàng',
    value: 0, // Sẽ được tính động
    icon: '👥',
    colorScheme: 'purple' as const,
    subtitle: 'Khách đã phục vụ'
  },
  {
    id: 'avgOrderValue',
    label: 'Giá trị TB/đơn',
    value: 0, // Sẽ được tính động
    icon: '💵',
    colorScheme: 'orange' as const,
    subtitle: 'Trung bình mỗi đơn'
  }
];