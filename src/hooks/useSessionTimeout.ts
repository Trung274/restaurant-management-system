import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from './useAuth';
import { toast } from 'react-hot-toast';

/**
 * Hook để tự động logout sau khi user không hoạt động trong thời gian nhất định
 * 
 * @param timeoutMs - Thời gian timeout (ms), mặc định 30 phút
 * 
 * @example
 * ```tsx
 * function App() {
 *   useSessionTimeout(30 * 60 * 1000); // 30 phút
 *   return <YourApp />;
 * }
 * ```
 */
export const useSessionTimeout = (timeoutMs = 30 * 60 * 1000) => {
  const { logout, isAuthenticated } = useAuth();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sử dụng useCallback để function có stable reference
  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      toast.error('Phiên làm việc hết hạn!', {
        duration: 4000,
        position: 'top-center',
        icon: '⏰',
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #ef4444',
        },
      });
      
      // Delay logout một chút để user thấy toast
      setTimeout(() => {
        logout();
      }, 2000);
    }, timeoutMs);
  }, [logout, timeoutMs]); // ← Thêm dependencies

  useEffect(() => {
    if (!isAuthenticated) return;

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    
    events.forEach((event) => {
      window.addEventListener(event, resetTimeout);
    });

    // Khởi tạo timeout lần đầu
    resetTimeout();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimeout);
      });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isAuthenticated, resetTimeout]); // ← Thêm resetTimeout vào dependencies
};