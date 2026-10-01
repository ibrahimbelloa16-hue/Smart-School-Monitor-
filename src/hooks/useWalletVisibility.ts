import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to manage wallet balance visibility across the entire application.
 * Persists in localStorage key 'wallet_hidden'.
 * Defaults to visible (false).
 */
export function useWalletVisibility() {
  const [isHidden, setIsHidden] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('wallet_hidden') === 'true';
    }
    return false;
  });

  const toggleVisibility = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setIsHidden((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('wallet_hidden', String(next));
      } catch (err) {}
      window.dispatchEvent(new Event('wallet_hidden_change'));
      return next;
    });
  }, []);

  useEffect(() => {
    const handleSync = () => {
      try {
        const stored = localStorage.getItem('wallet_hidden') === 'true';
        setIsHidden(stored);
      } catch (err) {}
    };
    window.addEventListener('wallet_hidden_change', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('wallet_hidden_change', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const formatBalance = useCallback(
    (amountNaira: number | string | undefined | null): string => {
      if (isHidden) {
        return '₦••••••';
      }
      const num = Number(amountNaira) || 0;
      return `₦${num.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    },
    [isHidden]
  );

  return { isHidden, toggleVisibility, formatBalance };
}
