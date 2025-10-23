export const customers = [
  {
    id: 1,
    name: 'Nguyễn Thị Mai',
    avatar: 'https://i.pravatar.cc/150?img=1',
    email: 'nguyenthimai@email.com',
    phone: '0901234567',
    address: '123 Trần Duy Hưng, Cầu Giấy, Hà Nội',
    membershipLevel: 'vip',
    points: 2450,
    totalOrders: 67,
    totalSpent: 18500000,
    rating: 4.9,
    lastVisit: '2 ngày trước',
    joinDate: '2022-03-15',
    favorite: true,
    preferences: ['Phở', 'Bún chả', 'Cà phê'],
    birthday: '1990-05-15'
  },
  {
    id: 2,
    name: 'Trần Văn Bình',
    avatar: 'https://i.pravatar.cc/150?img=12',
    email: 'tranvanbinh@email.com',
    phone: '0902345678',
    address: '456 Láng Hạ, Đống Đa, Hà Nội',
    membershipLevel: 'gold',
    points: 1850,
    totalOrders: 45,
    totalSpent: 12300000,
    rating: 4.7,
    lastVisit: '1 tuần trước',
    joinDate: '2022-07-20',
    favorite: false,
    preferences: ['Lẩu', 'Nướng', 'Trà sữa'],
    birthday: '1985-08-22'
  },
  {
    id: 3,
    name: 'Lê Minh Hà',
    avatar: 'https://i.pravatar.cc/150?img=5',
    email: 'leminhha@email.com',
    phone: '0903456789',
    address: '789 Nguyễn Trái, Thanh Xuân, Hà Nội',
    membershipLevel: 'silver',
    points: 890,
    totalOrders: 28,
    totalSpent: 7200000,
    rating: 4.5,
    lastVisit: '3 ngày trước',
    joinDate: '2023-01-10',
    favorite: true,
    preferences: ['Cơm chiên', 'Nem', 'Sinh tố'],
    birthday: '1995-12-03'
  },
  {
    id: 4,
    name: 'Phạm Thu Hương',
    avatar: 'https://i.pravatar.cc/150?img=9',
    email: 'phamthuhuong@email.com',
    phone: '0904567890',
    address: '321 Hoàng Quốc Việt, Cầu Giấy, Hà Nội',
    membershipLevel: 'vip',
    points: 3200,
    totalOrders: 89,
    totalSpent: 24700000,
    rating: 5.0,
    lastVisit: 'Hôm nay',
    joinDate: '2021-11-05',
    favorite: true,
    preferences: ['Sushi', 'Steak', 'Rượu vang'],
    birthday: '1988-03-28'
  },
  {
    id: 5,
    name: 'Hoàng Văn Tuấn',
    avatar: 'https://i.pravatar.cc/150?img=13',
    email: 'hoangvantuan@email.com',
    phone: '0905678901',
    address: '654 Giải Phóng, Hai Bà Trưng, Hà Nội',
    membershipLevel: 'bronze',
    points: 320,
    totalOrders: 12,
    totalSpent: 3100000,
    rating: 4.3,
    lastVisit: '2 tuần trước',
    joinDate: '2023-06-15',
    favorite: false,
    preferences: ['Mì xào', 'Gà rán'],
    birthday: '1992-07-19'
  },
  {
    id: 6,
    name: 'Vũ Thị Lan',
    avatar: 'https://i.pravatar.cc/150?img=10',
    email: 'vuthilan@email.com',
    phone: '0906789012',
    address: '147 Lê Duẩn, Hoàn Kiếm, Hà Nội',
    membershipLevel: 'gold',
    points: 1560,
    totalOrders: 38,
    totalSpent: 9800000,
    rating: 4.6,
    lastVisit: '5 ngày trước',
    joinDate: '2022-09-28',
    favorite: false,
    preferences: ['Salad', 'Pasta', 'Juice'],
    birthday: '1993-11-07'
  },
  {
    id: 7,
    name: 'Đặng Quốc Anh',
    avatar: 'https://i.pravatar.cc/150?img=14',
    email: 'dangquocanh@email.com',
    phone: '0907890123',
    address: '258 Cát Linh, Đống Đa, Hà Nội',
    membershipLevel: 'silver',
    points: 1120,
    totalOrders: 31,
    totalSpent: 8400000,
    rating: 4.8,
    lastVisit: '1 ngày trước',
    joinDate: '2023-02-14',
    favorite: true,
    preferences: ['Pizza', 'Burger', 'Bia'],
    birthday: '1987-09-12'
  },
  {
    id: 8,
    name: 'Bùi Thị Nhung',
    avatar: 'https://i.pravatar.cc/150?img=16',
    email: 'buithinhung@email.com',
    phone: '0908901234',
    address: '369 Tây Sơn, Đống Đa, Hà Nội',
    membershipLevel: 'bronze',
    points: 450,
    totalOrders: 15,
    totalSpent: 4200000,
    rating: 4.4,
    lastVisit: '1 tuần trước',
    joinDate: '2023-08-01',
    favorite: false,
    preferences: ['Bánh mì', 'Chè', 'Cà phê'],
    birthday: '1996-04-25'
  }
];

export const membershipConfig = {
  vip: {
    label: 'VIP',
    gradient: 'from-purple-500 to-pink-500',
    bg: 'from-purple-500/10 to-pink-500/10',
    border: 'border-purple-500/20',
    text: 'text-purple-400',
    icon: '👑',
    minSpent: 15000000
  },
  gold: {
    label: 'Gold',
    gradient: 'from-yellow-500 to-amber-500',
    bg: 'from-yellow-500/10 to-amber-500/10',
    border: 'border-yellow-500/20',
    text: 'text-yellow-400',
    icon: '🥇',
    minSpent: 10000000
  },
  silver: {
    label: 'Silver',
    gradient: 'from-gray-400 to-gray-500',
    bg: 'from-gray-400/10 to-gray-500/10',
    border: 'border-gray-400/20',
    text: 'text-gray-400',
    icon: '🥈',
    minSpent: 5000000
  },
  bronze: {
    label: 'Bronze',
    gradient: 'from-orange-600 to-amber-700',
    bg: 'from-orange-600/10 to-amber-700/10',
    border: 'border-orange-600/20',
    text: 'text-orange-400',
    icon: '🥉',
    minSpent: 0
  }
};

export const customerStats = [
  {
    id: 'total-customers',
    label: 'Tổng khách hàng',
    value: '1,234', // Thay bằng totalCustomers variable
    icon: '👥',
    colorScheme: 'blue' as const,
  },
  {
    id: 'vip-customers',
    label: 'Khách VIP',
    value: '89', // Thay bằng vipCustomers variable
    icon: '👑',
    colorScheme: 'purple' as const,
  },
  {
    id: 'favorite-customers',
    label: 'Yêu thích',
    value: '156', // Thay bằng favoriteCustomers variable
    icon: '❤️',
    colorScheme: 'pink' as const,
  },
  {
    id: 'total-revenue',
    label: 'Tổng doanh thu',
    value: '45.2M', // Thay bằng (totalRevenue / 1000000).toFixed(1) + 'M'
    icon: '💰',
    colorScheme: 'green' as const,
  }
];