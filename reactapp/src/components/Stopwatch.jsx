// src/components/Stopwatch/Stopwatch.jsx
import React, { useState, useEffect } from 'react';

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
      <p id="time">{formatTime(timer)}</p>
      {running ? (
        <>
          <button id="pause" onClick={handleStartPause}>
            Pause
          </button>
        </>
      ) : (
        <>
          <button id="start" onClick={handleStartPause}>
            Start
          </button>
          {timer > 0 && (
            <button id="reset" onClick={handleReset}>
              Reset
            </button>
          )}
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
