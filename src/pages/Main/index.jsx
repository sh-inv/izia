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

  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');

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

  const onChangeFirstNumHandler = e => {
    const value = Number(e.target.value);
    setFirstValue(value === 0 ? '' : value);
    const rate = exchangeRatData.info.rate;
    const result = value * rate;
    const trimmedValue = parseFloat(result.toFixed(5));
    setSecondValue(trimmedValue === 0 ? '' : trimmedValue);
  };

  const onChangeSecondNumHandler = e => {
    const value = Number(e.target.value);
    setSecondValue(value === 0 ? '' : value);
    const rate = exchangeRatData.info.rate;
    const result = value / rate;
    const trimmedValue = parseFloat(result.toFixed(5));
    setFirstValue(trimmedValue === 0 ? '' : trimmedValue);
  };

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
        <div className='input-box'>
          <div className='input'>
            <input type='number' value={firstValue} min={0} placeholder='값 입력' onChange={onChangeFirstNumHandler} />
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
            <input type='number' value={secondValue} min={0} placeholder='값 입력' onChange={onChangeSecondNumHandler} />
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
    width: 545px;
    height: 280px;
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

    .input-box {
      margin-top: 2rem;

      .input {
        margin: 1rem;

        input {
          width: 12rem;
          height: 3rem;
          font-size: 1rem;
        }

        select {
          height: 3rem;
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Main;
