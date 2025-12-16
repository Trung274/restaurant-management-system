import type { MenuItemData } from './components';

export const menuItems: MenuItemData[] = [
  {
    id: 1,
    name: 'Phở bò đặc biệt',
    category: 'Món chính',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop',
    description: 'Phở bò truyền thống với nước dùng hầm xương 12 tiếng',
    rating: 4.8,
    reviews: 124,
    status: 'available',
    popular: true,
    spicy: false,
    vegetarian: false
  },
  {
    id: 2,
    name: 'Bún chả Hà Nội',
    category: 'Món chính',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=300&fit=crop',
    description: 'Bún chả nướng than hoa, chả thơm ngon đậm đà',
    rating: 4.9,
    reviews: 98,
    status: 'available',
    popular: true,
    spicy: false,
    vegetarian: false
  },
  {
    id: 3,
    name: 'Gỏi cuốn tôm thịt',
    category: 'Khai vị',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop',
    description: 'Gỏi cuốn tươi ngon với tôm, thịt và rau thơm',
    rating: 4.6,
    reviews: 76,
    status: 'available',
    popular: false,
    spicy: false,
    vegetarian: false
  },
  {
    id: 4,
    name: 'Cơm chiên dương châu',
    category: 'Món chính',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    description: 'Cơm chiên thập cẩm với tôm, thịt, trứng',
    rating: 4.5,
    reviews: 89,
    status: 'available',
    popular: false,
    spicy: false,
    vegetarian: false
  },
  {
    id: 5,
    name: 'Lẩu Thái hải sản',
    category: 'Món đặc biệt',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?w=400&h=300&fit=crop',
    description: 'Lẩu Thái chua cay với hải sản tươi sống (2-4 người)',
    rating: 4.9,
    reviews: 156,
    status: 'available',
    popular: true,
    spicy: true,
    vegetarian: false
  },
  {
    id: 6,
    name: 'Nem rán giòn',
    category: 'Khai vị',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&h=300&fit=crop',
    description: 'Nem cuốn rán giòn tan, chấm tương đặc biệt',
    rating: 4.7,
    reviews: 67,
    status: 'available',
    popular: false,
    spicy: false,
    vegetarian: false
  },
  {
    id: 7,
    name: 'Cà phê sữa đá',
    category: 'Đồ uống',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
    description: 'Cà phê phin truyền thống pha sữa đá',
    rating: 4.8,
    reviews: 201,
    status: 'available',
    popular: true,
    spicy: false,
    vegetarian: true
  },
  {
    id: 8,
    name: 'Trà sữa trân châu',
    category: 'Đồ uống',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400&h=300&fit=crop',
    description: 'Trà sữa ngon với topping trân châu đen',
    rating: 4.4,
    reviews: 143,
    status: 'available',
    popular: false,
    spicy: false,
    vegetarian: true
  },
  {
    id: 9,
    name: 'Bánh flan caramel',
    category: 'Tráng miệng',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1587241321921-91a834d6d191?w=400&h=300&fit=crop',
    description: 'Bánh flan mềm mịn với caramel đắng nhẹ',
    rating: 4.6,
    reviews: 88,
    status: 'available',
    popular: false,
    spicy: false,
    vegetarian: true
  },
  {
    id: 10,
    name: 'Mì xào hải sản',
    category: 'Món chính',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop',
    description: 'Mì xào giòn với hải sản tươi ngon',
    rating: 4.7,
    reviews: 112,
    status: 'out_of_stock',
    popular: false,
    spicy: true,
    vegetarian: false
  },
  {
    id: 11,
    name: 'Salad Caesar',
    category: 'Khai vị',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
    description: 'Salad rau xanh với sốt Caesar và bánh mì nướng',
    rating: 4.5,
    reviews: 54,
    status: 'available',
    popular: false,
    spicy: false,
    vegetarian: true
  },
  {
    id: 12,
    name: 'Cơm tấm sườn bì',
    category: 'Món chính',
    price: 70000,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    description: 'Cơm tấm truyền thống Sài Gòn với sườn nướng',
    rating: 4.8,
    reviews: 167,
    status: 'available',
    popular: true,
    spicy: false,
    vegetarian: false
  }
];

export const categories = ['Tất cả', 'Món chính', 'Khai vị', 'Đồ uống', 'Tráng miệng', 'Món đặc biệt'];

export const categoryConfig = {
  'Tất cả': { gradient: 'from-blue-500 to-cyan-500', icon: '🍽️' },
  'Món chính': { gradient: 'from-orange-500 to-amber-500', icon: '🍜' },
  'Khai vị': { gradient: 'from-green-500 to-emerald-500', icon: '🥗' },
  'Đồ uống': { gradient: 'from-purple-500 to-pink-500', icon: '☕' },
  'Tráng miệng': { gradient: 'from-pink-500 to-rose-500', icon: '🍰' },
  'Món đặc biệt': { gradient: 'from-red-500 to-orange-500', icon: '⭐' }
};

export const menuStats = [
  {
    id: 'total',
    label: 'Tổng món',
    value: 0, // Sẽ được tính động từ menuItems.length
    icon: '🍽️',
    colorScheme: 'blue' as const,
    subtitle: undefined
  },
  {
    id: 'available',
    label: 'Đang bán',
    value: 0, // Sẽ được tính động
    icon: '✅',
    colorScheme: 'green' as const,
    subtitle: undefined
  },
  {
    id: 'popular',
    label: 'Món phổ biến',
    value: 0, // Sẽ được tính động
    icon: '⭐',
    colorScheme: 'orange' as const,
    subtitle: undefined
  },
  {
    id: 'out_of_stock',
    label: 'Hết hàng',
    value: 0, // Sẽ được tính động
    icon: '❌',
    colorScheme: 'red' as const,
    subtitle: undefined
  }
];