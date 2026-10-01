# Standard DataHub VTU

A modern, high-speed telecom VTU (Virtual Top-Up) and digital subscription portal built for Nigeria. Features instant mobile data bundle purchases (MTN, Airtel, Glo, 9mobile), airtime top-up with automatic cash discounts, integer-kobo financial wallet ledger, manual bank transfer wallet funding, transaction PIN security, and full Supabase cloud integration with zero localStorage dependence.

---

## Features

- **Automated Mobile Data Bundles**: Instant delivery for MTN (SME, Corporate, Gifting), Airtel (Corporate, Gifting), Glo, and 9mobile.
- **Airtime VTU Top-Up**: Real-time airtime purchase with instant discounts across all Nigerian GSM networks.
- **Supabase Cloud Persistence**: 100% cloud-backed authentication, data plans, wallet balances, and transactions without relying on browser `localStorage`.
- **Atomic Wallet Ledger**: High-integrity integer kobo balance tracking (`balance_kobo`) preventing fractional currency loss or floating-point rounding errors.
- **Manual Bank Funding & Receipt Verification**: Seamless manual bank transfer requests with optional transfer reference or payment receipt screenshot upload.
- **Transaction PIN Protection**: 4-digit bcrypt-hashed security PIN required for all debits and data/airtime purchases.
- **Provider Status Resolution**: Robust ClubKonnect API integration with automatic fallback refunds if carrier networks are unavailable.
- **PWA & Mobile Install Ready**: Full Progressive Web App manifest, offline service worker caching, and one-tap home screen install prompt.
- **Dark & Light Mode**: Fluid Tailwind CSS theming with responsive desktop and mobile navigation.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Cloud Database & Auth**: Supabase Cloud (`@supabase/supabase-js`, PostgreSQL, Row-Level Security)
- **Backend / API**: Express.js, Node.js, `pg` (node-postgres), tsx
- **Telecom Provider**: ClubKonnect / Nellobyte Systems VTU API

---

## Setup Steps

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/ibrahimbelloa16-hue/Standard-DataHub-VTU.git
cd Standard-DataHub-VTU
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and provide your credentials:

```bash
cp .env.example .env
```

Open `.env` and fill in:
- `VITE_SUPABASE_URL`: Your Supabase Project URL (e.g. `https://your-project.supabase.co`)
- `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon public key
- `CLUBKONNECT_USER_ID`: Your ClubKonnect User ID
- `CLUBKONNECT_API_KEY`: Your ClubKonnect API Key

### 3. Setup Supabase Database

1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open your project and navigate to the **SQL Editor** from the left navigation menu.
3. Open `supabase-schema.sql` from this repository, copy its entire contents, paste it into the SQL Editor, and click **Run**.
4. The following tables with Row Level Security (RLS) policies will be created:
   - `data_plans`
   - `transactions`
   - `wallet`

### 4. Run Development Server

```bash
npm run dev
```

The application will be live at `http://localhost:3000`.

### 5. Build for Production

```bash
npm run build
```

---

## Deploy to Vercel

1. Push your repository to GitHub: `ibrahimbelloa16-hue/Standard-DataHub-VTU`.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Set the Framework Preset to **Vite**.
5. In **Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `CLUBKONNECT_USER_ID`
   - `CLUBKONNECT_API_KEY`
   - `CLUBKONNECT_BASE_URL`
6. Click **Deploy**. Vercel will build the frontend into `dist/` and deploy it to a global edge network.

---

## License

MIT License. Designed and engineered for Standard DataHub VTU.
