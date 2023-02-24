import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../api';

const useExchangeRateAxios = (firstCurrency, secondCurrency) => {
  const [exchangeRatData, setExchangeRatData] = useState();

  const getExchangeRatData = useCallback(async () => {
    try {
      const { data } = await apiClient.get(`/convert?from=${firstCurrency}&to=${secondCurrency}&places=4`);
      setExchangeRatData(data);
    } catch (error) {
      console.log('통신 에러 내용 => ', error);
    }
  }, [firstCurrency, secondCurrency]);

  useEffect(() => {
    getExchangeRatData();
  }, [firstCurrency, secondCurrency]);

  return { exchangeRatData };
};

export default useExchangeRateAxios;
