import React, { useState } from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider, Box, Container, Grid } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button'
import blue from '@mui/material/colors/blue';
import CurrencySelector from '../components/CurrencySelector';
import NumberInput from '../components/NumberInput';
import APISelector from '../components/APISelector';
import NavBar from '../components/Navbar';


const buttonTheme = createTheme({ palette: { primary: blue } })
let message = ""

function CurrencyConverterPage() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('');
  const [selectedAPI, setSelectedAPI] = useState('Exchange');

  function handleFromCurrencyChange(event, newValue, selectedOption) {
    setFromCurrency(newValue);
  };

  function handleToCurrencyChange(event, newValue, selectedOption) {
    setToCurrency(newValue);
  };

  function handleAmountChange(event) {
    setAmount(event.target.value);
  };

  function handleAPIChange(event, newValue, selectOption) {
    setSelectedAPI(newValue);
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
       <Grid container spacing={2}>
         <Grid item xs={12}>
           <APISelector
              selectedApi={selectedAPI}
              onChange={handleAPIChange}
           />
         </Grid>
         <Grid item xs={4}>
           <CurrencySelector
              label='From'
              selectedCurrency={fromCurrency}
              onChange={handleFromCurrencyChange}
           />
         </Grid>
         <Grid item xs={4} display="flex" justifyContent="center">
           <ArrowForwardIcon style={{height: '120px', fontSize: '35px', marginRight: '60px'}}/>
         </Grid> 
         <Grid item xs={4}>
           <CurrencySelector
              label='To'
              selectedCurrency={toCurrency}
              onChange={handleToCurrencyChange}
           />
         </Grid>
         <Grid item xs={6}>
           <NumberInput
              value={amount}
              onChange={handleAmountChange}
           />
         </Grid>
         <Grid item xs={12}>
           <ThemeProvider theme={buttonTheme}>
             <Button variant="contained" color= "primary" onClick={handleConvert}>Convert</Button>
           </ThemeProvider>
         </Grid>
       </Grid>
     </Container>
    </Box>
  );
}

export default CurrencyConverterPage;