import { useMemo } from 'react';
import { Currency } from '@/types/types';

interface UseCurrencyDataProps {
  currencies: Currency[];
  fromCode: string;
  toCode: string;
}

export const useCurrencyData = ({ 
  currencies, 
  fromCode, 
  toCode 
}: UseCurrencyDataProps) => {
  const fromCurrency = useMemo((): Currency => {
    return currencies.find(c => c.code === fromCode) || {
      code: fromCode,
      name: fromCode,
      symbol: fromCode
    };
  }, [currencies, fromCode]);

  const toCurrency = useMemo((): Currency => {
    return currencies.find(c => c.code === toCode) || {
      code: toCode,
      name: toCode,
      symbol: toCode
    };
  }, [currencies, toCode]);

  return {
    fromCurrency,
    toCurrency
  };
};