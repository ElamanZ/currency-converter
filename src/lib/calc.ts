
import { ExchangeRates, Currency, ConversionResult } from '@/types/types';

function rateAToB(base: string, rates: Record<string, number>, A: string, B: string): number | null {
  if (A === B) return 1;
  
  const rB = rates[B];
  const rA = rates[A];
  
  if (rA == null || rB == null) return null;
  
  return rB / rA;
}

export function calculateConversion(
  amount: number,
  from: Currency,
  to: Currency,
  rates: ExchangeRates
): ConversionResult | null {
  if (amount <= 0) return null;
  
  const rate = rateAToB(rates.base, rates.rates, from.code, to.code);
  if (rate === null) return null;
  
  const converted = amount * rate;
  const inverseRate = 1 / rate;
  
  return {
    amount,
    from,
    to,
    converted,
    rate,
    inverseRate
  };
}
