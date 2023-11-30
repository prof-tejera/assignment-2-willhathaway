const runStopwatchTimer = (settings, setTime) => {
    
    const limitInMilliseconds = settings.limit * 1000;
    let interval = setInterval(() => {
      setTime((prevTime) => {
        
        if (prevTime + 1000 >= limitInMilliseconds) {
          clearInterval(interval); 
          return limitInMilliseconds; 
        } else {
          return prevTime + 1000; 
        }
      });
    }, 1000);
    return interval;
};

export default runStopwatchTimer;
