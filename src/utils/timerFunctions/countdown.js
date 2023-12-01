const runCountdownTimer = (settings, setTime) => {
    const { time } = settings; 
    console.log(time)

    let interval = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime - 1000;
        if (newTime > 0) {
          return newTime;
        } else {
          clearInterval(interval); 
          return 0;
        }
      });
    }, 1000);
    return interval; 
  };
  
  
  export default runCountdownTimer