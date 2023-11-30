const runTabataTimer = (settings, setTime, currentPhase, setCurrentPhase, currentRound, setCurrentRound) => {

    console.log("test tabata")
    const { workTime, restTime, numRounds } = settings;

    let interval = setInterval(() => {
      setTime((prevTime) => {
        if (currentPhase === 'work') {
          if (prevTime + 1000 < workTime) {
            return prevTime + 1000;
          } else {
            setCurrentPhase('rest');
            setCurrentRound((prevRound) => prevRound + 1);
            return 0; 
          }
        } else { 
          if (prevTime + 1000 < restTime) {
            return prevTime + 1000;
          } else {
            if (currentRound >= numRounds) {
              clearInterval(interval);
            } else {
              setCurrentPhase('work');
            }
            return 0;
          }
        }
      });
    }, 1000);

    return interval;
};
