# SIMS PPOB - Payment Point Online Bank

**Author:** Galih Sansabila

Aplikasi web untuk manajemen pembayaran PPOB (Payment Point Online Bank) yang memungkinkan pengguna untuk melakukan top up saldo, pembayaran layanan, dan melihat riwayat transaksi.

## 🚀 Features

### Authentication
- **Register**: Pendaftaran akun baru dengan validasi email dan password
- **Login**: Login dengan email dan password
- **Protected Routes**: Semua halaman utama dilindungi dengan autentikasi JWT

### Dashboard & Home
- **Profile Display**: Menampilkan informasi profil pengguna
- **Balance Card**: Menampilkan saldo dengan opsi show/hide
- **Service Grid**: Grid layanan PPOB yang tersedia (Listrik, Pulsa, PDAM, dll)
- **Banner Carousel**: Banner promosi yang dapat di-scroll

### Top Up
- **Amount Input**: Input nominal top up dengan validasi
- **Preset Amounts**: 6 tombol preset (10k, 20k, 50k, 100k, 250k, 500k)
- **Validation**: Min 10,000 - Max 1,000,000
- **Confirmation Modal**: Konfirmasi sebelum melakukan top up
- **Success/Error Modal**: Feedback setelah transaksi

### Payment
- **Service Selection**: Pilih layanan dari homepage
- **Amount Display**: Nominal otomatis dari API
- **Confirmation Flow**: Konfirmasi pembayaran
- **Balance Update**: Saldo otomatis berkurang setelah pembayaran

### Transaction History
- **Transaction List**: Daftar transaksi dengan color coding
  - Green (+) untuk TOPUP
  - Red (-) untuk PAYMENT
- **Pagination**: Load 5 transaksi pertama
- **Show More**: Load 5 transaksi berikutnya
- **Date Formatting**: Format tanggal Indonesia

### Profile
- **View Profile**: Lihat informasi profil (email, nama depan, nama belakang)
- **Edit Profile**: Edit nama depan dan belakang
- **Profile Picture Upload**: Upload foto profil
  - Format: JPEG/PNG only
  - Max size: 100KB
  - Click to upload
- **Logout**: Keluar dan hapus session

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Redux Toolkit** - State Management
- **React Router DOM** - Routing
- **Axios** - HTTP Client
- **Vite** - Build Tool

### Styling
- **CSS Modules** - Component Styling
- **Custom CSS** - Responsive Design
- **React Icons** - Material Design Icons

## 📁 Project Structure

```
simsPpob/
├── src/
│   ├── api/
│   │   └── axiosInstance.ts          # Axios configuration
│   ├── app/
│   │   └── store.ts                  # Redux store
│   ├── assets/                       # Images & icons
│   ├── components/
│   │   ├── Navbar.tsx                # Navigation bar
│   │   ├── BalanceCard.tsx           # Balance display
│   │   ├── ServiceGrid.tsx           # Service grid
│   │   ├── BannerCarousel.tsx        # Banner carousel
│   │   └── ProtectedRoute.tsx        # Route protection
│   ├── features/
│   │   ├── auth/
│   │   │   ├── authService.ts        # Auth API calls
│   │   │   └── authSlice.ts          # Auth state
│   │   └── home/
│   │       ├── homeService.ts        # Home API calls
│   │       └── homeSlice.ts          # Home state
│   ├── pages/
│   │   ├── Login.tsx                 # Login page
│   │   ├── Register.tsx              # Register page
│   │   ├── Homepage.tsx              # Homepage
│   │   ├── TopUp.tsx                 # Top up page
│   │   ├── Payment.tsx               # Payment page
│   │   ├── TransactionHistory.tsx    # Transaction history
│   │   └── Profile.tsx               # Profile page
│   ├── App.tsx                       # Main app component
│   └── main.tsx                      # Entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🔧 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone repository**
   ```bash
   git clone https://github.com/sansabilagalih/sims-ppob.git
   cd simsPpob
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:5173
   ```

## 🌐 API Integration

### Base URL
```
https://take-home-test-api.nutech-integrasi.com
```

### Endpoints

#### Authentication
- `POST /registration` - Register new user
- `POST /login` - Login user

#### Profile
- `GET /profile` - Get user profile
- `PUT /profile/update` - Update profile
- `PUT /profile/image` - Upload profile picture

#### Balance & Services
- `GET /balance` - Get user balance
- `GET /services` - Get available services
- `GET /banner` - Get banners

#### Transactions
- `POST /topup` - Top up balance
- `POST /transaction` - Make payment
- `GET /transaction/history` - Get transaction history

### Authentication
All protected endpoints require Bearer token:
```
Authorization: Bearer <token>
```

## 📱 Pages & Routes

| Route | Component | Description | Protected |
|-------|-----------|-------------|-----------|
| `/` | Redirect to `/home` | Default route | - |
| `/login` | Login | Login page | ❌ |
| `/register` | Register | Registration page | ❌ |
| `/home` | Homepage | Dashboard | ✅ |
| `/topup` | TopUp | Top up balance | ✅ |
| `/payment/:serviceCode` | Payment | Service payment | ✅ |
| `/transaction` | TransactionHistory | Transaction history | ✅ |
| `/profile` | Profile | User profile | ✅ |

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach
- Breakpoints untuk tablet dan desktop
- Touch-friendly buttons

### User Feedback
- Loading states
- Success notifications
- Error messages
- Confirmation modals

### Validation
- Client-side validation
- Real-time feedback
- Error messages yang jelas

## 🔐 Security

- JWT token authentication
- Protected routes
- Token stored in localStorage
- Automatic token attachment to requests
- Logout clears all session data

## 📊 State Management

### Redux Slices

#### Auth Slice
- User authentication state
- Token management
- Login/Register actions

#### Home Slice
- Profile data
- Balance
- Services
- Banners
- Transactions
- Loading states

## 🧪 Testing

### Manual Testing
Semua fitur telah ditest secara manual:
- ✅ Registration flow dengan validasi
- ✅ Login flow dengan error handling
- ✅ Homepage dengan balance card dan service grid
- ✅ Top up dengan modal konfirmasi
- ✅ Payment flow dengan modal konfirmasi
- ✅ Transaction history dengan pagination (offset-based)
- ✅ Profile view dan edit dengan validasi
- ✅ Profile picture upload dengan validasi file
- ✅ Logout dengan clear session

## 👤 Author

**Galih Sansabila**

---

