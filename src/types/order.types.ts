export type KitchenStatus = 'queued' | 'preparing' | 'ready' | 'served';
export type OrderStatus = 'pending' | 'in-progress' | 'ready' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'refunded';
export type PaymentMethod = 'cash' | 'card' | 'e-wallet' | 'bank-transfer';
export type Priority = 'normal' | 'high' | 'urgent';


export interface OrderItem {
    _id: string;
    menuItemId: string;
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
    notes?: string;

    // Kitchen-specific fields
    kitchenStatus: KitchenStatus;

    priority: Priority;
    assignedTo?: {
        _id: string;
        name: string;
    };
    estimatedTime?: number;
    actualTime?: number;

    // Timestamps
    queuedAt: string;
    startedAt?: string;
    readyAt?: string;
    servedAt?: string;
}

export interface Order {
    _id: string;
    tableId: string;
    tableNumber: string;
    numberOfGuests: number;
    items: OrderItem[];

    // Status
    status: OrderStatus;

    // Financial
    subtotal: number;
    tax: number;
    serviceCharge: number;
    discount: number;
    totalAmount: number;

    // Payment
    paymentMethod?: PaymentMethod;
    paymentStatus: PaymentStatus;

    // Timestamps
    checkInTime: string;
    checkOutTime?: string;
    completedAt?: string;

    // Notes
    notes?: string;

    // Staff tracking
    createdBy?: {
        _id: string;
        name: string;
    };
    servedBy?: {
        _id: string;
        name: string;
    };

    // Virtuals
    kitchenProgress?: number;
    duration?: string;

    createdAt: string;
    updatedAt: string;
}

export interface OrderStats {
    total: number;
    pending: number;
    inProgress: number;
    ready: number;
    completed: number;
    cancelled: number;
}

// API Request/Response types
export interface CreateOrderPayload {
    tableId: string;
    tableNumber: string;
    numberOfGuests: number;
    items: {
        menuItemId: string;
        name: string;
        quantity: number;
        price: number;
        notes?: string;

        estimatedTime?: number;
    }[];
    notes?: string;
}

export interface OrdersApiResponse {
    success: boolean;
    count: number;
    data: Order[];
}

export interface OrderApiResponse {
    success: boolean;
    data: Order;
}

export interface OrderStatsApiResponse {
    success: boolean;
    data: OrderStats;
}

export interface OrderQueryParams {
    status?: OrderStatus;
    tableId?: string;
    sort?: string;
    limit?: number;
    page?: number;
}
