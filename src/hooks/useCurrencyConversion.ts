import { useMemo } from 'react';
import { Currency, ExchangeRates, ConversionResult } from '@/types/types';
import { calculateConversion } from '@/lib/calc';
import { toNumberLoose } from '@/lib/format';

interface UseCurrencyConversionProps {
  amount: string;
  fromCurrency: Currency;
  toCurrency: Currency;
  exchangeRates: ExchangeRates | null;
}

export const useCurrencyConversion = ({
  amount,
  fromCurrency,
  toCurrency,
  exchangeRates
}: UseCurrencyConversionProps) => {
  const parsedAmount = useMemo(() => toNumberLoose(amount) ?? 0, [amount]);

  const conversionResult = useMemo((): ConversionResult | null => {
    if (!exchangeRates || parsedAmount <= 0) return null;
    
    return calculateConversion(parsedAmount, fromCurrency, toCurrency, exchangeRates);
  }, [exchangeRates, parsedAmount, fromCurrency, toCurrency]);

  return {
    parsedAmount,
    conversionResult
  };
};