import React, { useState } from "react";
import axios from 'axios';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Container } from '@mui/material';
import NavBar from "../components/Navbar";
import CurrencySelector from "../components/CurrencySelector";

function TradePage() {
  const [currencyList, setCurrencyList] = useState([]);
  const [currency, setCurrency] = useState('');
  const [rateList, setRateList] = useState([])

  function handleCurrencyChange(event, newValue, selectedOption) {
    setCurrency(newValue);

    if(newValue!=='') {
      axios.post('/convert/VND', {
        currency: newValue
      })
      .then((response) => {
        const baseline = response.data.result.Baseline;
        const rateData = Object.entries(response.data.result).map(([key, value]) => ({
          apiName: key,
          rate: value,
          compare: key === 'Baseline' ? 100 : value / baseline * 100, 
        }));
        console.log(rateData);
        setRateList(rateData);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
    }
  }

  return (  
    <Box>
    <NavBar />
    <Container sx={{ display: 'flex', flexDirection: 'column', border: '1px dashed grey', justifyContent: 'center', alignItems: 'center', p: 2, mt: 2 }}>
      <CurrencySelector
        label="Select currency"
        currencies={['USD', 'EUR', 'AUD', 'SGD', 'THB', 'JPY']}
        selectedCurrency={currency}
        onChange={handleCurrencyChange}
      />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>API Name</TableCell>
                <TableCell align="right">Rate</TableCell>
                <TableCell align="right">Compare(%)</TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
            {rateList.sort((a, b) => b.compare - a.compare).map(({ apiName, rate, compare }) => (
              <TableRow key={apiName}>
                <TableCell component="th" scope="row">
                  {apiName} 
                </TableCell>
                <TableCell align="right">{parseFloat(rate).toFixed(2)}</TableCell>
                <TableCell align="right">{parseFloat(compare).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  </Box>
  )
}

export default TradePage;