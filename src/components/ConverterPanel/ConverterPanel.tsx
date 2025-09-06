import { FC, memo } from "react";
import "./ConverterPanel.scss";
import { ArrowLeftRight } from "lucide-react";
import { ConverterPanelProps } from "@/types/types";

export const ConverterPanel: FC<ConverterPanelProps> = memo(({
  amount,
  fromCurrency,
  toCurrency,
  onAmountChange,
  onFromCurrencySelect,
  onToCurrencySelect,
  onSwap,
  isLoading = false,
}) => {
  return (
    <div className="converter-panel">
      <div className="converter-panel__field-group">
        <div className="converter-panel__field">
          <label className="converter-panel__label">Amount</label>
          <input
            className="converter-panel__input"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="0.00"
            disabled={isLoading}
          />
        </div>

        <div className="converter-panel__currencies">
          <div className="converter-panel__field">
            <label className="converter-panel__label">From</label>
            <button
              className="converter-panel__selector"
              onClick={onFromCurrencySelect}
              disabled={isLoading}
            >
              <div className="converter-panel__currency-icon">
                {fromCurrency.symbol}
              </div>
              <div className="converter-panel__currency-info">
                <div className="converter-panel__currency-code">
                  {fromCurrency.code}
                </div>
                <div className="converter-panel__currency-name">
                  {fromCurrency.name}
                </div>
              </div>
            </button>
          </div>

          <button 
            className="converter-panel__swap-btn"
            onClick={onSwap}
            disabled={isLoading}
            aria-label="Swap currencies"
          >
            <ArrowLeftRight size={18} />
          </button>

          <div className="converter-panel__field">
            <label className="converter-panel__label">To</label>
            <button
              className="converter-panel__selector"
              onClick={onToCurrencySelect}
              disabled={isLoading}
            >
              <div className="converter-panel__currency-icon">
                {toCurrency.symbol}
              </div>
              <div className="converter-panel__currency-info">
                <div className="converter-panel__currency-code">
                  {toCurrency.code}
                </div>
                <div className="converter-panel__currency-name">
                  {toCurrency.name}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
