import { 
  ChartBarIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  SparklesIcon} from '@heroicons/react/24/outline';

export const reportTypes = [
  {
    id: 'revenue',
    name: 'Báo cáo doanh thu',
    description: 'Chi tiết doanh thu theo thời gian và sản phẩm',
    icon: CurrencyDollarIcon,
    gradient: 'from-green-500 to-emerald-500',
    bg: 'from-green-500/10 to-emerald-500/10',
    border: 'border-green-500/20',
    emoji: '💰',
    count: 156
  },
  {
    id: 'orders',
    name: 'Báo cáo đơn hàng',
    description: 'Thống kê đơn hàng và trạng thái xử lý',
    icon: ShoppingBagIcon,
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'from-blue-500/10 to-cyan-500/10',
    border: 'border-blue-500/20',
    emoji: '📦',
    count: 1456
  },
  {
    id: 'customers',
    name: 'Báo cáo khách hàng',
    description: 'Phân tích hành vi và xu hướng khách hàng',
    icon: UserGroupIcon,
    gradient: 'from-purple-500 to-pink-500',
    bg: 'from-purple-500/10 to-pink-500/10',
    border: 'border-purple-500/20',
    emoji: '👥',
    count: 1089
  },
  {
    id: 'inventory',
    name: 'Báo cáo tồn kho',
    description: 'Quản lý nguyên vật liệu và hàng tồn',
    icon: ChartBarIcon,
    gradient: 'from-orange-500 to-amber-500',
    bg: 'from-orange-500/10 to-amber-500/10',
    border: 'border-orange-500/20',
    emoji: '📊',
    count: 234
  },
  {
    id: 'staff',
    name: 'Báo cáo nhân viên',
    description: 'Hiệu suất và chấm công nhân viên',
    icon: UserGroupIcon,
    gradient: 'from-indigo-500 to-violet-500',
    bg: 'from-indigo-500/10 to-violet-500/10',
    border: 'border-indigo-500/20',
    emoji: '👔',
    count: 8
  },
  {
    id: 'performance',
    name: 'Báo cáo hiệu suất',
    description: 'Đánh giá tổng thể hoạt động nhà hàng',
    icon: SparklesIcon,
    gradient: 'from-pink-500 to-rose-500',
    bg: 'from-pink-500/10 to-rose-500/10',
    border: 'border-pink-500/20',
    emoji: '⚡',
    count: 12
  }
];

export const recentReports = [
  {
    id: 1,
    name: 'Báo cáo doanh thu tháng 10/2024',
    type: 'revenue',
    date: '2024-10-31',
    size: '2.4 MB',
    format: 'PDF',
    status: 'completed',
    generatedBy: 'Admin User',
    downloads: 23
  },
  {
    id: 2,
    name: 'Phân tích khách hàng Q4 2024',
    type: 'customers',
    date: '2024-10-28',
    size: '1.8 MB',
    format: 'Excel',
    status: 'completed',
    generatedBy: 'Manager',
    downloads: 15
  },
  {
    id: 3,
    name: 'Báo cáo đơn hàng tuần 43',
    type: 'orders',
    date: '2024-10-25',
    size: '890 KB',
    format: 'PDF',
    status: 'completed',
    generatedBy: 'Admin User',
    downloads: 8
  },
  {
    id: 4,
    name: 'Tồn kho nguyên vật liệu - Tháng 10',
    type: 'inventory',
    date: '2024-10-22',
    size: '1.2 MB',
    format: 'Excel',
    status: 'completed',
    generatedBy: 'Chef Manager',
    downloads: 12
  },
  {
    id: 5,
    name: 'Chấm công nhân viên tháng 10',
    type: 'staff',
    date: '2024-10-20',
    size: '650 KB',
    format: 'PDF',
    status: 'processing',
    generatedBy: 'HR Manager',
    downloads: 0
  },
  {
    id: 6,
    name: 'Báo cáo hiệu suất tổng thể Q3',
    type: 'performance',
    date: '2024-10-15',
    size: '3.2 MB',
    format: 'PDF',
    status: 'completed',
    generatedBy: 'Admin User',
    downloads: 34
  }
];

export const scheduledReports = [
  { name: 'Doanh thu hàng ngày', frequency: 'Hàng ngày 23:00', nextRun: '2024-10-23 23:00', active: true },
  { name: 'Tổng kết tuần', frequency: 'Chủ nhật 22:00', nextRun: '2024-10-27 22:00', active: true },
  { name: 'Báo cáo tháng', frequency: 'Ngày 1 hàng tháng', nextRun: '2024-11-01 00:00', active: true },
  { name: 'Phân tích quý', frequency: 'Mỗi quý', nextRun: '2025-01-01 00:00', active: false }
];

export const reportsStats = [
  {
    id: 'total',
    label: 'Tổng báo cáo',
    value: 0, // Sẽ được tính động từ recentReports.length
    icon: '📄',
    colorScheme: 'blue' as const,
    subtitle: undefined
  },
  {
    id: 'completed',
    label: 'Hoàn thành',
    value: 0, // Sẽ được tính động
    icon: '✅',
    colorScheme: 'green' as const,
    subtitle: undefined
  },
  {
    id: 'processing',
    label: 'Đang xử lý',
    value: 0, // Sẽ được tính động
    icon: '⏳',
    colorScheme: 'orange' as const,
    subtitle: undefined
  },
  {
    id: 'downloads',
    label: 'Lượt tải',
    value: 0, // Sẽ được tính động (tổng downloads)
    icon: '🔥',
    colorScheme: 'purple' as const,
    subtitle: undefined
  }
];