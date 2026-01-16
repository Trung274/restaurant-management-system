import apiClient from './axios';
import type {
    Payment,
    PaymentStats,
    CreatePaymentPayload,
    PaymentQueryParams,
    PaymentApiResponse,
    PaymentsApiResponse,
    PaymentStatsApiResponse,
} from '@/types/payment.types';

/**
 * Create a new payment for a completed order
 */
export const createPayment = async (payload: CreatePaymentPayload): Promise<Payment> => {
    const response = await apiClient.post<PaymentApiResponse>('/payments', payload);
    return response.data.data;
};

/**
 * Get all payments with optional filters and pagination
 */
export const getPayments = async (
    params?: PaymentQueryParams
): Promise<{ payments: Payment[]; count: number; total: number; currentPage: number; totalPages: number }> => {
    const response = await apiClient.get<PaymentsApiResponse>('/payments', {
        params,
    });

    return {
        payments: response.data.data,
        count: response.data.count,
        total: response.data.total,
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
    };
};

/**
 * Get a single payment by ID
 */
export const getPaymentById = async (id: string): Promise<Payment> => {
    const response = await apiClient.get<PaymentApiResponse>(`/payments/${id}`);
    return response.data.data;
};

/**
 * Get payment statistics
 */
export const getPaymentStats = async (): Promise<PaymentStats> => {
    const response = await apiClient.get<PaymentStatsApiResponse>('/payments/stats');
    return response.data.data;
};
