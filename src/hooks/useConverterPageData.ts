import { useMemo } from 'react';
import { useExchangeRates, useCurrencies, useRefreshRates } from './useCurrencyQueries';
import { useUserPreferences } from './useUserPreferences';
import { useOnlineStatus } from './useOnlineStatus';
import { useDebounce } from './useDebounce';
import { useCurrencyData } from './useCurrencyData';
import { useCurrencyConversion } from './useCurrencyConversion';


export const useConverterPageData = () => {
  const isOnline = useOnlineStatus();
  const { preferences, updateAmount, updateFromCurrency, updateToCurrency, swapCurrencies } = useUserPreferences();
  const debouncedAmount = useDebounce(preferences.amount, 250);

  const { data: exchangeRates, isLoading: ratesLoading, error: ratesError } = useExchangeRates();
  const { data: currencies = [], isLoading: currenciesLoading } = useCurrencies();
  const { refresh } = useRefreshRates();

  const { fromCurrency, toCurrency } = useCurrencyData({
    currencies,
    fromCode: preferences.from,
    toCode: preferences.to
  });

  const { conversionResult } = useCurrencyConversion({
    amount: debouncedAmount,
    fromCurrency,
    toCurrency,
    exchangeRates: exchangeRates ?? null
  });

  const isLoading = useMemo(() => ratesLoading || currenciesLoading, [ratesLoading, currenciesLoading]);
  
  const hasError = useMemo(() => !!ratesError, [ratesError]);

  return {
    isOnline,
    isLoading,
    hasError,
    preferences,
    currencies,
    exchangeRates,
    fromCurrency,
    toCurrency,
    conversionResult,
    ratesError,
    updateAmount,
    updateFromCurrency,
    updateToCurrency,
    swapCurrencies,
    refresh
  };
};