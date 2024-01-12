import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const apis = ['Exchange', 'Vietcombank', 'Techcombank', 'Fixer']; /// TODO: request backend for list of apis

function APISelector({ selectedApi, onChange }) {
  return (
    <div>
      <Typography variant="h5"><b>Select API</b></Typography>
      <Autocomplete
        options={apis}
        value={selectedApi}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} label="API" />}
        sx={{ mt: '10px', maxWidth: '300px'}}
      />
    </div>
  );
};

export default APISelector;