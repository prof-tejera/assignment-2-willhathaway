export const runTabataTimer = (settings, currentTime, currentRound, isWorkPeriod, setCurrentRound, setIsWorkPeriod) => {
  const { work, rest, rounds } = settings;

  if (currentTime > 0) {
    return currentTime - 1000;
  } else {
    if (isWorkPeriod) {
      setIsWorkPeriod(false);
      return rest * 1000;
    } else {
      if (currentRound < rounds) {
        setCurrentRound(currentRound + 1);
        setIsWorkPeriod(true);
        return work * 1000;
      } else {
        return -1;
      }
    }
  }
};

export default runTabataTimer;
