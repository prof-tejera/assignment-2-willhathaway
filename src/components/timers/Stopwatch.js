import React, { useState, useEffect } from "react";
import Timer from "../generic/Timer";
import Button from "../generic/Button";

const Stopwatch = () => {
  
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

  const toggleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
  };

  return (
    <div>
      <Timer time={time} />
      <div>
        <Button name={isRunning ? "Stop" : "Start"} method={toggleStartStop} />
        <Button name="Reset" method={reset} />
      </div>
    </div>
  );
};

export default Stopwatch;
