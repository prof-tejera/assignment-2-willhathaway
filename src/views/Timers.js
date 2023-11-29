import React from "react";
import styled from "styled-components";

import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";
import Container from "../components/generic/Container";

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
    { title: "Stopwatch", C: <Stopwatch /> },
    { title: "Countdown", C: <Countdown /> },
    { title: "XY", C: <XY /> },
    { title: "Tabata", C: <Tabata /> },
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
