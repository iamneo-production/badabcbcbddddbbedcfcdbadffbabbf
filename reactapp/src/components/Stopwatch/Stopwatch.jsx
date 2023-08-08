import React, { useState, useEffect } from 'react';
import classes from './stopwatch.module.css';

const Stopwatch = () => {
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);

  const handleStartPause = () => {
    setRunning(prevRunning => !prevRunning);
  };

  const handleReset = () => {
    setRunning(false);
    setTimer(0);
  };

  return (
    <div>
      <p data-testid="time" className={classes.time}>{formatTime(timer)}</p>
      {running ? (
        <>
          <button data-testid="pause" className={classes.button} id="pause" onClick={handleStartPause}>
            Pause
          </button>
          <button data-testid="reset" className={classes.button} id="reset" onClick={handleReset}>
            Reset
          </button>
        </>
      ) : (
        <>
          <button data-testid="start" className={classes.button} id={timer > 0 ? 'resume' : 'start'} onClick={handleStartPause}>
            {timer > 0 ? 'Resume' : 'Start'}
          </button>
          <button data-testid="reset" className={classes.button} id="reset" onClick={handleReset} disabled={timer === 0 && !running}>
            Reset
          </button>
        </>
      )}
    </div>
  );
};

const formatTime = time => {
  const hours = Math.floor(time / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

export default Stopwatch;
