import React, { useEffect, useState } from 'react';

interface Habit {
  id: string;
  name: string;
}

const Habits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch('/api/Habits');
        if (response.ok) {
          const data = await response.json();
          setHabits(data);
        } else {
          console.error('Failed to fetch habits');
        }
      } catch (error) {
        console.error('Error occurred while fetching habits', error);
      }
    };

    fetchHabits();
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div>
      <h2>Habits</h2>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>{habit.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Habits;
