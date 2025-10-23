import {
    FireIcon,
    ClockIcon,
    CheckCircleIcon} from '@heroicons/react/24/outline';

export const kitchenOrders = [
    {
        id: 'ORD-2025-001',
        table: 'Bàn 05',
        items: [
            { name: 'Phở bò đặc biệt', quantity: 2, status: 'cooking', priority: 'high' },
            { name: 'Gỏi cuốn', quantity: 1, status: 'pending', priority: 'normal' },
            { name: 'Cơm chiên dương châu', quantity: 1, status: 'cooking', priority: 'high' }
        ],
        orderTime: '10 phút trước',
        status: 'cooking',
        priority: 'high',
        estimatedTime: '5 phút',
        waiter: 'Nguyễn Văn A'
    },
    {
        id: 'ORD-2025-002',
        table: 'Bàn 12',
        items: [
            { name: 'Bún chả Hà Nội', quantity: 3, status: 'cooking', priority: 'normal' },
            { name: 'Nem rán', quantity: 2, status: 'ready', priority: 'normal' }
        ],
        orderTime: '15 phút trước',
        status: 'cooking',
        priority: 'normal',
        estimatedTime: '8 phút',
        waiter: 'Trần Thị B'
    },
    {
        id: 'ORD-2025-003',
        table: 'Bàn 08',
        items: [
            { name: 'Lẩu Thái', quantity: 1, status: 'ready', priority: 'urgent' },
            { name: 'Mì xào hải sản', quantity: 2, status: 'ready', priority: 'urgent' }
        ],
        orderTime: '3 phút trước',
        status: 'ready',
        priority: 'urgent',
        estimatedTime: null,
        waiter: 'Lê Hoàng C'
    },
    {
        id: 'ORD-2025-004',
        table: 'Bàn 03',
        items: [
            { name: 'Bánh mì pate', quantity: 4, status: 'pending', priority: 'normal' },
            { name: 'Cà phê sữa đá', quantity: 4, status: 'pending', priority: 'normal' }
        ],
        orderTime: '2 phút trước',
        status: 'pending',
        priority: 'normal',
        estimatedTime: '12 phút',
        waiter: 'Phạm Minh D'
    },
    {
        id: 'ORD-2025-005',
        table: 'Bàn 15',
        items: [
            { name: 'Cơm tấm sườn bì', quantity: 2, status: 'cooking', priority: 'high' }
        ],
        orderTime: '8 phút trước',
        status: 'cooking',
        priority: 'high',
        estimatedTime: '6 phút',
        waiter: 'Hoàng Thu E'
    },
    {
        id: 'ORD-2025-006',
        table: 'Bàn 20',
        items: [
            { name: 'Pizza hải sản', quantity: 1, status: 'ready', priority: 'urgent' },
            { name: 'Salad Caesar', quantity: 2, status: 'ready', priority: 'urgent' }
        ],
        orderTime: '1 phút trước',
        status: 'ready',
        priority: 'urgent',
        estimatedTime: null,
        waiter: 'Nguyễn Văn F'
    }
];

export const statusConfig = {
    pending: {
        label: 'Chờ làm',
        icon: ClockIcon,
        gradient: 'from-yellow-500 to-orange-500',
        bg: 'from-yellow-500/10 to-orange-500/10',
        border: 'border-yellow-500/20',
        text: 'text-yellow-400',
        pulse: true
    },
    cooking: {
        label: 'Đang nấu',
        icon: FireIcon,
        gradient: 'from-red-500 to-rose-500',
        bg: 'from-red-500/10 to-rose-500/10',
        border: 'border-red-500/20',
        text: 'text-red-400',
        pulse: false
    },
    ready: {
        label: 'Sẵn sàng',
        icon: CheckCircleIcon,
        gradient: 'from-green-500 to-emerald-500',
        bg: 'from-green-500/10 to-emerald-500/10',
        border: 'border-green-500/20',
        text: 'text-green-400',
        pulse: true
    }
};

export const priorityConfig = {
    urgent: {
        label: 'Khẩn cấp',
        color: 'text-red-400',
        bg: 'bg-red-500/20',
        icon: '🔴'
    },
    high: {
        label: 'Ưu tiên cao',
        color: 'text-orange-400',
        bg: 'bg-orange-500/20',
        icon: '🟠'
    },
    normal: {
        label: 'Bình thường',
        color: 'text-blue-400',
        bg: 'bg-blue-500/20',
        icon: '🔵'
    }
};

export const itemStatusConfig = {
    pending: { label: 'Chờ', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
    cooking: { label: 'Đang nấu', color: 'text-red-400', bg: 'bg-red-500/20' },
    ready: { label: 'Xong', color: 'text-green-400', bg: 'bg-green-500/20' }
};

export const kitchenStats = [
  {
    id: 'total',
    label: 'Tổng đơn',
    value: 0, // Sẽ được tính động từ kitchenOrders.length
    icon: '📋',
    colorScheme: 'blue' as const,
    subtitle: undefined
  },
  {
    id: 'pending',
    label: 'Chờ làm',
    value: 0, // Sẽ được tính động
    icon: '⏰',
    colorScheme: 'yellow' as const,
    subtitle: undefined
  },
  {
    id: 'cooking',
    label: 'Đang nấu',
    value: 0, // Sẽ được tính động
    icon: '🔥',
    colorScheme: 'red' as const,
    subtitle: undefined
  },
  {
    id: 'ready',
    label: 'Sẵn sàng',
    value: 0, // Sẽ được tính động
    icon: '✅',
    colorScheme: 'green' as const,
    subtitle: undefined
  }
];