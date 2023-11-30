import React, { useState, useEffect } from "react";
import Timer from "../generic/Timer";
import Button from "../generic/Button";
import Input from "../generic/Input";

const Stopwatch = ({ settings, onChangeSettings, isSettings }) => {
  const [time, setTime] = useState(0);
  const [limit, setLimit] = useState(0);

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

  const handleChange = (value) => {
    onChangeSettings({timerName: "stopwatch", limit: value})
    setLimit(value);
  };

  const toggleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
  };

  return (
    <div>
      <Timer time={time} />
      <Input
        name={"Limit (seconds)"}
        value={limit}
        onChange={(newValue) => handleChange(newValue)}
      />
      <div>
      {!isSettings ? (

        <Button name={isRunning ? "Stop" : "Start"} method={toggleStartStop} />):null}

        <Button name="Reset" method={reset} />
      </div>
    </div>
  );
};

export default Stopwatch;
