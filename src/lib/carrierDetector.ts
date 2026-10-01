export type NetworkCarrier = 'MTN' | 'AIRTEL' | 'GLO' | '9MOBILE';

/**
 * Standard Nigerian Mobile Network Operator prefixes
 */
export const CARRIER_PREFIXES: Record<NetworkCarrier, string[]> = {
  MTN: [
    '0803', '0806', '0703', '0706', '0813', '0816', '0810', '0814', '0903', '0906', '0913', '0916'
  ],
  AIRTEL: [
    '0802', '0808', '0701', '0708', '0812', '0902', '0907', '0901', '0912', '0911'
  ],
  GLO: [
    '0805', '0807', '0705', '0815', '0811', '0905', '0915'
  ],
  '9MOBILE': [
    '0809', '0818', '0817', '0909', '0908'
  ]
};

/**
 * Auto-detects the Nigerian telecommunications network from phone number prefix.
 * Supports formats: 0803..., +234803..., 234803...
 */
export function detectCarrier(rawPhone: string): NetworkCarrier | null {
  if (!rawPhone) return null;

  // Strip all non-digit characters
  let digits = rawPhone.replace(/\D/g, '');

  // Convert international prefixes to standard local 0-prefix
  if (digits.startsWith('234')) {
    digits = '0' + digits.slice(3);
  }

  // Need at least 4 digits (e.g. 0803) to detect carrier
  if (digits.length < 4) return null;

  const prefix = digits.slice(0, 4);

  for (const [carrier, prefixes] of Object.entries(CARRIER_PREFIXES) as [NetworkCarrier, string[]][]) {
    if (prefixes.includes(prefix)) {
      return carrier;
    }
  }

  return null;
}
