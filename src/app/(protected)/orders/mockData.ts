import { 
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

export const orders = [
  {
    id: 'ORD-2025-001',
    customer: 'Nguyễn Văn A',
    table: 'Bàn 05',
    items: 5,
    total: 450000,
    status: 'pending',
    time: '10 phút trước',
    avatar: 'https://i.pravatar.cc/40?img=1'
  },
  {
    id: 'ORD-2025-002',
    customer: 'Trần Thị B',
    table: 'Bàn 12',
    items: 3,
    total: 320000,
    status: 'preparing',
    time: '25 phút trước',
    avatar: 'https://i.pravatar.cc/40?img=2'
  },
  {
    id: 'ORD-2025-003',
    customer: 'Lê Hoàng C',
    table: 'Bàn 08',
    items: 7,
    total: 680000,
    status: 'completed',
    time: '1 giờ trước',
    avatar: 'https://i.pravatar.cc/40?img=3'
  },
  {
    id: 'ORD-2025-004',
    customer: 'Phạm Minh D',
    table: 'Bàn 03',
    items: 4,
    total: 390000,
    status: 'delivering',
    time: '15 phút trước',
    avatar: 'https://i.pravatar.cc/40?img=4'
  },
  {
    id: 'ORD-2025-005',
    customer: 'Hoàng Thu E',
    table: 'Bàn 15',
    items: 2,
    total: 180000,
    status: 'cancelled',
    time: '2 giờ trước',
    avatar: 'https://i.pravatar.cc/40?img=5'
  },
];

export const statusConfig = {
  pending: {
    label: 'Chờ xử lý',
    icon: ClockIcon,
    gradient: 'from-yellow-500 to-orange-500',
    bg: 'from-yellow-500/10 to-orange-500/10',
    border: 'border-yellow-500/20',
    text: 'text-yellow-400'
  },
  preparing: {
    label: 'Đang chuẩn bị',
    icon: ClockIcon,
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'from-blue-500/10 to-cyan-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400'
  },
  delivering: {
    label: 'Đang giao',
    icon: TruckIcon,
    gradient: 'from-purple-500 to-pink-500',
    bg: 'from-purple-500/10 to-pink-500/10',
    border: 'border-purple-500/20',
    text: 'text-purple-400'
  },
  completed: {
    label: 'Hoàn thành',
    icon: CheckCircleIcon,
    gradient: 'from-green-500 to-emerald-500',
    bg: 'from-green-500/10 to-emerald-500/10',
    border: 'border-green-500/20',
    text: 'text-green-400'
  },
  cancelled: {
    label: 'Đã hủy',
    icon: XCircleIcon,
    gradient: 'from-red-500 to-rose-500',
    bg: 'from-red-500/10 to-rose-500/10',
    border: 'border-red-500/20',
    text: 'text-red-400'
  }
};

export const ordersStats = [
  {
    id: 'total',
    label: 'Tổng đơn hàng',
    value: 0, // Sẽ được tính động từ orders.length
    icon: '📋',
    colorScheme: 'blue' as const,
    subtitle: undefined
  },
  {
    id: 'pending',
    label: 'Chờ xử lý',
    value: 0, // Sẽ được tính động
    icon: '⏳',
    colorScheme: 'yellow' as const,
    subtitle: undefined
  },
  {
    id: 'processing',
    label: 'Đang xử lý',
    value: 0, // Sẽ được tính động (preparing + delivering)
    icon: '🔄',
    colorScheme: 'purple' as const,
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
    id: 'cancelled',
    label: 'Đã hủy',
    value: 0, // Sẽ được tính động
    icon: '❌',
    colorScheme: 'red' as const,
    subtitle: undefined
  }
];