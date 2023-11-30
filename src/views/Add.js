import React, { useState } from "react";
import timers from "../data/timers";
import Container from "../components/generic/Container";
import Countdown from "../components/timers/Countdown";
import Tabata from "../components/timers/Tabata";
import XY from "../components/timers/XY";
import Stopwatch from "../components/timers/Stopwatch";

function Add({ queue, addToQueue }) {
  const [selectedTimer, setSelectedTimer] = useState("");
  const [settings, setSettings] = useState({
    name: "name",
    time: 0, // in milliseconds
    status: "notRunning",
    settings: {
      time: 0,
      limit: 0,
      rounds: 0,
      work: 0,
      rest: 0
  }
    // ... other settings
  });

  const handleDropdownChange = (event) => {
    setSelectedTimer(event.target.value);
  };

  const handleAddClick = () => {
    let timerObj = {
        name: settings.timerName,
        status: "notRunning",
        settings: {
            time: settings.time,
            limit: settings.limit ? settings.limit : null,
            rounds: settings.rounds ? settings.rounds : null,
            work: settings.work ? settings.work : null,
            rest: settings.rest ? settings.rest : null
        }
    }
    console.log(settings);
    addToQueue(timerObj);
  };

  const handleChangeSettings = (newSettings) => {
    console.log(newSettings);
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
    console.log(settings)
  };

  const renderSelectedTimer = () => {
    switch (selectedTimer) {
      case "Stopwatch":
        return (
          <Stopwatch
            settings={settings}
            onChangeSettings={handleChangeSettings}
            isSettings={true}
          />
        );
      case "Countdown":
        return (
          <Countdown
            settings={settings}
            onChangeSettings={handleChangeSettings}
            isSettings={true}
          />
        );
      case "Tabata":
        return (
          <Tabata
            settings={settings}
            onChangeSettings={handleChangeSettings}
            isSettings={true}
          />
        );
      case "XY":
        return (
          <XY
            settings={settings}
            onChangeSettings={handleChangeSettings}
            isSettings={true}
          />
        );
      default:
        return null; // Or some default message/component
    }
  };

  return (
    <div>
      <select onChange={handleDropdownChange} value={selectedTimer}>
        <option disabled value="">
          -- select an option --
        </option>
        {timers.map((timer, index) => (
          <option key={index} value={timer.name}>
            {timer.name}
          </option>
        ))}
      </select>

      <Container>{renderSelectedTimer()}</Container>

      <button onClick={handleAddClick}>Confirm Addition</button>
    </div>
  );
}

export default Add;
