import React, { useState, useEffect } from "react";
import Timer from "../components/generic/Timer";
import Button from "../components/generic/Button";
import Countdown from "../components/timers/Countdown";
import Stopwatch from "../components/timers/Stopwatch";
import Tabata from "../components/timers/Tabata";
import XY from "../components/timers/XY";
import Container from "../components/generic/Container";

import runCountdownTimer from "../utils/timerFunctions/countdown";
import runStopwatchTimer from "../utils/timerFunctions/stopwatch";
import {runTabataTimer} from "../utils/timerFunctions/tabata";
import runXYTimer from "../utils/timerFunctions/xy";

export const Queue = ({ queue }) => {
  const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // for tabata:
  const [currentPhase, setCurrentPhase] = useState("work");
  const [currentRound, setCurrentRound] = useState(0);

  console.log(queue);

  useEffect(() => {
    if (queue.length > 0) {
      initializeTimer(queue[0]);
    }
  }, [isRunning, currentTimerIndex]);

  const initializeTimer = (timerSettings) => {
    switch (timerSettings.name) {
      case "countdown":
        setTime(timerSettings.time); 
        break;
      case "stopwatch":
        setTime(0);
        break;
      default:
        setTime(0);
    }
  };

  useEffect(() => {
    let interval;

    if (isRunning) {
      const currentTimer = queue[0];
      console.log(currentTimer.name);
      switch (currentTimer.name) {
        case "countdown":
          interval = runCountdownTimer(currentTimer, setTime);
          break;
        case "stopwatch":
          interval = runStopwatchTimer(currentTimer, setTime);
          break;
        case "tabata":
          interval = runTabataTimer(
            currentTimer,
            setTime,
            currentPhase,
            setCurrentPhase,
            currentRound,
            setCurrentRound
          );
          break;
        case "xy":
          interval = runXYTimer(currentTimer, setTime);
        default:
          break;
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, currentTimerIndex, time]);

  const toggleStartStop = () => {
    setIsRunning(!isRunning);
  };
  const reset = () => {
    return;
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
        <Container key={index}>
          <div>{timerSettings.name}</div>
          {/* Display timer settings here */}
          <Timer time={timerSettings.time} />
          {timerSettings.name === "tabata" && index === currentTimerIndex && (
          <div>
            <div>Phase: {currentPhase}</div>
            <div>Round: {currentRound} / {timerSettings.rounds}</div>
          </div>
        )}
        </Container>
      ))}
    </div>
  );
};

export default Queue;
