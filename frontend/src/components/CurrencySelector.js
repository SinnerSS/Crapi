import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function CurrencySelector({ label, currencies, selectedCurrency, onChange }) {
  return (
    <div>
      <Typography variant="h5"><b>{label}</b></Typography>
      <Autocomplete
        options={currencies}
        value={selectedCurrency}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} label="Currency" />}
        sx={{ mt: '10px', maxWidth: '300px'}}
      />
    </div>
  );
};

export default CurrencySelector;