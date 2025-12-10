// src/hooks/useRestaurant.ts

import { useEffect } from 'react';
import { useRestaurantStore } from '@/stores/restaurantStore';

export const useRestaurant = (autoFetch: boolean = true) => {
  const {
    restaurant,
    isLoading,
    error,
    fetchRestaurant,
    updateRestaurant,
    clearError,
  } = useRestaurantStore();

  // Auto-fetch restaurant info on mount
  useEffect(() => {
    if (autoFetch && !restaurant && !isLoading) {
      fetchRestaurant();
    }
  }, [autoFetch, restaurant, isLoading, fetchRestaurant]);

  return {
    restaurant,
    isLoading,
    error,
    fetchRestaurant,
    updateRestaurant,
    clearError,
  };
};