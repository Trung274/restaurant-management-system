import apiClient from './axios';
import type {
    MenuItemsApiResponse,
    MenuItemApiResponse,
    MenuStatsApiResponse,
    DeleteMenuItemApiResponse,
    MenuItemQueryParams,
    MenuItemPayload,
    MenuItem,
    MenuStatsResponse,
} from '@/types/menuItem.types';
import { transformMenuItem } from './menuHelpers';

/**
 * Get all menu items with optional filters
 */
export const getMenuItems = async (
    params?: MenuItemQueryParams
): Promise<{ items: MenuItem[]; pagination?: any }> => {
    const response = await apiClient.get<MenuItemsApiResponse>('/menu-items', {
        params,
    });

    const items = response.data.data.map(transformMenuItem);
    return {
        items,
        pagination: response.data.pagination,
    };
};

/**
 * Get a single menu item by ID
 */
export const getMenuItemById = async (id: string): Promise<MenuItem> => {
    const response = await apiClient.get<MenuItemApiResponse>(`/menu-items/${id}`);
    return transformMenuItem(response.data.data);
};

/**
 * Get menu statistics
 */
export const getMenuStats = async (): Promise<MenuStatsResponse> => {
    const response = await apiClient.get<{ success: boolean; data: { summary: any } }>('/menu-items/stats');

    // Transform backend response to match frontend interface
    const summary = response.data.data.summary;
    return {
        total: summary.totalItems,
        available: summary.availableItems,
        popular: summary.popularItems,
        out_of_stock: summary.outOfStock,
    };
};

/**
 * Create a new menu item (Protected - Admin/Manager only)
 */
export const createMenuItem = async (payload: MenuItemPayload): Promise<MenuItem> => {
    const response = await apiClient.post<MenuItemApiResponse>('/menu-items', payload);
    return transformMenuItem(response.data.data);
};

/**
 * Update an existing menu item (Protected - Admin/Manager only)
 */
export const updateMenuItem = async (
    id: string,
    payload: MenuItemPayload
): Promise<MenuItem> => {
    const response = await apiClient.put<MenuItemApiResponse>(`/menu-items/${id}`, payload);
    return transformMenuItem(response.data.data);
};

/**
 * Delete a menu item (Protected - Admin/Manager only)
 */
export const deleteMenuItem = async (id: string): Promise<void> => {
    await apiClient.delete<DeleteMenuItemApiResponse>(`/menu-items/${id}`);
};
