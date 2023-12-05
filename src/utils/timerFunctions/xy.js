const runXYTimer = (settings, setTime, currentRound, setCurrentRound) => {
  const { time, rounds } = settings;

  let interval = setInterval(() => {
    setTime((prevTime) => {
      const newTime = prevTime - 1000;
      if (newTime >= 0) {
        return newTime;
      } else {

        if (currentRound < rounds) {
          setCurrentRound((prevRound) => prevRound + 1);
          return settings.time;
        } else {
          console.log("round equals rounds" + currentRound, rounds)
          clearInterval(interval);
          return 0;
        }
      }
    });
  }, 1000);

  return interval;
};

export default runXYTimer;
