import React from "react";

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

const Timer = ({ time }) => {
  const timerStyle = {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    fontFamily: "monospace",
    textAlign: "center",
    border: "1px solid white",
    borderRadius: "4px",
  };


  return <p style={timerStyle}>{formatTime(time)}</p>;
};

export default Timer;
