import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { LineChart } from "@mui/x-charts";
import NavBar from '../components/Navbar';
import CurrencySelector from '../components/CurrencySelector';

function TrendPage() {
  const [dates, setDates] = useState([]);
  const [timeStep, setTimeStep] = useState([])
  const [rates, setRates] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [currency, setCurrency] = useState('VND');

  function handleCurrencyChange(event, newValue, selectedOption) {
    setCurrency(newValue);
  }

  function handleTimeStepChange(event, newValue) {
    setTimeStep(newValue);

    let days, points;
    switch(newValue) {
      case '7D':
        days = 7;
        points = 7;
        break;
      case '1M':
        days = 30;
        points = 8;
        break;
      case '6M':
        days = 180;
        points = 12;
        break;
      case '1Y':
        days = 365;
        points = 12;
        break;
      default: 
        days = 7;
        points = 7;
    }
    const result = Array.from({ length: points }, (_, i) => {
      const date = new Date();
      let step = Math.ceil(days / points);
      date.setDate(date.getDate() - i*step);
      date.setHours(0, 0, 0, 0);
      return date;
    });
    console.log(result);
    setDates(result);
  }

  const dateFormater = (date) => {
    let month = date.toLocaleString("default", { month: "long" });
    let day = date.toLocaleString("default", { day: "2-digit" });
    return `${month} ${day}`
  }

  useEffect(() => {
    axios.post('/info/symbols', {
      api: 'Exchange' 
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
            const response = await axios.post('/trend', {
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
              fromCurrency: currency,
              toCurrency: 'VND',
              amount: 1,
              selectedAPI: 'Fixer'
            })
            result.push(response.data.result);
          } catch (error) {
            console.log('Error fetching data:', error);
          }
        }
      }
      console.log(result)
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
        <ToggleButtonGroup value={timeStep} exclusive onChange={handleTimeStepChange}>
          <ToggleButton value="7D">
            7D
          </ToggleButton>
          <ToggleButton value="1M">
            1M
          </ToggleButton>
          <ToggleButton value="6M">
            6M
          </ToggleButton>
          <ToggleButton value="1Y">
            1Y
          </ToggleButton>
        </ToggleButtonGroup>
      </Container>
    </Box>
  );
}

export default TrendPage;
