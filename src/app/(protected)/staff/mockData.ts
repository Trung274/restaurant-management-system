import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

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