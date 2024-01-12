import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { LineChart } from "@mui/x-charts";
import NavBar from '../components/Navbar';
import CurrencySelector from '../components/CurrencySelector';

function FluctuationPage() {
  const [rates, setRates] = useState([]);
  const [currency, setCurrency] = useState('VND');

  function handleCurrencyChange(event, newValue, selectedOption) {
    setCurrency(newValue);
  }

  useEffect(() => {
    const fetchData = async () => {
      let dates = [];
      for (let i = 0; i < 7; i++) {
        let date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date);
      }
      let result = [];

      for (const date of dates) {
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
      }
      setRates(result);
    };

    fetchData();
  }, [currency]);

  return (
    <Box>
      <NavBar />
      <CurrencySelector
        label="Select currency"
        selectedCurrency={currency}
        onChange={handleCurrencyChange}
      />
       <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7] }]}
        series={[
          {
            data: rates
          },
        ]}
        width={500}
        height={300}
      />
    </Box>
  );
}

export default FluctuationPage;
