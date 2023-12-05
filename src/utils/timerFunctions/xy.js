export const runXYTimer = (settings, currentTime, currentRound, setCurrentRound) => {
  const { time, rounds } = settings;

  if (currentTime > 0) {
    return currentTime - 1000;
  } else {
    if (currentRound < rounds) {
      setCurrentRound(currentRound + 1);
      return time;
    } else {
      return -1;
    }
  }
};

export default runXYTimer;
