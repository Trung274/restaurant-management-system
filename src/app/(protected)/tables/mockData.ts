import { 
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export const tables = [
  {
    id: 1,
    number: '01',
    capacity: 4,
    status: 'available',
    floor: 'Tầng 1',
    section: 'VIP',
    currentGuests: 0,
    orderId: null,
    duration: null
  },
  {
    id: 2,
    number: '02',
    capacity: 6,
    status: 'occupied',
    floor: 'Tầng 1',
    section: 'Thường',
    currentGuests: 5,
    orderId: 'ORD-2025-045',
    duration: '45 phút'
  },
  {
    id: 3,
    number: '03',
    capacity: 2,
    status: 'reserved',
    floor: 'Tầng 1',
    section: 'Thường',
    currentGuests: 0,
    orderId: 'ORD-2025-046',
    duration: null,
    reservedTime: '19:00'
  },
  {
    id: 4,
    number: '04',
    capacity: 8,
    status: 'occupied',
    floor: 'Tầng 1',
    section: 'VIP',
    currentGuests: 7,
    orderId: 'ORD-2025-047',
    duration: '1 giờ 20 phút'
  },
  {
    id: 5,
    number: '05',
    capacity: 4,
    status: 'available',
    floor: 'Tầng 1',
    section: 'Thường',
    currentGuests: 0,
    orderId: null,
    duration: null
  },
  {
    id: 6,
    number: '06',
    capacity: 6,
    status: 'cleaning',
    floor: 'Tầng 1',
    section: 'Thường',
    currentGuests: 0,
    orderId: null,
    duration: null
  },
  {
    id: 7,
    number: '07',
    capacity: 4,
    status: 'available',
    floor: 'Tầng 2',
    section: 'Thường',
    currentGuests: 0,
    orderId: null,
    duration: null
  },
  {
    id: 8,
    number: '08',
    capacity: 10,
    status: 'occupied',
    floor: 'Tầng 2',
    section: 'VIP',
    currentGuests: 9,
    orderId: 'ORD-2025-048',
    duration: '30 phút'
  },
  {
    id: 9,
    number: '09',
    capacity: 4,
    status: 'reserved',
    floor: 'Tầng 2',
    section: 'Thường',
    currentGuests: 0,
    orderId: 'ORD-2025-049',
    duration: null,
    reservedTime: '20:30'
  },
  {
    id: 10,
    number: '10',
    capacity: 6,
    status: 'available',
    floor: 'Tầng 2',
    section: 'VIP',
    currentGuests: 0,
    orderId: null,
    duration: null
  },
  {
    id: 11,
    number: '11',
    capacity: 2,
    status: 'occupied',
    floor: 'Tầng 2',
    section: 'Thường',
    currentGuests: 2,
    orderId: 'ORD-2025-050',
    duration: '15 phút'
  },
  {
    id: 12,
    number: '12',
    capacity: 8,
    status: 'available',
    floor: 'Tầng 2',
    section: 'VIP',
    currentGuests: 0,
    orderId: null,
    duration: null
  },
];

export const statusConfig = {
  available: {
    label: 'Trống',
    icon: CheckCircleIcon,
    gradient: 'from-green-500 to-emerald-500',
    bg: 'from-green-500/10 to-emerald-500/10',
    border: 'border-green-500/20',
    text: 'text-green-400',
    pulse: true
  },
  occupied: {
    label: 'Đang phục vụ',
    icon: UserGroupIcon,
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'from-blue-500/10 to-cyan-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
    pulse: false
  },
  reserved: {
    label: 'Đã đặt',
    icon: ClockIcon,
    gradient: 'from-orange-500 to-amber-500',
    bg: 'from-orange-500/10 to-amber-500/10',
    border: 'border-orange-500/20',
    text: 'text-orange-400',
    pulse: false
  },
  cleaning: {
    label: 'Đang dọn',
    icon: XMarkIcon,
    gradient: 'from-purple-500 to-pink-500',
    bg: 'from-purple-500/10 to-pink-500/10',
    border: 'border-purple-500/20',
    text: 'text-purple-400',
    pulse: false
  }
};

export const tableStats = [
  {
    id: 'total',
    label: 'Tổng số bàn',
    value: 0, // Sẽ được calculate động từ tables.length
    colorScheme: 'blue' as const,
  },
  {
    id: 'available',
    label: 'Bàn trống',
    value: 0, // Sẽ được calculate động
    colorScheme: 'green' as const,
  },
  {
    id: 'occupied',
    label: 'Đang phục vụ',
    value: 0, // Sẽ được calculate động
    colorScheme: 'cyan' as const,
  },
  {
    id: 'reserved',
    label: 'Đã đặt trước',
    value: 0, // Sẽ được calculate động
    colorScheme: 'orange' as const,
  },
  {
    id: 'cleaning',
    label: 'Đang dọn dẹp',
    value: 0, // Sẽ được calculate động
    colorScheme: 'purple' as const,
  }
];