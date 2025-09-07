import { memo } from "react";
import { ResultCardProps } from "@/types/types";
import { formatCurrency } from "@/lib/format";
import "./ResultCard.scss";

const ResultCard = memo(({ result, isLoading = false }: ResultCardProps) => {
  if (isLoading) {
    return (
      <div className="result-card">
        <div className="result-card__title">Conversion result</div>
        <div className="result-card__loading">
          <div className="result-card__skeleton result-card__skeleton--value"></div>
          <div className="result-card__skeleton result-card__skeleton--text"></div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="result-card">
        <div className="result-card__title">Conversion result</div>
        <div className="result-card__value">—</div>
        <div className="result-card__subtitle">
          Enter amount to see conversion
        </div>
      </div>
    );
  }

  return (
    <div className="result-card">
      <div className="result-card__title">Conversion result</div>
      
      <div className="result-card__value">
        {formatCurrency(result.converted, result.to)}
      </div>
      
      <div className="result-card__subtitle">
        {result.amount} {result.from.code} =
      </div>

      <div className="result-card__divider" />

      <div className="result-card__rates">
        <div className="result-card__rate">
          <div className="result-card__rate-label">Exchange Rate</div>
          <div className="result-card__rate-value">
            1 {result.from.code} = {result.rate.toFixed(6)} {result.to.code}
          </div>
        </div>
        
        <div className="result-card__rate">
          <div className="result-card__rate-label">Inverse Rate</div>
          <div className="result-card__rate-value">
            1 {result.to.code} = {result.inverseRate.toFixed(6)} {result.from.code}
          </div>
        </div>
      </div>

      <div className="result-card__divider" />
      
      <div className="result-card__disclaimer">
        Rates are for informational purposes only and may not reflect real-time market rates
      </div>
    </div>
  );
});

export default ResultCard;
