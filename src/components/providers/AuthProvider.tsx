'use client';

import { useAuthStore } from '@/stores/authStore';

/**
 * AuthProvider - Initialize authentication on app load
 * 
 * With persist middleware, user data is automatically restored from localStorage
 * We don't need to call checkAuth on every mount - it will be called when needed
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  // Persist middleware handles restoration automatically
  // No need to call checkAuth here - it can clear data if API fails

  return <>{children}</>;
}