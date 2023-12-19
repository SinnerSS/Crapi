import React from 'react';

function NumberInput({ value, onChange }) {
  return (
    <div>
      <label>Amount:</label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        placeholder="Enter"
      />
    </div>
  );
};

export default NumberInput;