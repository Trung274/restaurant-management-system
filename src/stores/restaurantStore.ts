import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import apiClient from '@/lib/axios';
import type { 
  RestaurantState, 
  RestaurantResponse, 
  UpdateRestaurantData 
} from '@/types/restaurant.types';

export const useRestaurantStore = create<RestaurantState>()(
  devtools(
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
          const errorMessage = error.response?.data?.message || 'Không thể tải thông tin nhà hàng';
          set({
            restaurant: null,
            isLoading: false,
            error: errorMessage,
          });
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
    { name: 'restaurant-store' }
  )
);