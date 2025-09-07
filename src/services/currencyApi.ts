import { baseAxios } from '@/utils/baseAxios';
import {
  ExchangeRates,
  VATComplyResponse,
  Currency,
  CurrencyApiResponse,
} from '@/types/types';
import { AppApiError } from '@/utils/errors';

const adaptExchangeRates = (data: VATComplyResponse): ExchangeRates => ({
  base: data.base,
  rates: data.rates,
  timestamp: new Date(data.date).getTime(),
});

const adaptCurrencies = (data: CurrencyApiResponse): Currency[] =>
  Object.entries(data).map(([code, { name, symbol }]) => ({
    code,
    name,
    symbol,
  }));

class CurrencyApiService {
  async getExchangeRates(): Promise<ExchangeRates> {
    try {
      const { data } = await baseAxios.get<VATComplyResponse>('/rates');
      return adaptExchangeRates(data);
    } catch (error) {
      this.handleError(error, 'Failed to fetch exchange rates');
    }
  }

  async getCurrencies(): Promise<Currency[]> {
    try {
      const { data } = await baseAxios.get<CurrencyApiResponse>('/currencies');
      return adaptCurrencies(data);
    } catch (error) {
      this.handleError(error, 'Failed to fetch currencies');
    }
  }

  private handleError(error: unknown, message: string): never {
    if (error instanceof Error) {
      throw new AppApiError(`${message}: ${error.message}`, 'API_ERROR', error);
    }
    throw new AppApiError(message, 'UNKNOWN_ERROR', error);
  }
}

export const currencyApi = new CurrencyApiService();
