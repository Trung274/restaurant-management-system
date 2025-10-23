import { 
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon} from '@heroicons/react/24/outline';

export const staffMembers = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    avatar: 'https://i.pravatar.cc/150?img=11',
    role: 'Quản lý',
    position: 'manager',
    department: 'Quản lý',
    email: 'nguyenvana@restaurant.com',
    phone: '0901234567',
    status: 'active',
    shift: 'Sáng',
    salary: 15000000,
    joinDate: '2022-01-15',
    rating: 4.9,
    tasksCompleted: 342,
    performance: 'excellent'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    avatar: 'https://i.pravatar.cc/150?img=5',
    role: 'Phục vụ',
    position: 'waiter',
    department: 'Phục vụ',
    email: 'tranthib@restaurant.com',
    phone: '0902345678',
    status: 'active',
    shift: 'Chiều',
    salary: 8000000,
    joinDate: '2022-03-20',
    rating: 4.7,
    tasksCompleted: 456,
    performance: 'good'
  },
  {
    id: 3,
    name: 'Lê Hoàng C',
    avatar: 'https://i.pravatar.cc/150?img=12',
    role: 'Đầu bếp',
    position: 'chef',
    department: 'Bếp',
    email: 'lehoangc@restaurant.com',
    phone: '0903456789',
    status: 'active',
    shift: 'Sáng',
    salary: 12000000,
    joinDate: '2021-06-10',
    rating: 4.8,
    tasksCompleted: 567,
    performance: 'excellent'
  },
  {
    id: 4,
    name: 'Phạm Minh D',
    avatar: 'https://i.pravatar.cc/150?img=13',
    role: 'Phục vụ',
    position: 'waiter',
    department: 'Phục vụ',
    email: 'phamminhd@restaurant.com',
    phone: '0904567890',
    status: 'active',
    shift: 'Tối',
    salary: 8500000,
    joinDate: '2023-02-15',
    rating: 4.6,
    tasksCompleted: 234,
    performance: 'good'
  },
  {
    id: 5,
    name: 'Hoàng Thu E',
    avatar: 'https://i.pravatar.cc/150?img=9',
    role: 'Thu ngân',
    position: 'cashier',
    department: 'Tài chính',
    email: 'hoangthue@restaurant.com',
    phone: '0905678901',
    status: 'on_leave',
    shift: 'Chiều',
    salary: 7500000,
    joinDate: '2022-08-01',
    rating: 4.5,
    tasksCompleted: 312,
    performance: 'average'
  },
  {
    id: 6,
    name: 'Võ Văn F',
    avatar: 'https://i.pravatar.cc/150?img=14',
    role: 'Đầu bếp phụ',
    position: 'sous_chef',
    department: 'Bếp',
    email: 'vovanf@restaurant.com',
    phone: '0906789012',
    status: 'active',
    shift: 'Chiều',
    salary: 10000000,
    joinDate: '2022-11-20',
    rating: 4.7,
    tasksCompleted: 423,
    performance: 'good'
  },
  {
    id: 7,
    name: 'Đặng Thị G',
    avatar: 'https://i.pravatar.cc/150?img=10',
    role: 'Phục vụ',
    position: 'waiter',
    department: 'Phục vụ',
    email: 'dangthig@restaurant.com',
    phone: '0907890123',
    status: 'inactive',
    shift: 'Sáng',
    salary: 7800000,
    joinDate: '2023-05-10',
    rating: 4.3,
    tasksCompleted: 156,
    performance: 'average'
  },
  {
    id: 8,
    name: 'Bùi Minh H',
    avatar: 'https://i.pravatar.cc/150?img=15',
    role: 'Bảo vệ',
    position: 'security',
    department: 'An ninh',
    email: 'buiminhh@restaurant.com',
    phone: '0908901234',
    status: 'active',
    shift: 'Tối',
    salary: 6500000,
    joinDate: '2021-12-01',
    rating: 4.4,
    tasksCompleted: 289,
    performance: 'average'
  }
];

export const statusConfig = {
  active: {
    label: 'Đang làm',
    gradient: 'from-green-500 to-emerald-500',
    bg: 'from-green-500/10 to-emerald-500/10',
    border: 'border-green-500/20',
    text: 'text-green-400',
    icon: CheckCircleIcon
  },
  on_leave: {
    label: 'Nghỉ phép',
    gradient: 'from-orange-500 to-amber-500',
    bg: 'from-orange-500/10 to-amber-500/10',
    border: 'border-orange-500/20',
    text: 'text-orange-400',
    icon: ClockIcon
  },
  inactive: {
    label: 'Không hoạt động',
    gradient: 'from-red-500 to-rose-500',
    bg: 'from-red-500/10 to-rose-500/10',
    border: 'border-red-500/20',
    text: 'text-red-400',
    icon: XCircleIcon
  }
};

export const positionConfig = {
  manager: { label: 'Quản lý', color: 'from-purple-500 to-pink-500', icon: '👔' },
  chef: { label: 'Đầu bếp', color: 'from-red-500 to-orange-500', icon: '👨‍🍳' },
  sous_chef: { label: 'Đầu bếp phụ', color: 'from-orange-500 to-amber-500', icon: '🍳' },
  waiter: { label: 'Phục vụ', color: 'from-blue-500 to-cyan-500', icon: '🍽️' },
  cashier: { label: 'Thu ngân', color: 'from-green-500 to-emerald-500', icon: '💰' },
  security: { label: 'Bảo vệ', color: 'from-gray-500 to-slate-500', icon: '🛡️' }
};

export const performanceConfig = {
  excellent: { label: 'Xuất sắc', color: 'text-green-400', bg: 'bg-green-500/20' },
  good: { label: 'Tốt', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  average: { label: 'Trung bình', color: 'text-yellow-400', bg: 'bg-yellow-500/20' }
};

export const staffStats = [
  {
    id: 'total',
    label: 'Tổng nhân viên',
    value: 0, // Sẽ được calculate động từ staffMembers.length
    icon: '👥',
    colorScheme: 'blue' as const,
    subtitle: undefined
  },
  {
    id: 'active',
    label: 'Đang làm việc',
    value: 0, // Sẽ được calculate động
    icon: '✅',
    colorScheme: 'green' as const,
    subtitle: undefined
  },
  {
    id: 'on_leave',
    label: 'Nghỉ phép',
    value: 0, // Sẽ được calculate động
    icon: '🏖️',
    colorScheme: 'orange' as const,
    subtitle: undefined
  },
  {
    id: 'inactive',
    label: 'Không hoạt động',
    value: 0, // Sẽ được calculate động
    icon: '⛔',
    colorScheme: 'red' as const,
    subtitle: undefined
  }
];