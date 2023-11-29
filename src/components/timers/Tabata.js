import React, { useState, useEffect } from "react";
import Timer from "../generic/Timer";
import Button from "../generic/Button";
import Input from "../generic/Input";

const Tabata = () => {
  const [workTime, setWorkTime] = useState("00");
  const [restTime, setRestTime] = useState("00");
  const [rounds, setRounds] = useState("0");
  const [currentRound, setCurrentRound] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(workTime * 1000);
  const [isWorkPeriod, setIsWorkPeriod] = useState(true);

  useEffect(() => {
    let interval;

    if (isActive && currentRound <= rounds) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1000;
          } else {
            if (isWorkPeriod) {
              setIsWorkPeriod(false);
              return restTime * 1000;
            } else {
              setIsWorkPeriod(true);
              if (currentRound < rounds) {
                setCurrentRound((round) => round + 1);
              }
              return workTime * 1000;
            }
          }
        });
      }, 1000);
    } else if (currentRound > rounds && isActive) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, currentRound, isWorkPeriod, workTime, restTime, rounds]);


  const toggleStartStop = () => {
    if (!isActive) {
      setIsActive(true);
      // Set the conditions only when starting the timer
      if (currentRound === 1 && timeLeft === workTime * 1000) {
        setIsWorkPeriod(true);
      }
    } else {
      setIsActive(false);
    }
  };
  

  const handleReset = () => {
    setIsActive(false);
    setCurrentRound(1);
    setTimeLeft(workTime * 1000);
    setIsWorkPeriod(true);
  };



  return (
    <div>
      <label>
        <Input
          name="Work Time (s):"
          value={workTime}
          onChange={(newValue) => setWorkTime(newValue)}
          disabled={false}
        />
      </label>
      <div />
      <label>
        <Input
          name="Rest Time (s)"
          value={restTime}
          onChange={(newValue) => setRestTime(newValue)}
          disabled={false}
        />
      </label>
      <div />
      <label>
        <Input
          name="Rounds"
          value={rounds}
          onChange={(newValue) => setRounds(newValue)}
          disabled={false}
        />
      </label>
      <div />

      <Timer time={timeLeft} />
      <div>
        Round: {currentRound} / {rounds}
      </div>
      <div>{isWorkPeriod ? "Work" : "Rest"} Period</div>
      {!isActive && <Button name="Start" method={toggleStartStop} />}
      {isActive && <Button name="Stop" method={toggleStartStop} />}
      <Button name="Reset" method={handleReset} />
    </div>
  );
};

export default Tabata;
