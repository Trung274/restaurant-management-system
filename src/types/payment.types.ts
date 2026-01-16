import type { OrderItem } from './order.types';

// Payment Methods
export type PaymentMethod = 'cash' | 'card' | 'others' | 'bank-transfer';

export type PaymentStatus = 'paid';

// Staff reference in payment
export interface PaymentStaff {
    _id: string;
    name: string;
    email: string;
}

// Order reference in payment (populated)
export interface PaymentOrder {
    _id: string;
    tableNumber: string;
    numberOfGuests: number;
    totalAmount: number;
    items: OrderItem[];
}

// Main Payment entity
export interface Payment {
    _id: string;
    orderId: PaymentOrder;
    tableNumber: string;
    amount: number;
    paymentMethod: PaymentMethod;
    status: PaymentStatus;
    processedBy: PaymentStaff;
    paidAt: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

// Payment Statistics
export interface PaymentStats {
    overall: {
        totalPayments: number;
        totalRevenue: number;
        avgPayment: number;
    };
    today: {
        totalPayments: number;
        totalRevenue: number;
    };
    thisMonth: {
        totalPayments: number;
        totalRevenue: number;
    };
    byPaymentMethod: Array<{
        _id: PaymentMethod;
        count: number;
        totalAmount: number;
    }>;
    dailyRevenue: Array<{
        date: string; // Format: YYYY-MM-DD
        revenue: number;
        count: number;
    }>;
    bestSellingItems: Array<{
        menuItemId: string;
        name: string;
        totalQuantity: number;
        totalRevenue: number;
    }>;
}

// Request Payloads
export interface CreatePaymentPayload {
    orderId: string;
    paymentMethod?: PaymentMethod;
    notes?: string;
}

// Query Parameters
export interface PaymentQueryParams {
    page?: number;
    limit?: number;
    status?: PaymentStatus;
    paymentMethod?: PaymentMethod;
    startDate?: string; // Format: YYYY-MM-DD
    endDate?: string;   // Format: YYYY-MM-DD
    tableNumber?: string;
}

// API Response Types
export interface PaymentApiResponse {
    success: true;
    message: string;
    data: Payment;
}

export interface PaymentsApiResponse {
    success: true;
    count: number;
    total: number;
    currentPage: number;
    totalPages: number;
    data: Payment[];
}

export interface PaymentStatsApiResponse {
    success: true;
    data: PaymentStats;
}
