import { useState } from 'react';
import styled from 'styled-components';
import { currencyArr } from '../../constant/currencyArr';
import useExchangeRateAxios from '../../hooks/useExchangeRateAxios';

const Main = () => {
  const [firstCurrency, setFirstCurrency] = useState({
    description: 'South Korean Won',
    code: 'KRW',
  });
  const [secondCurrency, setSecondCurrency] = useState({
    description: 'United States Dollar',
    code: 'USD',
  });

  const { exchangeRatData } = useExchangeRateAxios(firstCurrency, secondCurrency);

  const onChangeFirstCurrencyValue = e => {
    currencyArr.forEach((currency, index) => {
      if (currency.code === e.target.value) {
        setFirstCurrency(currencyArr[index]);
      }
    });
  };

  const onChangeSecondCurrencyValue = e => {
    currencyArr.forEach((currency, index) => {
      if (currency.code === e.target.value) {
        setSecondCurrency(currencyArr[index]);
      }
    });
  };

  console.log(exchangeRatData);

  return (
    <Container>
      <div className='main-box'>
        <div className='info'>
          <div className='comparative'>1 {firstCurrency.description} =</div>
          <div className='result'>
            {exchangeRatData && exchangeRatData.success ? exchangeRatData.info.rate : 0} {secondCurrency.description}
          </div>
          <div className='date'>기준 날짜 {exchangeRatData && exchangeRatData.success && exchangeRatData.date}</div>
        </div>
        <div className='input'>
          <select defaultValue={firstCurrency.code} onChange={onChangeFirstCurrencyValue}>
            {currencyArr.map(currency => {
              return (
                <option value={currency.code} key={currency.code}>
                  {currency.description}
                </option>
              );
            })}
          </select>
        </div>
        <div className='input'>
          <select defaultValue={secondCurrency.code} onChange={onChangeSecondCurrencyValue}>
            {currencyArr.map(currency => {
              return (
                <option value={currency.code} key={currency.code}>
                  {currency.description}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .main-box {
    width: 500px;
    height: 350px;
    border: 1px solid gray;
    border-radius: 5px;

    .info {
      font-size: 1.25rem;
      color: gray;

      .comparative {
        margin: 1rem;
      }

      .result {
        margin: 1rem;
        font-size: 2rem;
        color: black;
      }

      .date {
        margin: 1rem;
        font-size: 0.875rem;
      }
    }

    .input {
    }
  }
`;

export default Main;
