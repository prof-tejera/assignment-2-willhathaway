export const runTabataTimer = (settings, setTime, setCurrentRound, setIsWorkPeriod) => {
  const { work, rest, rounds } = settings; 
  let currentRound = 1;
  let isWorkPeriod = true;

  let interval = setInterval(() => {
    setTime((prevTime) => {
      // if we haven't reached 0 yet (a round is still running)
      if (prevTime > 0) {
        // then decrease by 1 second:
        return prevTime - 1000;
      } else {
        // until we reach 0, at which point,
        // if we were in a work period,
        if (isWorkPeriod) {
          // switch to the rest period
          isWorkPeriod = false;
          setIsWorkPeriod(false)

          return rest * 1000;
        } else {
          if (currentRound >= rounds) {
            clearInterval(interval);
            console.log("tabata complete")
            return 0;
          } else {
            setCurrentRound(currentRound);
            currentRound++;
            isWorkPeriod = true;
            return work * 1000; 
          }
        }
      }
    });
  }, 1000);

  return interval;
};


export default runTabataTimer;