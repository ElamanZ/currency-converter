import { Currency } from '@/types/types';

export const getCurrencySymbol = (code: string) => {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .formatToParts(0)
    .find((part) => part.type === "currency")?.value;
};

export function toNumberLoose(input: string): number | null {
  const normalized = input.replace(",", ".").replace(/\s+/g, "");
  const n = Number.parseFloat(normalized);
  return Number.isFinite(n) ? n : null;
}


export function formatTimestamp(ts: number): string {
  return new Date(ts).toLocaleString('ru-RU', {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}



export function formatCurrency(amount: number, currency: Currency, locale = "en-US"): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency.symbol}${amount.toFixed(2)}`;
  }
}

export function searchCurrencies(currencies: Currency[], query: string): Currency[] {
  if (!query.trim()) return currencies;
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return currencies.filter(currency => 
    currency.code.toLowerCase().includes(normalizedQuery) ||
    currency.name.toLowerCase().includes(normalizedQuery) ||
    currency.symbol.toLowerCase().includes(normalizedQuery)
  );
}
