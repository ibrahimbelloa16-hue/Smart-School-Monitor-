import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to manage wallet balance visibility across the entire application.
 * Uses in-memory state with zero localStorage dependencies.
 * Defaults to visible (false).
 */
let globalWalletHidden = false;

export function useWalletVisibility() {
  const [isHidden, setIsHidden] = useState<boolean>(globalWalletHidden);

  const toggleVisibility = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setIsHidden((prev) => {
      const next = !prev;
      globalWalletHidden = next;
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('wallet_hidden_change'));
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const handleSync = () => {
      setIsHidden(globalWalletHidden);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('wallet_hidden_change', handleSync);
      return () => {
        window.removeEventListener('wallet_hidden_change', handleSync);
      };
    }
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
