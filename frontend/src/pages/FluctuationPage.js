import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container } from '@mui/material';
import { LineChart } from "@mui/x-charts";
import NavBar from '../components/Navbar';
import CurrencySelector from '../components/CurrencySelector';

function FluctuationPage() {
  const [dates, setDates] = useState([]);
  const [rates, setRates] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [currency, setCurrency] = useState('VND');

  function handleCurrencyChange(event, newValue, selectedOption) {
    setCurrency(newValue);
  }

  const dateFormater = (date) => {
    let month = date.toLocaleString("default", { month: "long" });
    let day = date.toLocaleString("default", { day: "2-digit" });
    return `${month} ${day}`
  }

  useEffect(() => {
    const result = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0)
      return date;
    });
    console.log(result);
    setDates(result);

    axios.post('/info/symbols', {
      api: 'Fixer' 
    })
    .then((response) => {
      setCurrencyList(response.data.result);
    })
    .catch((error) => {
      console.error('Error fetching data: ', error);
    });
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const current = new Date();
      let result = [];

      for (const date of dates) {
        if (date.getDate()!==current.getDate()) {
          let year = date.toLocaleString("default", { year: "numeric" });
          let month = date.toLocaleString("default", { month: "2-digit" });
          let day = date.toLocaleString("default", { day: "2-digit" });

          let formattedDate = `${year}-${month}-${day}`;

          try {
            const response = await axios.post('/fluctuation', {
              date: formattedDate,
              currency: currency
            });
            result.push(response.data.result);
          } catch (error) {
            console.log('Error fetching data:', error);
          }
        } else {
          try {
            const response = await axios.post('/convert', {
              fromCurrency: 'VND',
              toCurrency: currency,
              amount: 1,
              selectedAPI: 'Fixer'
            })
            result.push(response.data.result);
          } catch (error) {
            console.log('Error fetching data:', error);
          }
        }
      }
      setRates(result);
    };

    if (currency!=='') fetchData();
  }, [dates, currency]);

  return (
    <Box>
      <NavBar />
      <Container sx={{ display: 'flex', flexDirection: 'column', border: '1px dashed grey', justifyContent: 'center', alignItems: 'center', p: 2, mt: 2 }}>
        <CurrencySelector
          label="Select currency"
          currencies={currencyList}
          selectedCurrency={currency}
          onChange={handleCurrencyChange}
        />
        <LineChart 
          xAxis={[{ 
            scaleType: 'time',
            data: dates,
            valueFormatter: dateFormater,
          }]}
          series={[
            {
              label: `${currency}/VND`,       
              data: rates,
              highlightScope: 'item'
            },
          ]}
          width={750}
          height={450}
        />
      </Container>
    </Box>
  );
}

export default FluctuationPage;
