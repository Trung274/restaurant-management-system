'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useRestaurantStore } from '@/stores/restaurantStore';

/**
 * AuthProvider - Initialize authentication on app load
 * 
 * With persist middleware, user data is automatically restored from localStorage
 * We don't need to call checkAuth on every mount - it will be called when needed
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  // Persist middleware handles restoration automatically
  // No need to call checkAuth here - it can clear data if API fails
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const { restaurant, fetchRestaurant } = useRestaurantStore();

  useEffect(() => {
    if (isAuthenticated && !restaurant) {
      fetchRestaurant();
    }
  }, [isAuthenticated, restaurant, fetchRestaurant]);

  return <>{children}</>;
}