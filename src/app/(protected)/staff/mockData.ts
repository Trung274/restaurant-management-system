import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

export const staffMembers = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    avatar: 'https://i.pravatar.cc/150?img=11',
    role: 'Quản trị viên',
    position: 'admin',
    department: 'Ban Giám Đốc',
    email: 'admin@restaurant.com',
    phone: '0901234567',
    status: 'active',
    shift: 'Hành chính',
    joinDate: '2022-01-15',
    rating: 5.0,
    tasksCompleted: 1542
  },
  {
    id: 2,
    name: 'Trần Thị B',
    avatar: 'https://i.pravatar.cc/150?img=5',
    role: 'Quản lý',
    position: 'manager',
    department: 'Quản lý',
    email: 'manager@restaurant.com',
    phone: '0902345678',
    status: 'active',
    shift: 'Sáng',
    joinDate: '2022-03-20',
    rating: 4.8,
    tasksCompleted: 856
  },
  {
    id: 3,
    name: 'Lê Hoàng C',
    avatar: 'https://i.pravatar.cc/150?img=12',
    role: 'Vận hành',
    position: 'operations',
    department: 'Bếp',
    email: 'chef@restaurant.com',
    phone: '0903456789',
    status: 'active',
    shift: 'Sáng',
    joinDate: '2021-06-10',
    rating: 4.7,
    tasksCompleted: 567
  },
  {
    id: 4,
    name: 'Phạm Minh D',
    avatar: 'https://i.pravatar.cc/150?img=13',
    role: 'Vận hành',
    position: 'operations',
    department: 'Phục vụ',
    email: 'waiter@restaurant.com',
    phone: '0904567890',
    status: 'on_leave',
    shift: 'Tối',
    joinDate: '2023-02-15',
    rating: 4.5,
    tasksCompleted: 234
  },
  {
    id: 5,
    name: 'Hoàng Thu E',
    avatar: 'https://i.pravatar.cc/150?img=9',
    role: 'Kế toán',
    position: 'accountant',
    department: 'Tài chính',
    email: 'accountant@restaurant.com',
    phone: '0905678901',
    status: 'active',
    shift: 'Hành chính',
    joinDate: '2022-08-01',
    rating: 4.9,
    tasksCompleted: 312
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
  admin: { label: 'Quản trị viên', color: 'from-purple-500 to-pink-500', icon: '👑' },
  manager: { label: 'Quản lý', color: 'from-blue-500 to-cyan-500', icon: '👔' },
  operations: { label: 'Vận hành', color: 'from-orange-500 to-amber-500', icon: '⚙️' },
  accountant: { label: 'Kế toán', color: 'from-green-500 to-emerald-500', icon: '💰' }
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