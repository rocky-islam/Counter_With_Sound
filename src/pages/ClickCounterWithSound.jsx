import  { useState, useEffect } from 'react';

import soundFile from '../assets/mixkit-appliance-ready-beep-1076.mp3'

// Sound file (import or reference its path)
// const soundFile = "/path_to_sound_file.mp3"; // Ensure this path is correct

const ClickCounterWithSound = () => {
  const [count, setCount] = useState(0); // Counter state
  const [targetNumber, setTargetNumber] = useState(null); // Target number (from radio or input)
  const [selectedOption, setSelectedOption] = useState(''); // Radio button selection

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

  // Handle radio button selection
  const handleRadioChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    if (value !== 'custom') {
      setTargetNumber(parseInt(value)); // If it's a fixed number, set it directly
      setCount(0); // Reset counter when radio changes
    }
  };

  // Handle input field change for custom number
  const handleInputChange = (e) => {
    setTargetNumber(parseInt(e.target.value)); // Set the target number from input
    setCount(0); // Reset counter when a new number is entered
  };

  // Handle key press (Enter key triggers the Increment)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleIncrement(); // Increment counter when Enter is pressed
    }
  };

  return (
    <div onKeyDown={handleKeyPress} tabIndex="0">
      <h1>Counter: {count}</h1>

      {/* Radio buttons for selecting predefined target numbers */}
      <label>
        <input
          type="radio"
          value="5"
          checked={selectedOption === '5'}
          onChange={handleRadioChange}
        />
        Target 5
      </label>

      <label>
        <input
          type="radio"
          value="10"
          checked={selectedOption === '10'}
          onChange={handleRadioChange}
        />
        Target 10
      </label>

      <label>
        <input
          type="radio"
          value="custom"
          checked={selectedOption === 'custom'}
          onChange={handleRadioChange}
        />
        Custom Target
      </label>

      {/* Input field for custom target number */}
      {selectedOption === 'custom' && (
        <input
          type="number"
          placeholder="Enter target number"
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
      )}

      <button onClick={handleIncrement} disabled={count >= targetNumber}>
        Increment Counter
      </button>

      {count === targetNumber && <p>Target reached! 🎉</p>}
    </div>
  );
};

export default ClickCounterWithSound;
