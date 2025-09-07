# Currency Converter

A modern single-page currency converter web application built with React + TypeScript. Features real-time exchange rates, offline support, and responsive design.

## 🚀 Features

- **Real-time Exchange Rates**: Live currency conversion using VATComply API
- **Offline Support**: Cached data functionality when internet is unavailable
- **Responsive Design**: Optimized for mobile (≤480px) and desktop (≥1024px)
- **Currency Search**: Quick search by currency code and name
- **Keyboard Navigation**: Full keyboard support in currency selection modal
- **Auto-save**: Remembers last selected currencies and amount in localStorage
- **Debounced Input**: Optimized API calls with 250ms debounce
- **TypeScript**: Strict typing for code reliability
- **Error Handling**: Graceful error handling with retry functionality

## 🛠 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Query** - Server state management
- **Axios** - HTTP client
- **SCSS** - Styling
- **Lucide React** - Icons

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd currency-converter
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file in the project root:
```env
VITE_API_URL=https://api.vatcomply.com
```

4. Start the development server:
```bash
pnpm dev
```

## 🏗 Architecture

### Project Structure

```
src/
├── components/          # React components
│   ├── ConverterPanel/  # Input panel and currency selectors
│   ├── CurrencyModal/   # Currency selection modal
│   ├── ResultCard/      # Conversion result display
│   ├── StatusBar/       # Network status indicator
│   └── ErrorDisplay/    # Error handling component
├── hooks/               # Custom hooks
│   ├── useCurrencyQueries.ts  # React Query hooks
│   ├── useCurrencyCache.ts    # Currency caching logic
│   ├── useUserPreferences.ts  # User preferences management
│   ├── useOnlineStatus.ts     # Online/offline status
│   ├── useDebounce.ts         # Debounce hook
│   └── useConverterPageData.ts # Main page data hook
├── lib/                 # Utilities
│   ├── calc.ts          # Conversion calculation logic
│   └── format.ts        # Data formatting utilities
├── services/            # API services
│   └── currencyApi.ts   # Currency API service
├── types/               # TypeScript definitions
│   └── types.ts         # Type definitions
└── utils/               # Helper utilities
    ├── baseAxios.ts     # Axios configuration
    └── errors.ts        # Error handling utilities
```

### Architecture Principles

- **SOLID**: Following SOLID principles
- **KISS**: Keep it simple and straightforward
- **DRY**: Don't repeat yourself
- **YAGNI**: You aren't gonna need it

### State Management

- **React Query**: Server state (exchange rates, currency list)
- **Local State**: UI state (modals, search)
- **LocalStorage**: Persistent user preferences and cached data

### Caching Strategy

- **React Query Cache**: Automatic API request caching
- **LocalStorage Cache**: Manual caching for offline mode
- **Cache Expiration**: Auto-refresh cache after 5 minutes
- **Offline Fallback**: Use cached data when offline with clear timestamp display

## 🎨 Design

The application follows the provided Figma mockups with support for:

- **Mobile Version** (≤ 480px)
- **Desktop Version** (≥ 1024px)
- **Responsive Grid**: Optimal display across devices
- **Modern UI**: Smooth animations and transitions

## 🔧 API Integration

Uses **VATComply API** for exchange rates:

- **Endpoint**: `https://api.vatcomply.com/rates`
- **Base Currency**: EUR (default)
- **Update Frequency**: Every 5 minutes
- **Fallback**: Cached data on errors

### Conversion Logic

Handles base currency conversion using the formula:
```
rate(A→B) = rate(Base→B) / rate(Base→A)
```

## 🚀 Performance Optimizations

- **Memoization**: React.memo, useMemo, useCallback
- **Debounced Input**: 250ms debounce for amount input
- **Lazy Loading**: Component lazy loading where appropriate
- **Efficient Re-renders**: Clean state management to prevent unnecessary renders

## 🧪 Development

```bash
# Run linter
pnpm lint

# Build for production
pnpm build

# Preview production build
pnpm preview
```
