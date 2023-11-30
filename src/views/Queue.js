import React, { useState, useEffect } from "react";
import Timer from "../components/generic/Timer";
import Button from "../components/generic/Button";
import Countdown from "../components/timers/Countdown";
import Stopwatch from "../components/timers/Stopwatch";
import Tabata from "../components/timers/Tabata";
import XY from "../components/timers/XY";
import Container from "../components/generic/Container";

export const Queue = ({ queue }) => {
  const [time, setTime] = useState(0);

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(
        () => setTime((prevTime) => prevTime + 1000),
        1000
      );
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const renderTimer = (timerSettings) => {
    console.log(timerSettings.name);
    switch (timerSettings.name) {
      case "countdown":
        return (
          <Countdown
            settings={timerSettings}
            onChangeSettings={() => {
              return;
            }}
            isSettings={true}
          />
        );
      case "stopwatch":
        return (
          <Stopwatch
            settings={timerSettings}
            onChangeSettings={() => {
              return;
            }}
            isSettings={true}
          />
        );
      case "tabata":
        return (
          <Tabata
            settings={timerSettings}
            onChangeSettings={() => {
              return;
            }}
            isSettings={true}
          />
        );
      case "xy":
        return (
          <XY
            settings={timerSettings}
            onChangeSettings={() => {
              return;
            }}
            isSettings={true}
          />
        );
      default:
        return null;
    }
  };

  const toggleStartStop = () => {
    setIsRunning(!isRunning);
  };
  const reset = () => {
    setTime(0);
  };
  const skip = () => {
    return;
  };
  return (
    <div>
      <h2>Home Page</h2>
      <Timer time={time} />
      <Button name={isRunning ? "Stop" : "Start"} method={toggleStartStop} />
      <Button name="Skip" method={skip} />
      <Button name="Reset" method={reset} />
      {/* Render the timers in the queue array */}
      {queue.map((timerSettings, index) => (
        <Container>
          <div key={index}>{renderTimer(timerSettings)}</div>
        </Container>
      ))}
    </div>
  );
};

export default Queue;
