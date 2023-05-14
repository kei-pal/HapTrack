import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import PhaseIcon from './PhaseIcon';
import CheckBox from './CheckBox';
import { Button } from '@mui/material';

interface Habit {
  id: string;
  name: string;
  phase: string;
  history: number;
}

const Habits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [currentDay, setCurrentDay] = useState<string>('');
  const [yesterday, setYesterday] = useState<string>('');

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch('/api/Habits', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add the Authorization header with the token
          },
        });
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

    const today = new Date();
    const yesterdayDate = new Date(today);
    yesterdayDate.setDate(today.getDate() - 1);
    const dayBeforeDate = new Date(today);
    dayBeforeDate.setDate(today.getDate() - 2);
    setCurrentDay(today.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase());
    setYesterday(yesterdayDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase());
  }, []);

  const wasHabitDone = (history: number, daysAgo: number): boolean => {
    const shifted = history >> daysAgo;
    return (shifted & 1) === 1;
  };

  // Function to calculate the number of consecutive zeros (days since it was last done)
  const calculateDaysSinceLastDone = (history: number): number => {
    let days = 0;
    let shifted = history;
  
    // Check if the history is not zero and the least significant bit is 0
    while (shifted !== 0 && (shifted & 1) === 0) {
      days++;
      shifted >>= 1; // Right shift the history
    }
  
    return days;
  };

  // Function to update the habit history when a checkbox is clicked
  const updateHistory = (habit: Habit, daysAgo: number) => {
    let updatedHistory = habit.history;
    const updatedHabits = habits.map((h) => {
      if (h.id === habit.id) {
        updatedHistory = h.history ^ (1 << daysAgo); // Toggle the specific day's bit using XOR
        return { ...h, history: updatedHistory };
      }
      return h;
    });

    setHabits(updatedHabits);

    fetch(`/api/Habits/${habit.id}/history`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ id: habit.id, history: updatedHistory }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update habit history');
        }
      })
      .catch((error) => {
        console.error('Error occurred while updating habit history', error);
      });
  };

  return (
    <>
    <div>
      <h2>Habits</h2>
    </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Phase</TableCell>
            <TableCell>Habit</TableCell>
            <TableCell>{currentDay}</TableCell>
            <TableCell>{yesterday}</TableCell>
            <TableCell>DSLD</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {habits.map((habit) => {
            // const daysSinceLastDone = 1;
            const daysSinceLastDone = calculateDaysSinceLastDone(habit.history);
            return (
              <TableRow
                key={habit.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <PhaseIcon phase={habit.phase} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {habit.name}
                </TableCell>
                <TableCell>
                  <Button onClick={() => updateHistory(habit, 0)}>
                    <CheckBox done={wasHabitDone(habit.history, 0)} />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => updateHistory(habit, 1)}>
                    <CheckBox done={wasHabitDone(habit.history, 1)} />
                  </Button>
                </TableCell>
                <TableCell>{daysSinceLastDone}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  );
};

export default Habits;
