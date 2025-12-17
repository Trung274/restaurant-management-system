import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getMenuItems, getMenuStats, createMenuItem, updateMenuItem, deleteMenuItem } from '@/lib/menuService';
import { getMenuErrorMessage } from '@/lib/menuHelpers';
import type { MenuItem, MenuStatsResponse, MenuItemPayload, MenuItemQueryParams } from '@/types/menuItem.types';

interface MenuState {
    items: MenuItem[];
    stats: MenuStatsResponse | null;
    isLoading: boolean;
    error: string | null;
    lastFetched: number | null;

    // Actions
    fetchMenuItems: (params?: MenuItemQueryParams) => Promise<void>;
    fetchStats: () => Promise<void>;
    addMenuItem: (payload: MenuItemPayload) => Promise<MenuItem>;
    editMenuItem: (id: string, payload: MenuItemPayload) => Promise<MenuItem>;
    removeMenuItem: (id: string) => Promise<void>;
    clearError: () => void;
    refreshData: () => Promise<void>;
}

export const useMenuStore = create<MenuState>()(
    devtools(
        (set, get) => ({
            // Initial state
            items: [],
            stats: null,
            isLoading: false,
            error: null,
            lastFetched: null,

            // Fetch menu items
            fetchMenuItems: async (params?: MenuItemQueryParams) => {
                set({ isLoading: true, error: null });

                try {
                    const { items } = await getMenuItems(params);
                    set({
                        items,
                        isLoading: false,
                        lastFetched: Date.now(),
                    });
                } catch (error) {
                    const errorMessage = getMenuErrorMessage(error);
                    set({
                        error: errorMessage,
                        isLoading: false,
                    });
                    throw error;
                }
            },

            // Fetch stats
            fetchStats: async () => {
                try {
                    const stats = await getMenuStats();
                    set({ stats });
                } catch (error) {
                    console.error('Error fetching menu stats:', error);
                    // Don't set error state for stats, just log it
                }
            },

            // Add new menu item
            addMenuItem: async (payload: MenuItemPayload) => {
                set({ isLoading: true, error: null });

                try {
                    const newItem = await createMenuItem(payload);

                    // Add to items array
                    set((state) => ({
                        items: [...state.items, newItem],
                        isLoading: false,
                    }));

                    // Refresh stats
                    await get().fetchStats();

                    return newItem;
                } catch (error) {
                    const errorMessage = getMenuErrorMessage(error);
                    set({
                        error: errorMessage,
                        isLoading: false,
                    });
                    throw error;
                }
            },

            // Edit menu item
            editMenuItem: async (id: string, payload: MenuItemPayload) => {
                set({ isLoading: true, error: null });

                try {
                    const updatedItem = await updateMenuItem(id, payload);

                    // Update in items array
                    set((state) => ({
                        items: state.items.map((item) =>
                            item.id === id ? updatedItem : item
                        ),
                        isLoading: false,
                    }));

                    // Refresh stats
                    await get().fetchStats();

                    return updatedItem;
                } catch (error) {
                    const errorMessage = getMenuErrorMessage(error);
                    set({
                        error: errorMessage,
                        isLoading: false,
                    });
                    throw error;
                }
            },

            // Remove menu item
            removeMenuItem: async (id: string) => {
                set({ isLoading: true, error: null });

                try {
                    await deleteMenuItem(id);

                    // Remove from items array
                    set((state) => ({
                        items: state.items.filter((item) => item.id !== id),
                        isLoading: false,
                    }));

                    // Refresh stats
                    await get().fetchStats();
                } catch (error) {
                    const errorMessage = getMenuErrorMessage(error);
                    set({
                        error: errorMessage,
                        isLoading: false,
                    });
                    throw error;
                }
            },

            // Clear error
            clearError: () => {
                set({ error: null });
            },

            // Refresh all data
            refreshData: async () => {
                await Promise.all([
                    get().fetchMenuItems(),
                    get().fetchStats(),
                ]);
            },
        }),
        { name: 'menu-store' }
    )
);
