import { create } from 'zustand';
import type { Payment, PaymentStats, PaymentQueryParams, CreatePaymentPayload } from '@/types/payment.types';
import * as paymentService from '@/lib/paymentService';
import { toast } from '@/utils/toast';

interface PaymentsState {
    payments: Payment[];
    stats: PaymentStats | null;
    isLoading: boolean;
    error: string | null;
    pagination: {
        currentPage: number;
        totalPages: number;
        total: number;
        count: number;
    } | null;

    // Actions
    fetchPayments: (params?: PaymentQueryParams) => Promise<void>;
    fetchPaymentById: (id: string) => Promise<Payment | null>;
    createPayment: (payload: CreatePaymentPayload) => Promise<Payment | null>;
    fetchStats: () => Promise<void>;
    clearError: () => void;
}

export const usePaymentsStore = create<PaymentsState>((set, get) => ({
    payments: [],
    stats: null,
    isLoading: false,
    error: null,
    pagination: null,

    fetchPayments: async (params?: PaymentQueryParams) => {
        set({ isLoading: true, error: null });
        try {
            const { payments, count, total, currentPage, totalPages } = await paymentService.getPayments(params);
            set({
                payments,
                pagination: { count, total, currentPage, totalPages },
                isLoading: false,
            });
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch payments';
            set({ error: errorMessage, isLoading: false });
            toast.error(errorMessage);
        }
    },

    fetchPaymentById: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const payment = await paymentService.getPaymentById(id);
            set({ isLoading: false });
            return payment;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch payment';
            set({ error: errorMessage, isLoading: false });
            toast.error(errorMessage);
            return null;
        }
    },

    createPayment: async (payload: CreatePaymentPayload) => {
        set({ isLoading: true, error: null });
        try {
            const newPayment = await paymentService.createPayment(payload);

            // Add to payments list
            set((state) => ({
                payments: [newPayment, ...state.payments],
                isLoading: false,
            }));

            toast.success('Thanh toán thành công');

            // Refresh stats
            get().fetchStats();

            return newPayment;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to create payment';
            set({ error: errorMessage, isLoading: false });
            toast.error(errorMessage);
            return null;
        }
    },

    fetchStats: async () => {
        try {
            const stats = await paymentService.getPaymentStats();
            set({ stats });
        } catch (error: any) {
            console.error('Failed to fetch payment stats:', error);
        }
    },

    clearError: () => set({ error: null }),
}));
