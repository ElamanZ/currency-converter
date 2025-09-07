import { useState, useEffect, useCallback } from 'react';
import { ExchangeRates, CachedRates, STORAGE_KEYS, CACHE_DURATION } from '@/types/types';

export const useCurrencyCache = () => {
  const [cachedRates, setCachedRates] = useState<ExchangeRates | null>(null);
  const [isUsingCache, setIsUsingCache] = useState(false);

  const saveToCache = useCallback((rates: ExchangeRates) => {
    const cached: CachedRates = {
      data: rates,
      timestamp: Date.now(),
      expiresAt: Date.now() + CACHE_DURATION
    };
    
    try {
      localStorage.setItem(STORAGE_KEYS.CACHED_RATES, JSON.stringify(cached));
      setCachedRates(rates);
      setIsUsingCache(false);
    } catch (error) {
      console.warn('Failed to save rates to cache:', error);
    }
  }, []);

  const loadFromCache = useCallback((): ExchangeRates | null => {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.CACHED_RATES);
      if (!cached) return null;

      const parsed: CachedRates = JSON.parse(cached);
      const now = Date.now();

      if (now > parsed.expiresAt) {
        localStorage.removeItem(STORAGE_KEYS.CACHED_RATES);
        return null;
      }

      setCachedRates(parsed.data);
      setIsUsingCache(true);
      return parsed.data;
    } catch (error) {
      console.warn('Failed to load rates from cache:', error);
      return null;
    }
  }, []);

  const clearCache = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CACHED_RATES);
      setCachedRates(null);
      setIsUsingCache(false);
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }, []);

  useEffect(() => {
    loadFromCache();
  }, [loadFromCache]);

  return {
    cachedRates,
    isUsingCache,
    saveToCache,
    loadFromCache,
    clearCache
  };
};