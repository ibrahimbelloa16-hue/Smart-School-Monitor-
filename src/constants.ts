import { NetworkOption, DataPlan } from './types';

export const DATAHUB_SVG_LOGO = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><defs><linearGradient id="datahubGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%232563EB"/><stop offset="100%" stop-color="%2310B981"/></linearGradient><linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%230B0F19"/><stop offset="100%" stop-color="%231E293B"/></linearGradient></defs><rect x="32" y="32" width="448" height="448" rx="100" fill="url(%23bgGrad)" stroke="url(%23datahubGrad)" stroke-width="8"/><path d="M288 96L160 272H256L224 416L352 240H256L288 96Z" fill="url(%23datahubGrad)"/></svg>`;

export const NETWORKS: NetworkOption[] = [
  {
    code: '01',
    name: 'MTN',
    color: '#EAB308', // Yellow
    badgeBg: 'rgba(234, 179, 8, 0.15)',
    prefixes: ['0803', '0806', '0703', '0706', '0813', '0816', '0810', '0814', '0903', '0906', '0913', '0916']
  },
  {
    code: '04',
    name: 'Airtel',
    color: '#EF4444', // Red
    badgeBg: 'rgba(239, 68, 68, 0.15)',
    prefixes: ['0802', '0808', '0708', '0812', '0701', '0902', '0901', '0904', '0907', '0912']
  },
  {
    code: '02',
    name: 'Glo',
    color: '#10B981', // Green
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    prefixes: ['0805', '0807', '0705', '0815', '0811', '0905', '0915']
  },
  {
    code: '03',
    name: '9mobile',
    color: '#065F46', // Dark Emerald
    badgeBg: 'rgba(5, 150, 105, 0.15)',
    prefixes: ['0809', '0817', '0818', '0909', '0908']
  }
];

export const DATA_PLANS: DataPlan[] = [
  // MTN
  { id: 'mtn-sme-500mb', code: '500', networkCode: '01', type: 'SME', name: 'MTN SME Data', size: '500 MB', validity: '30 Days', price: 145 },
  { id: 'mtn-sme-1gb', code: '1000', networkCode: '01', type: 'SME', name: 'MTN SME Data', size: '1.0 GB', validity: '30 Days', price: 285 },
  { id: 'mtn-sme-2gb', code: '2000', networkCode: '01', type: 'SME', name: 'MTN SME Data', size: '2.0 GB', validity: '30 Days', price: 570 },
  { id: 'mtn-sme-3gb', code: '3000', networkCode: '01', type: 'SME', name: 'MTN SME Data', size: '3.0 GB', validity: '30 Days', price: 855 },
  { id: 'mtn-sme-5gb', code: '5000', networkCode: '01', type: 'SME', name: 'MTN SME Data', size: '5.0 GB', validity: '30 Days', price: 1425 },
  { id: 'mtn-sme-10gb', code: '10000', networkCode: '01', type: 'SME', name: 'MTN SME Data', size: '10.0 GB', validity: '30 Days', price: 2850 },
  { id: 'mtn-cg-1gb', code: 'CG1000', networkCode: '01', type: 'Corporate', name: 'MTN Corporate Gifting', size: '1.0 GB', validity: '30 Days', price: 290 },
  { id: 'mtn-cg-2gb', code: 'CG2000', networkCode: '01', type: 'Corporate', name: 'MTN Corporate Gifting', size: '2.0 GB', validity: '30 Days', price: 580 },

  // AIRTEL
  { id: 'airtel-cg-500mb', code: 'A500', networkCode: '04', type: 'Corporate', name: 'Airtel Corporate Gifting', size: '500 MB', validity: '30 Days', price: 140 },
  { id: 'airtel-cg-1gb', code: 'A1000', networkCode: '04', type: 'Corporate', name: 'Airtel Corporate Gifting', size: '1.0 GB', validity: '30 Days', price: 280 },
  { id: 'airtel-cg-2gb', code: 'A2000', networkCode: '04', type: 'Corporate', name: 'Airtel Corporate Gifting', size: '2.0 GB', validity: '30 Days', price: 560 },
  { id: 'airtel-cg-5gb', code: 'A5000', networkCode: '04', type: 'Corporate', name: 'Airtel Corporate Gifting', size: '5.0 GB', validity: '30 Days', price: 1400 },
  { id: 'airtel-cg-10gb', code: 'A10000', networkCode: '04', type: 'Corporate', name: 'Airtel Corporate Gifting', size: '10.0 GB', validity: '30 Days', price: 2800 },

  // GLO
  { id: 'glo-cg-1gb', code: 'G1000', networkCode: '02', type: 'Corporate', name: 'Glo Corporate Gifting', size: '1.0 GB', validity: '30 Days', price: 260 },
  { id: 'glo-cg-2gb', code: 'G2000', networkCode: '02', type: 'Corporate', name: 'Glo Corporate Gifting', size: '2.0 GB', validity: '30 Days', price: 520 },
  { id: 'glo-cg-3gb', code: 'G3000', networkCode: '02', type: 'Corporate', name: 'Glo Corporate Gifting', size: '3.0 GB', validity: '30 Days', price: 780 },
  { id: 'glo-cg-5gb', code: 'G5000', networkCode: '02', type: 'Corporate', name: 'Glo Corporate Gifting', size: '5.0 GB', validity: '30 Days', price: 1300 },

  // 9MOBILE
  { id: '9mob-cg-1gb', code: '9M1000', networkCode: '03', type: 'Corporate', name: '9mobile Corporate Gifting', size: '1.0 GB', validity: '30 Days', price: 230 },
  { id: '9mob-cg-2gb', code: '9M2000', networkCode: '03', type: 'Corporate', name: '9mobile Corporate Gifting', size: '2.0 GB', validity: '30 Days', price: 460 },
  { id: '9mob-cg-5gb', code: '9M5000', networkCode: '03', type: 'Corporate', name: '9mobile Corporate Gifting', size: '5.0 GB', validity: '30 Days', price: 1150 }
];

