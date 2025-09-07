import { useState, useCallback } from 'react';
import { Currency } from '@/types/types';

interface ModalState {
  isOpen: boolean;
  type: 'from' | 'to' | null;
}

export const useCurrencyModal = () => {
  const [modalState, setModalState] = useState<ModalState>({ 
    isOpen: false, 
    type: null 
  });
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = useCallback((type: 'from' | 'to') => {
    setModalState({ isOpen: true, type });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ isOpen: false, type: null });
    setSearchQuery('');
  }, []);

  const handleCurrencySelect = useCallback((
    currency: Currency,
    onFromSelect: (code: string) => void,
    onToSelect: (code: string) => void
  ) => {
    if (modalState.type === 'from') {
      onFromSelect(currency.code);
    } else if (modalState.type === 'to') {
      onToSelect(currency.code);
    }
    closeModal();
  }, [modalState.type, closeModal]);

  return {
    modalState,
    searchQuery,
    setSearchQuery,
    openModal,
    closeModal,
    handleCurrencySelect
  };
};