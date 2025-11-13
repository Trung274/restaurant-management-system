import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useAuth = () => {
  const authStore = useAuthStore();
  
  return {
    user: authStore.user,
    token: authStore.token,
    isAuthenticated: authStore.isAuthenticated,
    isLoading: authStore.isLoading,
    error: authStore.error,
    login: authStore.login,
    logout: authStore.logout,
    setUser: authStore.setUser,
    clearError: authStore.clearError,
    checkAuth: authStore.checkAuth,
  };
};

/**
 * Hook for protected pages - DEPRECATED
 * 
 * NOTE: Không cần dùng hook này nữa vì middleware đã xử lý authentication
 * Giữ lại để tương thích với code cũ, nhưng không nên dùng trong code mới
 * 
 * @deprecated Use middleware authentication instead
 */
export const useRequireAuth = () => {
  const { isAuthenticated, isLoading, checkAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check auth on mount để sync user data
    checkAuth();
  }, [checkAuth]);

  // KHÔNG redirect nữa - middleware đã xử lý
  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //     router.push('/login');
  //   }
  // }, [isAuthenticated, isLoading, router]);

  return { isAuthenticated, isLoading };
};

/**
 * Hook to redirect authenticated users away from auth pages
 * 
 * NOTE: Middleware đã xử lý việc này, nhưng giữ lại để có thể
 * show loading state trên client-side
 */
export const useRedirectIfAuthenticated = () => {
  const { isAuthenticated, isLoading, checkAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check auth on mount
    checkAuth();
  }, [checkAuth]);

  // Middleware đã redirect, nhưng giữ lại để handle edge cases
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  return { isAuthenticated, isLoading };
};