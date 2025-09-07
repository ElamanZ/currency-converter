import { useState, useEffect, useCallback } from 'react';
import { UserPreferences, STORAGE_KEYS } from '@/types/types';

const DEFAULT_PREFS: UserPreferences = {
  from: 'USD',
  to: 'EUR',
  amount: '1'
};

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFS);

  const loadPreferences = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PREFS);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPreferences({ ...DEFAULT_PREFS, ...parsed });
      }
    } catch (error) {
      console.warn('Failed to load preferences:', error);
    }
  }, []);

  const savePreferences = useCallback((newPrefs: Partial<UserPreferences>) => {
    const updated = { ...preferences, ...newPrefs };
    setPreferences(updated);
    
    try {
      localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify(updated));
    } catch (error) {
      console.warn('Failed to save preferences:', error);
    }
  }, [preferences]);

  const updateAmount = useCallback((amount: string) => {
    savePreferences({ amount });
  }, [savePreferences]);

  const updateFromCurrency = useCallback((from: string) => {
    savePreferences({ from });
  }, [savePreferences]);

  const updateToCurrency = useCallback((to: string) => {
    savePreferences({ to });
  }, [savePreferences]);

  const swapCurrencies = useCallback(() => {
    savePreferences({ 
      from: preferences.to, 
      to: preferences.from 
    });
  }, [preferences.from, preferences.to, savePreferences]);

  useEffect(() => {
    loadPreferences();
  }, [loadPreferences]);

  return {
    preferences,
    updateAmount,
    updateFromCurrency,
    updateToCurrency,
    swapCurrencies
  };
};