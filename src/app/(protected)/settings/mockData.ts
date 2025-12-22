import {
  UserCircleIcon,
  BellIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
  CreditCardIcon,
  GlobeAltIcon,
  ServerIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline';

export const settingsSections = [
  {
    id: 'general',
    name: 'Cài đặt chung',
    description: 'Thông tin cơ bản về nhà hàng',
    icon: BuildingStorefrontIcon,
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'from-blue-500/10 to-cyan-500/10',
    border: 'border-blue-500/20',
    emoji: '🏪'
  },
  {
    id: 'profile',
    name: 'Hồ sơ cá nhân',
    description: 'Quản lý thông tin tài khoản',
    icon: UserCircleIcon,
    gradient: 'from-purple-500 to-pink-500',
    bg: 'from-purple-500/10 to-pink-500/10',
    border: 'border-purple-500/20',
    emoji: '👤'
  },
  {
    id: 'security',
    name: 'Bảo mật',
    description: 'Mật khẩu và xác thực hai yếu tố',
    icon: ShieldCheckIcon,
    gradient: 'from-green-500 to-emerald-500',
    bg: 'from-green-500/10 to-emerald-500/10',
    border: 'border-green-500/20',
    emoji: '🔒'
  },
  {
    id: 'notifications',
    name: 'Thông báo',
    description: 'Cấu hình thông báo và cảnh báo',
    icon: BellIcon,
    gradient: 'from-orange-500 to-amber-500',
    bg: 'from-orange-500/10 to-amber-500/10',
    border: 'border-orange-500/20',
    emoji: '🔔'
  },
  {
    id: 'appearance',
    name: 'Giao diện',
    description: 'Tùy chỉnh theme và hiển thị',
    icon: PaintBrushIcon,
    gradient: 'from-pink-500 to-rose-500',
    bg: 'from-pink-500/10 to-rose-500/10',
    border: 'border-pink-500/20',
    emoji: '🎨'
  },
  {
    id: 'payment',
    name: 'Thanh toán',
    description: 'Phương thức thanh toán',
    icon: CreditCardIcon,
    gradient: 'from-indigo-500 to-violet-500',
    bg: 'from-indigo-500/10 to-violet-500/10',
    border: 'border-indigo-500/20',
    emoji: '💳'
  },
  {
    id: 'language',
    name: 'Ngôn ngữ & Khu vực',
    description: 'Múi giờ và định dạng',
    icon: GlobeAltIcon,
    gradient: 'from-cyan-500 to-teal-500',
    bg: 'from-cyan-500/10 to-teal-500/10',
    border: 'border-cyan-500/20',
    emoji: '🌍'
  },
  {
    id: 'integration',
    name: 'Tích hợp',
    description: 'API và dịch vụ bên ngoài',
    icon: ServerIcon,
    gradient: 'from-red-500 to-orange-500',
    bg: 'from-red-500/10 to-orange-500/10',
    border: 'border-red-500/20',
    emoji: '🔌'
  }
];