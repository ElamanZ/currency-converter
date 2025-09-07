import { baseAxios } from '@/utils/baseAxios';
import { 
  ExchangeRates, 
  VATComplyResponse, 
  Currency,
  AppError 
} from '@/types/types';

class CurrencyApiService {
  
  async getExchangeRates(): Promise<ExchangeRates> {
    try {
      const response = await baseAxios.get<VATComplyResponse>('/rates');
      const data = response.data;
      
      return {
        base: data.base,
        rates: data.rates,
        timestamp: new Date(data.date).getTime()
      };
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch exchange rates');
    }
  }

  async getCurrencies(): Promise<Currency[]> {
    try {
      const response = await baseAxios.get<Record<string, { name: string; symbol: string }>>('/currencies');
      const data = response.data;
      
      return Object.entries(data).map(([code, info]) => ({
        code,
        name: info.name,
        symbol: info.symbol
      }));
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch currencies');
    }
  }

  private handleError(error: unknown, message: string): AppError {
    if (error instanceof Error) {
      return {
        message: `${message}: ${error.message}`,
        code: 'API_ERROR',
        details: error
      };
    }
    
    return {
      message,
      code: 'UNKNOWN_ERROR',
      details: error
    };
  }
}

export const currencyApi = new CurrencyApiService();