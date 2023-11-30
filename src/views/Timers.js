import React from "react";
import styled from "styled-components";

import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";
import Container from "../components/generic/Container";
import Stopwatch from "../components/timers/Stopwatch";

const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Timer = styled.div`
  padding: 10px;
  margin: 5px;
  font-size: 1.5rem;
`;

const TimerTitle = styled.div`
  font-weight: 900;
  text-align: center;
  margin: auto;
  width: 50%;
  padding: 5px;
`;

const TimersView = () => {
  const timers = [
    { title: "Stopwatch", C: <Stopwatch onChangeSettings={() => {return}} isSettings={false}/> },
    { title: "Countdown", C: <Countdown onChangeSettings={() => {return}} isSettings={false}/> },
    { title: "XY", C: <XY onChangeSettings={() => {return}} isSettings={false}/> },
    { title: "Tabata", C: <Tabata onChangeSettings={() => {return}} isSettings={false}/> },
  ];

  return (
    <Timers>
      {timers.map((timer, i) => (
        <Container>
        <Timer key={`timer-{timer.title}-`+i}>
          <TimerTitle>{timer.title}</TimerTitle>
          {timer.C}
        </Timer>
        </Container>
      ))}
    </Timers>
  );
};

export default TimersView;
