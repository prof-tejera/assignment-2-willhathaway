import React, { useState, useEffect } from "react";
import Button from "../generic/Button";
import Timer from "../generic/Timer";
import Input from "../generic/Input";

const XY = ({  onChangeSettings, isSettings }) => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [rounds, setRounds] = useState(1);
  const [currentRound, setCurrentRound] = useState(1);
  const [isNumOfRoundsEnabled, setIsNumOfRoundsEnabled] = useState(false);


  useEffect(() => {
    setTime(parseTimeToMilliseconds());
  }, [hours, minutes, seconds]);

  useEffect(() => {
    onChangeSettings({ timerName: "xy", time: time, rounds: rounds });
  }, [hours, minutes, seconds, rounds]);

  useEffect(() => {
    setIsNumOfRoundsEnabled(
      hours !== "00" || minutes !== "00" || seconds !== "00"
    );
  }, [hours, minutes, seconds]);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1000);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);

      if (currentRound < rounds) {
        setCurrentRound((prevRound) => prevRound + 1);
        setTime(parseTimeToMilliseconds());
        setIsRunning(true);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, time, currentRound, rounds]);

  const toggleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setHours("00");
    setMinutes("00");
    setSeconds("00");
    setTime(0);
    setIsRunning(false);
    setRounds(1);
    setCurrentRound(1);
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
        console.log("Invalid increment");
    }
  };

  const parseTimeToMilliseconds = () => {
    let timeStr = hours + ":" + minutes + ":" + seconds;
    let a = timeStr.split(":");
    return +a[0] * 60 * 60 * 1000 + +a[1] * 60 * 1000 + +a[2] * 1000;
  };

  return (
    <div>
      <Timer time={time} />

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
        <Input
          name={"Number of Rounds"}
          value={rounds}
          onChange={(newValue) => setRounds(newValue)}
          disabled={!isNumOfRoundsEnabled}
        />
      </div>
      {!isSettings ? (
        <div>
          <Timer time={time} />
          <div>
            <Button
              name={isRunning ? "Stop" : "Start"}
              method={toggleStartStop}
            />
            <Button name="Reset" method={handleReset} />
          </div>
          <div>
            <p>
              Round {currentRound} of {rounds}
            </p>
          </div>
        </div>
      ) : (
        <Button name="Reset" method={handleReset} />
      )}
    </div>
  );
};

export default XY;
