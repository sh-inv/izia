import { useEffect } from 'react';
import useExchangeRateAxios from '../../hooks/useExchangeRateAxios';

const Main = () => {
  const firstCurrency = 'USD';
  const secondCurrency = 'CZK';
  const { exchangeRatData } = useExchangeRateAxios(firstCurrency, secondCurrency);
  console.log(exchangeRatData);
  return (
    <div>
      <div>메인페이지</div>
    </div>
  );
};

export default Main;
