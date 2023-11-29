import React, { useState } from "react";

export default function Button({ name, method }) {
  const buttonStyle = {
    backgroundColor: "black",
    color: "white",
    padding: "10px 20px",
    fontFamily: "monospace",
    fontSize: "16px",
    margin: "5px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    outline: "none",
    transition: "background-color 0.3s",
  };

  const hoverStyle = {
    backgroundColor: "grey",
  };

  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={method}
      style={{ ...buttonStyle, ...(hover ? hoverStyle : {}) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {name}
    </button>
  );
}