export const CABLE_PROVIDERS = [
  {
    name: 'DSTV',
    packages: [
      { name: 'DStv Padi', price: 4400 },
      { name: 'DStv Yanga', price: 6000 },
      { name: 'DStv Confam', price: 11000 },
      { name: 'DStv Compact', price: 19000 },
      { name: 'DStv Compact Plus', price: 30000 },
      { name: 'DStv Premium', price: 44000 }
    ]
  },
  {
    name: 'GOtv',
    packages: [
      { name: 'GOtv Smallie', price: 1900 },
      { name: 'GOtv Jinja', price: 3900 },
      { name: 'GOtv Jolli', price: 5800 },
      { name: 'GOtv Max', price: 8500 },
      { name: 'GOtv Supa', price: 11400 },
      { name: 'GOtv Supa+', price: 16800 }
    ]
  },
  {
    name: 'Startimes',
    packages: [
      { name: 'Nova (Monthly)', price: 1700 },
      { name: 'Basic (Monthly)', price: 3300 },
      { name: 'Smart (Monthly)', price: 4200 },
      { name: 'Classic (Monthly)', price: 5000 },
      { name: 'Super (Monthly)', price: 8200 }
    ]
  }
];

export const ELECTRICITY_DISCOS = [
  { id: 'AEDC', name: 'Abuja Electricity (AEDC)' },
  { id: 'EKEDC', name: 'Eko Electricity (EKEDC)' },
  { id: 'IKEDC', name: 'Ikeja Electric (IKEDC)' },
  { id: 'IBEDC', name: 'Ibadan Electricity (IBEDC)' },
  { id: 'EEDC', name: 'Enugu Electricity (EEDC)' },
  { id: 'PHEDC', name: 'Port Harcourt Electricity (PHED)' },
  { id: 'KEDCO', name: 'Kano Electricity (KEDCO)' },
  { id: 'JED', name: 'Jos Electricity (JED)' }
];

export const BETTING_PLATFORMS = [
  { id: 'sportybet', name: 'SportyBet' },
  { id: 'bet9ja', name: 'Bet9ja' },
  { id: '1xbet', name: '1xBet' },
  { id: 'betway', name: 'Betway' },
  { id: 'merrybet', name: 'MerryBet' }
];
