import { useState, useEffect } from "react";
import soundFile from "../assets/mixkit-appliance-ready-beep-1076.mp3";

const BeepSound = () => {
  const [count, setCount] = useState(0); // Counter state
  const [targetNumber, setTargetNumber] = useState(null); // Target number from input
  // const [audio, setAudio] = useState(null);

  // Function to play the sound
  const playSound = () => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  // Function to handle incrementing the counter
  const handleIncrement = () => {
    if (count < targetNumber) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  // useEffect to check if counter matches targetNumber
  useEffect(() => {
    if (count === targetNumber && targetNumber !== null) {
      playSound(); // Play sound when counter matches target
    }
  }, [count, targetNumber]);

  // Handler for input field to set target number
  const handleInputChange = (e) => {
    setTargetNumber(parseInt(e.target.value)); // Convert input value to number
    setCount(0); // Reset counter when a new number is entered
  };

  return (
    <div>
      <div>
        <h1>Counter: {count}</h1>
        <input
          type="number"
          placeholder="Enter target number"
          onChange={handleInputChange}
        />
        <button onClick={handleIncrement} disabled={count >= targetNumber}>
          Increment Counter
        </button>
        {count === targetNumber && <p>Target reached! 🎉</p>}
      </div>
    </div>
  );
};

export default BeepSound;
