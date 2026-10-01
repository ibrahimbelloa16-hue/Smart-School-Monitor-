export function formatNaira(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '₦0.00';
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num).replace('NGN', '₦');
}

export function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date);
}

export const NETWORK_INFO: Record<string, { name: string; bg: string; text: string; border: string; badge: string }> = {
  MTN: {
    name: 'MTN',
    bg: 'bg-amber-400',
    text: 'text-amber-950',
    border: 'border-amber-400',
    badge: 'bg-amber-100 text-amber-900 border-amber-300'
  },
  AIRTEL: {
    name: 'Airtel',
    bg: 'bg-red-600',
    text: 'text-white',
    border: 'border-red-600',
    badge: 'bg-red-100 text-red-900 border-red-300'
  },
  GLO: {
    name: 'Glo',
    bg: 'bg-emerald-600',
    text: 'text-white',
    border: 'border-emerald-600',
    badge: 'bg-emerald-100 text-emerald-900 border-emerald-300'
  },
  '9MOBILE': {
    name: '9mobile',
    bg: 'bg-teal-800',
    text: 'text-white',
    border: 'border-teal-800',
    badge: 'bg-teal-100 text-teal-900 border-teal-300'
  }
};
