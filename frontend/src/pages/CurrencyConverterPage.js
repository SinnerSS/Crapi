import React, { useState } from 'react';
import axios from 'axios';
import CurrencySelector from '../components/CurrencySelector';
import NumberInput from '../components/NumberInput';
import APISelector from '../components/APISelector';
import NavBar from '../components/Navbar';

const currencies = ['USD', 'EUR', 'GBP', 'VND']; // TODO: request backend for list of currencies
const apis = ['Exchange', 'Vietcombank', 'Techcombank']; /// TODO: request backend for list of apis

let message = ""

function CurrencyConverterPage() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('');
  const [selectedAPI, setSelectedAPI] = useState('Exchange');

  function handleFromCurrencyChange(event) {
    setFromCurrency(event.target.value);
  };

  function handleToCurrencyChange(event) {
    setToCurrency(event.target.value);
  };

  function handleAmountChange(event) {
    setAmount(event.target.value);
  };

  function handleAPIChange(event) {
    setSelectedAPI(event.target.value);
  };

  function handleConvert() {
    if(amount) {
      axios.post('convert', {
        fromCurrency,
        toCurrency,
        amount,
        selectedAPI
      })
      .then((response) => {
        message = response.data.result
        document.getElementById("update_on_convert").textContent = message
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      })
    }
  }
  return (
    <div>
      <NavBar />
      <CurrencySelector
        currencies={currencies}
        selectedCurrency={fromCurrency}
        onChange={handleFromCurrencyChange}
      />
      <CurrencySelector
        currencies={currencies}
        selectedCurrency={toCurrency}
        onChange={handleToCurrencyChange}
      />
      <NumberInput
        value={amount}
        onChange={handleAmountChange}
      />
      <APISelector
        apis={apis}
        selectedApi={selectedAPI}
        onChange={handleAPIChange}
      />
      <button onClick={handleConvert}>Convert</button>
      <div id="update_on_convert"></div>
    </div>
  );
}

export default CurrencyConverterPage;