import { create } from 'zustand';
import type { Order, OrderStats, OrderQueryParams, CreateOrderPayload } from '@/types/order.types';
import * as orderService from '@/lib/orderService';
import { toast } from '@/utils/toast';

interface OrdersState {
    orders: Order[];
    stats: OrderStats | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchOrders: (params?: OrderQueryParams) => Promise<void>;
    fetchOrderById: (id: string) => Promise<Order | null>;
    createOrder: (payload: CreateOrderPayload) => Promise<Order | null>;
    serveOrder: (orderId: string) => Promise<void>;
    cancelOrder: (orderId: string, reason?: string) => Promise<void>;
    fetchStats: () => Promise<void>;
    clearError: () => void;
}

export const useOrdersStore = create<OrdersState>((set, get) => ({
    orders: [],
    stats: null,
    isLoading: false,
    error: null,

    fetchOrders: async (params?: OrderQueryParams) => {
        set({ isLoading: true, error: null });
        try {
            const { orders } = await orderService.getOrders(params);
            set({ orders, isLoading: false });
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch orders';
            set({ error: errorMessage, isLoading: false });
            toast.error(errorMessage);
        }
    },

    fetchOrderById: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const order = await orderService.getOrderById(id);
            set({ isLoading: false });
            return order;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch order';
            set({ error: errorMessage, isLoading: false });
            toast.error(errorMessage);
            return null;
        }
    },

    createOrder: async (payload: CreateOrderPayload) => {
        set({ isLoading: true, error: null });
        try {
            const newOrder = await orderService.createOrder(payload);

            // Add to orders list
            set((state) => ({
                orders: [newOrder, ...state.orders],
                isLoading: false,
            }));

            toast.success('Đơn hàng đã được tạo thành công');

            // Refresh stats
            get().fetchStats();

            return newOrder;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to create order';
            set({ error: errorMessage, isLoading: false });
            toast.error(errorMessage);
            return null;
        }
    },

    serveOrder: async (orderId: string) => {
        set({ isLoading: true, error: null });
        try {
            const updatedOrder = await orderService.serveAllItems(orderId);

            // Update order in list
            set((state) => ({
                orders: state.orders.map((order) =>
                    order._id === orderId ? updatedOrder : order
                ),
                isLoading: false,
            }));

            toast.success('Đã đánh dấu phục vụ tất cả món');

            // Refresh stats
            get().fetchStats();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to serve order';
            set({ error: errorMessage, isLoading: false });
            toast.error(errorMessage);
        }
    },

    cancelOrder: async (orderId: string, reason?: string) => {
        set({ isLoading: true, error: null });
        try {
            await orderService.cancelOrder(orderId, reason);

            // Remove from orders list or update status
            set((state) => ({
                orders: state.orders.filter((order) => order._id !== orderId),
                isLoading: false,
            }));

            toast.success('Đơn hàng đã được hủy');

            // Refresh stats
            get().fetchStats();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to cancel order';
            set({ error: errorMessage, isLoading: false });
            toast.error(errorMessage);
        }
    },

    fetchStats: async () => {
        try {
            const stats = await orderService.getOrderStats();
            set({ stats });
        } catch (error: any) {
            console.error('Failed to fetch order stats:', error);
        }
    },

    clearError: () => set({ error: null }),
}));
