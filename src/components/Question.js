import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Set up the timer when the component mounts
    const timerId = setTimeout(() => {
      onAnswered(false); // Call onAnswered after 10 seconds
    }, 10000);

    // Interval to decrement the timer every second
    const intervalId = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          clearInterval(intervalId); // Stop the interval when time is up
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Clean up timers when the component unmounts
    return () => {
      clearTimeout(timerId);
      clearInterval(intervalId);
    };
  }, [onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
