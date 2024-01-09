import React, { useState } from 'react';
import axios from 'axios';
import { Box, Container, Grid } from '@mui/material';
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
    <Box sx={{ flexGrow: 1 }}>
      <NavBar />
      <Container sx={{ border: '1px dashed grey', p: 2, mt: 2 }}>
        <APISelector
          apis={apis}
          selectedApi={selectedAPI}
          onChange={handleAPIChange}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CurrencySelector
              currencies={currencies}
              selectedCurrency={fromCurrency}
              onChange={handleFromCurrencyChange}
            />
          </Grid>
          <Grid item xs={6}>
            <CurrencySelector
              currencies={currencies}
              selectedCurrency={toCurrency}
              onChange={handleToCurrencyChange}
            />
          </Grid>
          <Grid item xs={12}>
            <NumberInput
              value={amount}
              onChange={handleAmountChange}
            />
          </Grid>
        </Grid>
        <button onClick={handleConvert}>Convert</button>
        <div id="update_on_convert"></div>
      </Container>
    </Box>
    );
}

export default CurrencyConverterPage;