import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

function NumberInput({ value, onChange }) {
  const hasError = isNaN(value)
  return (
    <div>
      <Typography variant="h5"><b>Amount</b></Typography>
      <TextField
        id="outlined-error-helper-text"
        value={value}
        onChange={onChange}
        error={hasError}
        placeholder="Enter"
        helperText={hasError?"Invalid amount":""}
      />
    </div>
  );
};

export default NumberInput;