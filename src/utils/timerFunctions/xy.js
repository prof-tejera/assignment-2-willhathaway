const runXYTimer = (settings, setTime, setCurrentRound) => {
    const { time, numRounds } = settings;
    let round = 0;
    let interval;
  
    interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1000;
        } else {
          round++;
          setCurrentRound(round + 1);
          if (round >= numRounds) {
            clearInterval(interval);
            return 0;
          } else {
            return time; 
          }
        }
      });
    }, 1000);
  
    return interval; 
  };
  
  
  
  export default runXYTimer;