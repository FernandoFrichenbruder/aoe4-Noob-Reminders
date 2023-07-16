import React, { useState, useEffect } from 'react';
import data from './data.json';

const App = () => {
  const [hasWater, setHasWater] = useState(false);
  const [needsHarass, setNeedsHarass] = useState(false);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const mapType = hasWater ? 'water' : 'land';
    const strategyType = needsHarass ? 'haraas' : 'normal';
    const newReminders = data.maps[0][mapType][0][strategyType][0];

    const remindersWithTimes = Object.entries(newReminders).map(([time, reminder]) => ({
      time: parseInt(time),
      reminder,
    }));
    setReminders(remindersWithTimes);

    remindersWithTimes.forEach(({ time, reminder }) => {
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(reminder);
        window.speechSynthesis.speak(utterance);
      }, time);
    });
  }, [hasWater, needsHarass]);

  return (
    <div className="App">
      <h1>Age of Empires 4 Noob Reminders</h1>
      <label>
        <input type="checkbox" checked={hasWater} onChange={(e) => setHasWater(e.target.checked)} />
        Does the map have water?
      </label>
      <label>
        <input type="checkbox" checked={needsHarass} onChange={(e) => setNeedsHarass(e.target.checked)} />
        Need to harass?
      </label>
      <h2>Reminders:</h2>
      <ul>
        {reminders.map(({ time, reminder }, index) => (
          <li key={index}>
            {time / 1000}s: {reminder}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
