export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
  note?: string;
}

export interface Order {
  id: string;
  tableId: number;
  tableName: string;
  customerName: string;
  items: OrderItem[];
  status: 'pending' | 'in-progress' | 'ready' | 'completed' | 'cancelled';
  totalAmount: number;
  orderTime: string;
  note?: string;
  paymentMethod?: 'cash' | 'card' | 'transfer';
}

export const orders: Order[] = [
  {
    id: 'ORD-001',
    tableId: 2,
    tableName: 'Bàn 02',
    customerName: 'Nguyễn Văn A',
    status: 'in-progress',
    totalAmount: 450000,
    orderTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    items: [
      {
        id: 'OI-001',
        menuItemId: '1',
        name: 'Phở Bò Đặc Biệt',
        quantity: 2,
        price: 95000,
        image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'OI-002',
        menuItemId: '3',
        name: 'Gỏi Cuốn Tôm Thịt',
        quantity: 1,
        price: 65000,
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'OI-003',
        menuItemId: '8',
        name: 'Trà Đá',
        quantity: 2,
        price: 5000,
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  {
    id: 'ORD-002',
    tableId: 4,
    tableName: 'Bàn 04',
    customerName: 'Trần Thị B',
    status: 'in-progress',
    totalAmount: 1250000,
    orderTime: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    items: [
      {
        id: 'OI-004',
        menuItemId: '2',
        name: 'Bún Chả Hà Nội',
        quantity: 3,
        price: 85000,
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'OI-005',
        menuItemId: '5',
        name: 'Nem Rán',
        quantity: 2,
        price: 55000,
        image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'OI-006',
        menuItemId: '9',
        name: 'Nước Mía',
        quantity: 3,
        price: 15000,
        image: 'https://images.unsplash.com/photo-1621263764228-683935276e05?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  {
    id: 'ORD-003',
    tableId: 8,
    tableName: 'Bàn 08',
    customerName: 'Lê Văn C',
    status: 'pending',
    totalAmount: 340000,
    orderTime: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
    items: [
      {
        id: 'OI-007',
        menuItemId: '4',
        name: 'Bánh Xèo Miền Tây',
        quantity: 2,
        price: 75000,
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800',
        note: 'Không hành giá'
      },
      {
        id: 'OI-008',
        menuItemId: '12',
        name: 'Chè Khúc Bạch',
        quantity: 2,
        price: 45000,
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  {
    id: 'ORD-004',
    tableId: 11,
    tableName: 'Bàn 11',
    customerName: 'Phạm Thị D',
    status: 'ready',
    totalAmount: 180000,
    orderTime: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    items: [
      {
        id: 'OI-009',
        menuItemId: '6',
        name: 'Cơm Tấm Sườn Bì',
        quantity: 2,
        price: 65000,
        image: 'https://images.unsplash.com/photo-1594956322047-3dc61633532f?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'OI-010',
        menuItemId: '10',
        name: 'Pepsi',
        quantity: 2,
        price: 20000,
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800'
      }
    ]
  }
];