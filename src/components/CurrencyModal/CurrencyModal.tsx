import { memo, useEffect, useRef, useState, KeyboardEvent } from "react";
import { X, Search, Check } from "lucide-react";
import { CurrencyModalProps } from "@/types/types";
import { getCurrencySymbol, searchCurrencies } from "@/lib/format";
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
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filteredCurrencies = searchCurrencies(currencies, searchQuery);

  useEffect(() => {
    if (isOpen) searchInputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    setFocusedIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    const el = itemRefs.current[focusedIndex];
    if (el) {
      el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [focusedIndex]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!filteredCurrencies.length) return;

    const lastIndex = filteredCurrencies.length - 1;

    switch (e.key) {
      case "Escape":
        onClose();
        break;

      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((i) => (i < lastIndex ? i + 1 : 0));
        break;

      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((i) => (i > 0 ? i - 1 : lastIndex));
        break;

      case "Enter":
        e.preventDefault();
        const selected = filteredCurrencies[focusedIndex];
        if (selected) onSelect(selected);
        break;
    }
  };

  const renderList = () => {
    if (isLoading) {
      return (
        <div className="currency-modal__loading">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="currency-modal__skeleton" />
          ))}
        </div>
      );
    }

    if (!filteredCurrencies.length) {
      return <div className="currency-modal__empty">No currencies found</div>;
    }

    return filteredCurrencies.map((currency, index) => {
      const isFocused = index === focusedIndex;
      const isSelected = selectedCurrency?.code === currency.code;

      return (
        <button
          key={currency.code}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          className={[
            "currency-modal__item",
            isFocused && "currency-modal__item--focused",
            isSelected && "currency-modal__item--selected",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => onSelect(currency)}
          onMouseEnter={() => setFocusedIndex(index)}
        >
          <div className="currency-modal__item-icon">
            {getCurrencySymbol(currency.symbol)}
          </div>
          <div className="currency-modal__item-info">
            <div className="currency-modal__item-code">{currency.code}</div>
            <div className="currency-modal__item-name">{currency.name}</div>
          </div>
          {isSelected && <Check size={16} className="currency-modal__item-check" />}
        </button>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <div className="currency-modal-overlay" onClick={onClose}>
      <div
        className="currency-modal"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        tabIndex={0} 
      >
        <header className="currency-modal__header">
          <h2 className="currency-modal__title">Select currency</h2>
          <button
            className="currency-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </header>

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

          <div className="currency-modal__list">{renderList()}</div>
        </div>
      </div>
    </div>
  );
});

CurrencyModal.displayName = "CurrencyModal";
export default CurrencyModal;
