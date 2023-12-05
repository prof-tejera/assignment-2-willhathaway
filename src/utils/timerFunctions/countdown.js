const runCountdownTimer = (settings, currentTime) => {
  const newTime = currentTime - 1000;
  return newTime > 0 ? newTime : 0;
};

export default runCountdownTimer;
