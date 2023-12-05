import React, { useState, useEffect, useRef } from "react";
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
  const timeRef = useRef(time);

  const [isRunning, setIsRunning] = useState(false);

  // for tabata:
  const [currentRound, setCurrentRound] = useState(1);
  const [isWorkPeriod, setIsWorkPeriod] = useState(true);

  const highlightedTimerStyle = {
    border: "4px solid red",
  };

  useEffect(() => {
    console.log(queue);
    if (!isRunning) {
      console.log("initializing timer");
      initializeTimer(currentTimerIndex);
    }
  }, [currentTimerIndex]);

  useEffect(() => {
    let interval;

    const currentTimer = queue[currentTimerIndex];
    console.log("current timer: " + JSON.stringify(currentTimer));
    console.log("Time before setting new time: ", time);

    if (isRunning && currentTimerIndex < queue.length) {
      interval = setInterval(() => {
        let newTime;

        switch (currentTimer.name) {
          case "countdown":
            newTime = runCountdownTimer(currentTimer, timeRef.current);
            setTime(newTime);
            timeRef.current = newTime;
            if (newTime <= 0) {
              handleTimerCompletion();
            }
            break;
          case "stopwatch":
            console.log("running stopwatch. time: " + time);
            newTime = runStopwatchTimer(currentTimer, timeRef.current);
            setTime(newTime);
            timeRef.current = newTime;
            if (newTime >= currentTimer.limit * 1000) {
              console.log("handling timer completion");
              handleTimerCompletion();
            }
            break;
          case "tabata":
            newTime = runTabataTimer(
              currentTimer,
              timeRef.current,
              currentRound,
              isWorkPeriod,
              setCurrentRound,
              setIsWorkPeriod
            );
            setTime(newTime);
            timeRef.current = newTime;
            if (newTime === -1) {
              handleTimerCompletion();
            }
            break;
          case "xy":
            newTime = runXYTimer(
              currentTimer,
              timeRef.current,
              currentRound,
              setCurrentRound
            );
            setTime(newTime);
            timeRef.current = newTime;
            if (newTime === -1) {
              handleTimerCompletion();
            }
            break;
          default:
            setTime(0);

            break;
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, currentTimerIndex, queue, currentRound]);

  const handleTimerCompletion = () => {
    console.log("Timer completion, time before reset: ", time);
    const nextIndex =
      currentTimerIndex < queue.length - 1 ? currentTimerIndex + 1 : 0;
    console.log("current index: " + currentTimerIndex);

    console.log("next index: " + nextIndex);
    setCurrentTimerIndex(nextIndex);
    initializeTimer(nextIndex);
  };

  const initializeTimer = (index) => {
    console.log("initializing timer. time: " + time);
    if (index < queue.length) {
      const timerSettings = queue[index];

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
        <Container
          key={index}
          style={index === currentTimerIndex ? highlightedTimerStyle : {}}
        >
          <div>{timerSettings.name}</div>
          {timerSettings.name === "stopwatch" && (
            <div>Limit: {timerSettings.limit}</div>
          )}
          {timerSettings.name === "countdown" && (
            <div>Time: {timerSettings.time}</div>
          )}
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
