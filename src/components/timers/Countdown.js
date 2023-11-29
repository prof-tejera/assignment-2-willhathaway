import React, { useState, useEffect } from "react";
import Button from "../generic/Button";
import Timer from "../generic/Timer";
import Input from "../generic/Input";

const Countdown = () => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(
        () => setTime((prevTime) => prevTime - 1000),
        1000
      ); 
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const toggleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setHours("00");
    setMinutes("00");
    setSeconds("00");
    setTime(0);
    setIsRunning(false);
  };

  const handleChange = (increment, value) => {
    switch (increment) {
      case "hour":
        setHours(value);
        break;
      case "minute":
        setMinutes(value);
        break;
      case "second":
        setSeconds(value);
        break;
      default:
        console.log("Invalid");
    }
  };

  useEffect(() => {

    let timeStr = hours + ":" + minutes + ":" + seconds; 

    let a = timeStr.split(":");
    let milliseconds =
      +a[0] * 60 * 60 * 1000 + +a[1] * 60 * 1000 + +a[2] * 1000;

    setTime(milliseconds);
  }, [hours, minutes, seconds]);

  return (
    <div>
      <div>
        <Input
          name={"Hours"}
          value={hours}
          onChange={(newValue) => handleChange("hour", newValue)}
        />
        <Input
          name={"Minutes"}
          value={minutes}
          onChange={(newValue) => handleChange("minute", newValue)}
        />
        <Input
          name={"Seconds"}
          value={seconds}
          onChange={(newValue) => handleChange("second", newValue)}
        />
      </div>
      <Timer time={time} />
      <div>
        <Button name={isRunning ? "Stop" : "Start"} method={toggleStartStop} />
        <Button name="Reset" method={handleReset} />
      </div>
    </div>
  );
};

export default Countdown;
