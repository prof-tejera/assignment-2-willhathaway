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
import runTabataTimer from "../utils/timerFunctions/tabata";
import runXYTimer from "../utils/timerFunctions/xy";

export const Queue = ({ queue }) => {
  const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // for tabata:
  const [currentRound, setCurrentRound] = useState(1);
  const [isWorkPeriod, setIsWorkPeriod] = useState(true);

  console.log(queue);

  useEffect(() => {
    if (queue.length > 0 && currentTimerIndex < queue.length) {
      initializeTimer(queue[currentTimerIndex]);
    }
  }, [queue, currentTimerIndex, isRunning]);

  const initializeTimer = (timerSettings) => {
    switch (timerSettings.name) {
      case "countdown":
        setTime(timerSettings.time);
        break;
      case "stopwatch":
        setTime(0);
        break;
      case "tabata":
        setTime(timerSettings.workTime);
        break;
      case "xy":
        setTime(timerSettings.time);
        break;
      default:
        setTime(0);
    }
  };

  useEffect(() => {
    let interval;

    if (isRunning && currentTimerIndex < queue.length) {
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
            setCurrentRound,
            setIsWorkPeriod
          );
          break;
        case "xy":
          interval = runXYTimer(
            currentTimer,
            setTime,
            currentRound,
            setCurrentRound
          );
        default:
          break;
      }
      const checkTimerCompletion = () => {
        const isTimerCompleted = (currentTimer.name === "xy" || currentTimer.name === "tabata") 
          ? time <= 0 && currentRound >= currentTimer.rounds
          : time <= 0;

        if (isTimerCompleted) {
          clearInterval(interval);
          handleTimerCompletion();
        }
      };

      interval = setInterval(checkTimerCompletion, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, currentTimerIndex, time, currentRound]);

  const handleTimerCompletion = () => {
    if (currentTimerIndex < queue.length - 1) {
      setCurrentTimerIndex(currentTimerIndex + 1);
    } else {
      // Last timer completed, handle accordingly
      setIsRunning(false);
      setCurrentTimerIndex(0);
    }
  };

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
      {queue.map((timerSettings, index) => (
        <Container key={index}>
          <div>{timerSettings.name}</div>
          <Timer time={timerSettings.time} />
          {timerSettings.name === "tabata" && (
            <div>
              <div>
                Round: {currentRound} / {timerSettings.rounds}
              </div>
              <div>{isWorkPeriod ? "Work" : "Rest"} Period</div>
            </div>
          )}
          {timerSettings.name === "xy" && (
            <div>
              Round: {currentRound} / {timerSettings.rounds}
            </div>
          )}
        </Container>
      ))}
    </div>
  );
};

export default Queue;
