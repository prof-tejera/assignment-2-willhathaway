import React from "react";

export default function Input({ name, value, onChange, disabled }) {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "10px",
  };

  const inputStyle = {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    fontFamily: "monospace",
    fontSize: "16px",
    border: "1px solid white",
    borderRadius: "4px",
    outline: "none",
    textAlign: "center",
    margin: "5px 0",
    width: "50px",
  };

  const labelStyle = {
    color: "black", 
    fontFamily: "monospace", 
    marginBottom: "5px", 
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>{name}</label>
      <input
        style={inputStyle}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength="2"
        disabled={disabled}
      />
    </div>
  );
}
