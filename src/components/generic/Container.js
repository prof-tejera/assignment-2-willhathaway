import React from 'react';

const Container = ({ children }) => {
  const containerStyle = {
    width: '300px',
    backgroundColor: 'whitesmoke',
    border: '2px solid darkslategrey',
    padding: '16px',
    margin: '16px',
  };

  return (
    <div style={containerStyle}>
      {children}
    </div>
  );
};

export default Container;
