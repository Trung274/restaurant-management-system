import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import apiClient from '@/lib/axios';
import type {
  RestaurantState,
  RestaurantResponse,
  UpdateRestaurantData
} from '@/types/restaurant.types';

export const useRestaurantStore = create<RestaurantState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        restaurant: null,
        isLoading: false,
        error: null,

        // Fetch restaurant information
        fetchRestaurant: async () => {
          set({ isLoading: true, error: null });

          try {
            const response = await apiClient.get<RestaurantResponse>('/restaurant');

            set({
              restaurant: response.data.data,
              isLoading: false,
              error: null,
            });
          } catch (error: any) {
            // Only set error if it's not a 401 (unauthorized)
            // This prevents error appearing on login page if auto-fetch fails
            const status = error.response?.status;
            if (status !== 401) {
              const errorMessage = error.response?.data?.message || 'Không thể tải thông tin nhà hàng';
              set({
                restaurant: null,
                isLoading: false,
                error: errorMessage,
              });
            } else {
              set({ isLoading: false });
            }
            throw error;
          }
        },

        // Update restaurant information (Admin only)
        updateRestaurant: async (data: UpdateRestaurantData) => {
          set({ isLoading: true, error: null });

          try {
            const response = await apiClient.put<RestaurantResponse>('/restaurant', data);

            set({
              restaurant: response.data.data,
              isLoading: false,
              error: null,
            });
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Không thể cập nhật thông tin nhà hàng';
            set({
              isLoading: false,
              error: errorMessage,
            });
            throw error;
          }
        },

        // Clear error
        clearError: () => {
          set({ error: null });
        },
      }),
      {
        name: 'restaurant-storage',
        // Only persist the restaurant data, not loading/error states
        partialize: (state) => ({ restaurant: state.restaurant }),
      }
    ),
    { name: 'restaurant-store' }
  )
);