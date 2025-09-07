import { useQuery, useQueryClient } from '@tanstack/react-query';
import { currencyApi } from '@/services/currencyApi';
import { useCurrencyCache } from './useCurrencyCache';
import { useOnlineStatus } from './useOnlineStatus';
import { ExchangeRates } from '@/types/types';
import { useEffect } from 'react';

export const useExchangeRates = () => {
  const isOnline = useOnlineStatus();
  const { cachedRates, saveToCache } = useCurrencyCache();

  const query = useQuery<ExchangeRates, Error>({
    queryKey: ["exchangeRates"],
    queryFn: currencyApi.getExchangeRates,
    enabled: isOnline,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    placeholderData: cachedRates ?? undefined,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (query.data) {
      saveToCache(query.data);
    }
  }, [query.data, saveToCache]);

  return query;
};

export const useCurrencies = () => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: currencyApi.getCurrencies,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 3,
  });
};

export const useRefreshRates = () => {
  const queryClient = useQueryClient();
  const isOnline  = useOnlineStatus();

  return {
    refresh: () => {
      if (isOnline) {
        queryClient.invalidateQueries({ queryKey: ['exchangeRates'] });
      }
    },
    isOnline
  };
};