import React, { useState } from 'react';
import timers from '../data/timers';

function Add({ queue, addToQueue }) {
  const [selectedTimer, setSelectedTimer] = useState(timers[0].name);

  const handleDropdownChange = (event) => {
    setSelectedTimer(event.target.value);
  };

  const handleAddClick = () => {
    addToQueue(selectedTimer);
  };

  return (
    <div>
      <select onChange={handleDropdownChange} value={selectedTimer}>
        {timers.map((timer, index) => (
          <option key={index} value={timers.name}>{timer.name}</option>
        ))}
      </select>

      <h1>Preview: {selectedTimer}</h1>

      <button onClick={handleAddClick}>Confirm Addition</button>
      <p>{queue}</p>
    </div>
  );
}

export default Add;
