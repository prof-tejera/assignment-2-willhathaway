// Dropdown.js
import React, { useState } from 'react';

export default function Dropdown({ options, onChange, value }) {
  const dropdownStyle = {
    backgroundColor: 'white',
    color: 'black',
    padding: '10px 20px',
    fontFamily: 'monospace',
    fontSize: '16px',
    margin: '5px',
    border: '2px solid black',
    borderRadius: '4px',
    cursor: 'pointer',
    outline: 'none',
    transition: 'border-color 0.3s',
  };

  const hoverStyle = {
    borderColor: 'grey',
  };

  const [hover, setHover] = useState(false);

  return (
    <select
      onChange={onChange}
      value={value}
      style={{ ...dropdownStyle, ...(hover ? hoverStyle : {}) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <option disabled value="">
        -- select an option --
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
