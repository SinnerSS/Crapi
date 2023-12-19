import React from 'react';

function CurrencySelector({ currencies, selectedCurrency, onChange }) {
  return (
    <div>
      <label>Select Currency:</label>
      <select value={selectedCurrency} onChange={onChange}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;