import apiClient from './axios';
import type {
    Order,
    OrderStats,
    CreateOrderPayload,
    OrdersApiResponse,
    OrderApiResponse,
    OrderStatsApiResponse,
    OrderQueryParams,
} from '@/types/order.types';

/**
 * Get all orders with optional filters
 */
export const getOrders = async (
    params?: OrderQueryParams
): Promise<{ orders: Order[]; count: number }> => {
    const response = await apiClient.get<OrdersApiResponse>('/orders', {
        params,
    });

    return {
        orders: response.data.data,
        count: response.data.count,
    };
};

/**
 * Get a single order by ID
 */
export const getOrderById = async (id: string): Promise<Order> => {
    const response = await apiClient.get<OrderApiResponse>(`/orders/${id}`);
    return response.data.data;
};

/**
 * Create a new order
 */
export const createOrder = async (payload: CreateOrderPayload): Promise<Order> => {
    const response = await apiClient.post<OrderApiResponse>('/orders', payload);
    return response.data.data;
};

/**
 * Add items to existing order
 */
export const addItemsToOrder = async (
    orderId: string,
    items: CreateOrderPayload['items']
): Promise<Order> => {
    const response = await apiClient.patch<OrderApiResponse>(
        `/orders/${orderId}/add-items`,
        { items }
    );
    return response.data.data;
};

/**
 * Mark all items in order as served
 */
export const serveAllItems = async (orderId: string): Promise<Order> => {
    const response = await apiClient.patch<OrderApiResponse>(
        `/orders/${orderId}/serve-all`
    );
    return response.data.data;
};

/**
 * Cancel an order
 */
export const cancelOrder = async (orderId: string, reason?: string): Promise<Order> => {
    const response = await apiClient.delete<OrderApiResponse>(`/orders/${orderId}`, {
        data: { reason },
    });
    return response.data.data;
};

/**
 * Get order statistics
 */
export const getOrderStats = async (): Promise<OrderStats> => {
    const response = await apiClient.get<OrderStatsApiResponse>('/orders/stats');
    return response.data.data;
};
