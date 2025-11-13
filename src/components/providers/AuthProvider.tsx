'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

/**
 * AuthProvider - Initialize authentication on app load
 * 
 * This component should be placed in the root layout to ensure
 * user data is restored from cookies when the app loads
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    // Check and restore auth state on mount
    checkAuth();
  }, [checkAuth]);

  return <>{children}</>;
}