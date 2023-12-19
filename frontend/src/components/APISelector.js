import React from 'react';

function APISelector({ apis, selectedApi, onChange }) {
  return (
    <div>
      <label>Select API:</label>
      <select value={selectedApi} onChange={onChange}>
        {apis.map((api) => (
          <option key={api} value={api}>
            {api}
          </option>
        ))}
      </select>
    </div>
  );
};

export default APISelector;