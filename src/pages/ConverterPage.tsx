import { useCallback } from "react";
import StatusBar from "@/components/StatusBar/StatusBar";
import { ConverterPanel } from "@/components/ConverterPanel/ConverterPanel";
import ResultCard from "@/components/ResultCard/ResultCard";
import CurrencyModal from "@/components/CurrencyModal/CurrencyModal";
import { ErrorDisplay } from "@/components/ErrorDisplay/ErrorDisplay";
import { useConverterPageData } from "@/hooks/useConverterPageData";
import { useCurrencyModal } from "@/hooks/useCurrencyModal";
import { formatTimestamp } from "@/lib/format";
import { Currency } from "@/types/types";
import "./ConverterPage.scss";

const ConverterPage = () => {
  const {
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
  } = useConverterPageData();

  const { modalState, searchQuery, setSearchQuery, openModal, closeModal, handleCurrencySelect } = useCurrencyModal();

  const handleFromCurrencySelect = useCallback(() => {
    openModal('from');
  }, [openModal]);

  const handleToCurrencySelect = useCallback(() => {
    openModal('to');
  }, [openModal]);

  const handleCurrencySelectCallback = useCallback((currency: Currency) => {
    handleCurrencySelect(currency, updateFromCurrency, updateToCurrency);
  }, [handleCurrencySelect, updateFromCurrency, updateToCurrency]);

  const selectedCurrency = modalState.type === "from" ? fromCurrency : toCurrency;

 
  return (
    <div className="converter-page">
      <div className="converter-page__header">
        <h1 className="converter-page__title">Currency converter</h1>
        <p className="converter-page__subtitle">Get real-time exchange rates</p>
      </div>

      <StatusBar
        isOnline={isOnline}
        lastUpdated={exchangeRates ? formatTimestamp(exchangeRates?.timestamp) : null}
        onRefresh={refresh}
        isLoading={isLoading}
        isUsingCache={!isOnline && !!exchangeRates}
      />

      <div className="converter-page__content">
        <ConverterPanel
          amount={preferences.amount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          onAmountChange={updateAmount}
          onFromCurrencySelect={handleFromCurrencySelect}
          onToCurrencySelect={handleToCurrencySelect}
          onSwap={swapCurrencies}
          isLoading={isLoading}
        />

        <ResultCard
          result={conversionResult}
          isLoading={isLoading}
        />
      </div>

      <CurrencyModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onSelect={handleCurrencySelectCallback}
        selectedCurrency={selectedCurrency}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currencies={currencies}
        isLoading={isLoading}
      />

      {hasError && ratesError && (
        <ErrorDisplay 
          error={ratesError} 
          onRetry={refresh}
          className="converter-page__error"
        />
      )}
    </div>
  );
};

export default ConverterPage;
