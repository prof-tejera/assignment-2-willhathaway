const runStopwatchTimer = (settings, currentTime) => {

  console.log("Stopwatch func, incoming time: ", currentTime);

  const limitInMilliseconds = settings.limit * 1000;
  
  if (currentTime + 1000 >= limitInMilliseconds) {
    console.log("currentTime + 1000 > limit in ms")
    return limitInMilliseconds;
  } else {
    console.log("Stopwatch func, returning: ", currentTime + 1000);

    return currentTime + 1000;
  }
};

export default runStopwatchTimer;
