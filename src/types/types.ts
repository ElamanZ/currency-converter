export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface ExchangeRates {
  base: string;
  rates: Record<string, number>;
  timestamp: number;
}

export interface ConversionResult {
  amount: number;
  from: Currency;
  to: Currency;
  converted: number;
  rate: number;
  inverseRate: number;
}

export type CurrencyApiResponse = Record<
  string,
  { name: string; symbol: string }
>;
export interface UserPreferences {
  from: string;
  to: string;
  amount: string;
}

export interface VATComplyResponse {
  base: string;
  rates: Record<string, number>;
  date: string;
}

export interface FXRatesResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface ConverterPanelProps {
  amount: string;
  fromCurrency: Currency;
  toCurrency: Currency;
  onAmountChange: (amount: string) => void;
  onFromCurrencySelect: () => void;
  onToCurrencySelect: () => void;
  onSwap: () => void;
  isLoading?: boolean;
}

export interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (currency: Currency) => void;
  selectedCurrency?: Currency;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currencies: Currency[];
  isLoading?: boolean;
}

export interface ResultCardProps {
  result: ConversionResult | null;
  isLoading?: boolean;
}

export interface StatusBarProps {
  isOnline: boolean;
  lastUpdated: string | null;
  onRefresh: () => void;
  isLoading: boolean;
  isUsingCache: boolean;
}

export interface AppError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface CachedRates {
  data: ExchangeRates;
  timestamp: number;
  expiresAt: number;
}

export const STORAGE_KEYS = {
  PREFS: 'currency_converter_prefs',
  CACHED_RATES: 'currency_converter_cached_rates',
} as const;

export const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
export const DEBOUNCE_DELAY = 250; // 250ms
