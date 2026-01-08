import apiClient from './axios';
import type {
    Order,
    KitchenStats,
    KitchenQueueApiResponse,
    StartItemPayload,
    MarkItemReadyPayload,
    UpdatePriorityPayload,
    ItemUpdateApiResponse,
    KitchenStatsApiResponse,
    KitchenQueryParams,
} from '@/types/kitchen.types';

/**
 * Get kitchen queue with optional filters
 */
export const getKitchenQueue = async (
    params?: KitchenQueryParams
): Promise<{ orders: Order[]; count: number }> => {
    const response = await apiClient.get<KitchenQueueApiResponse>('/kitchen/queue', {
        params,
    });

    return {
        orders: response.data.data,
        count: response.data.count,
    };
};

/**
 * Start preparing an item
 */
export const startPreparingItem = async (
    itemId: string,
    payload: StartItemPayload
): Promise<ItemUpdateApiResponse['data']> => {
    const response = await apiClient.patch<ItemUpdateApiResponse>(
        `/kitchen/items/${itemId}/start`,
        payload
    );
    return response.data.data;
};

/**
 * Mark item as ready
 */
export const markItemReady = async (
    itemId: string,
    payload: MarkItemReadyPayload
): Promise<ItemUpdateApiResponse['data']> => {
    const response = await apiClient.patch<ItemUpdateApiResponse>(
        `/kitchen/items/${itemId}/ready`,
        payload
    );
    return response.data.data;
};

/**
 * Update item priority
 */
export const updateItemPriority = async (
    itemId: string,
    payload: UpdatePriorityPayload
): Promise<ItemUpdateApiResponse['data']> => {
    const response = await apiClient.patch<ItemUpdateApiResponse>(
        `/kitchen/items/${itemId}/priority`,
        payload
    );
    return response.data.data;
};

/**
 * Get kitchen statistics
 */
export const getKitchenStats = async (): Promise<KitchenStats> => {
    const response = await apiClient.get<KitchenStatsApiResponse>('/kitchen/stats');
    return response.data.data;
};
