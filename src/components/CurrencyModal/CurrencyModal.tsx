import { memo, useEffect, useRef, useState } from "react";
import { X, Search, Check } from "lucide-react";
import { CurrencyModalProps } from "@/types/types";
import { searchCurrencies } from "@/lib/format";
import "./CurrencyModal.scss";

const CurrencyModal = memo(({
  isOpen,
  onClose,
  onSelect,
  selectedCurrency,
  searchQuery,
  onSearchChange,
  currencies,
  isLoading = false,
}: CurrencyModalProps) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredCurrencies = searchCurrencies(currencies, searchQuery);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setFocusedIndex(0);
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev < filteredCurrencies.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : filteredCurrencies.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredCurrencies[focusedIndex]) {
          onSelect(filteredCurrencies[focusedIndex]);
        }
        break;
    }
  };

  const handleCurrencyClick = (currency: typeof currencies[0]) => {
    onSelect(currency);
  };

  if (!isOpen) return null;

  return (
    <div className="currency-modal-overlay" onClick={onClose}>
      <div 
        className="currency-modal" 
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="currency-modal__header">
          <h2 className="currency-modal__title">Select currency</h2>
          <button 
            className="currency-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="currency-modal__content">
          <p className="currency-modal__description">
            Choose a currency from the list below or use the search bar to find a specific currency.
          </p>

          <div className="currency-modal__search">
            <Search size={16} className="currency-modal__search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="currency-modal__search-input"
              placeholder="Search currencies..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className="currency-modal__list" ref={listRef}>
            {isLoading ? (
              <div className="currency-modal__loading">
                <div className="currency-modal__skeleton"></div>
                <div className="currency-modal__skeleton"></div>
                <div className="currency-modal__skeleton"></div>
              </div>
            ) : filteredCurrencies.length === 0 ? (
              <div className="currency-modal__empty">
                No currencies found
              </div>
            ) : (
              filteredCurrencies.map((currency, index) => (
                <button
                  key={currency.code}
                  className={`currency-modal__item ${
                    index === focusedIndex ? 'currency-modal__item--focused' : ''
                  } ${
                    selectedCurrency?.code === currency.code ? 'currency-modal__item--selected' : ''
                  }`}
                  onClick={() => handleCurrencyClick(currency)}
                >
                  <div className="currency-modal__item-icon">
                    {currency.symbol}
                  </div>
                  <div className="currency-modal__item-info">
                    <div className="currency-modal__item-code">
                      {currency.code}
                    </div>
                    <div className="currency-modal__item-name">
                      {currency.name}
                    </div>
                  </div>
                  {selectedCurrency?.code === currency.code && (
                    <Check size={16} className="currency-modal__item-check" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default CurrencyModal;
