import { FC } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import './ErrorDisplay.scss';

interface ErrorDisplayProps {
  error: Error | string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorDisplay: FC<ErrorDisplayProps> = ({ 
  error, 
  onRetry, 
  className = '' 
}) => {
  const errorMessage = typeof error === 'string' ? error : error.message;

  return (
    <div className={`error-display ${className}`}>
      <div className="error-display__content">
        <AlertCircle className="error-display__icon" size={24} />
        <div className="error-display__text">
          <h3 className="error-display__title">Error occurred</h3>
          <p className="error-display__message">{errorMessage}</p>
        </div>
        {onRetry && (
          <button 
            className="error-display__retry"
            onClick={onRetry}
            aria-label="Try again"
          >
            <RefreshCw size={16} />
            Retry
          </button>
        )}
      </div>
    </div>
  );
};