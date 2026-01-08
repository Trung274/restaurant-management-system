import { create } from 'zustand';
import type { Order, KitchenStats, KitchenQueryParams, Priority } from '@/types/kitchen.types';
import * as kitchenService from '@/lib/kitchenService';
import { toast } from '@/utils/toast';

interface KitchenState {
    kitchenQueue: Order[];
    stats: KitchenStats | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchQueue: (params?: KitchenQueryParams) => Promise<void>;
    startItem: (itemId: string, orderId: string) => Promise<void>;
    markItemReady: (itemId: string, orderId: string) => Promise<void>;
    updatePriority: (itemId: string, orderId: string, priority: Priority) => Promise<void>;
    fetchStats: () => Promise<void>;
    clearError: () => void;
}

export const useKitchenStore = create<KitchenState>((set, get) => ({
    kitchenQueue: [],
    stats: null,
    isLoading: false,
    error: null,

    fetchQueue: async (params?: KitchenQueryParams) => {
        set({ isLoading: true, error: null });
        try {
            const { orders } = await kitchenService.getKitchenQueue(params);
            set({ kitchenQueue: orders, isLoading: false });
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch kitchen queue';
            set({ error: errorMessage, isLoading: false });
            toast.error(errorMessage);
        }
    },

    startItem: async (itemId: string, orderId: string) => {
        try {
            const result = await kitchenService.startPreparingItem(itemId, { orderId });

            // Update order in queue
            set((state) => ({
                kitchenQueue: state.kitchenQueue.map((order) => {
                    if (order._id === orderId) {
                        return {
                            ...order,
                            status: result.order.status as any,
                            kitchenProgress: result.order.kitchenProgress,
                            items: order.items.map((item) =>
                                item._id === itemId ? result.item : item
                            ),
                        };
                    }
                    return order;
                }),
            }));

            toast.success(`Đã bắt đầu chế biến ${result.item.name}`);

            // Refresh stats
            get().fetchStats();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to start item';
            toast.error(errorMessage);
        }
    },

    markItemReady: async (itemId: string, orderId: string) => {
        try {
            const result = await kitchenService.markItemReady(itemId, { orderId });

            // Update order in queue
            set((state) => ({
                kitchenQueue: state.kitchenQueue.map((order) => {
                    if (order._id === orderId) {
                        return {
                            ...order,
                            status: result.order.status as any,
                            kitchenProgress: result.order.kitchenProgress,
                            items: order.items.map((item) =>
                                item._id === itemId ? result.item : item
                            ),
                        };
                    }
                    return order;
                }),
            }));

            toast.success(`${result.item.name} đã sẵn sàng`);

            // Refresh stats
            get().fetchStats();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to mark item ready';
            toast.error(errorMessage);
        }
    },

    updatePriority: async (itemId: string, orderId: string, priority: Priority) => {
        try {
            const result = await kitchenService.updateItemPriority(itemId, { orderId, priority });

            // Update order in queue
            set((state) => ({
                kitchenQueue: state.kitchenQueue.map((order) => {
                    if (order._id === orderId) {
                        return {
                            ...order,
                            items: order.items.map((item) =>
                                item._id === itemId ? result.item : item
                            ),
                        };
                    }
                    return order;
                }),
            }));

            toast.success('Đã cập nhật độ ưu tiên');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to update priority';
            toast.error(errorMessage);
        }
    },

    fetchStats: async () => {
        try {
            const stats = await kitchenService.getKitchenStats();
            set({ stats });
        } catch (error: any) {
            console.error('Failed to fetch kitchen stats:', error);
        }
    },

    clearError: () => set({ error: null }),
}));
