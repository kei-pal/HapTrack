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
  const [dayBefore, setDayBefore] = useState<string>('');

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

    const today = new Date();
    const yesterdayDate = new Date(today);
    yesterdayDate.setDate(today.getDate() - 1);
    const dayBeforeDate = new Date(today);
    dayBeforeDate.setDate(today.getDate() - 2);
    setCurrentDay(today.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase());
    setYesterday(yesterdayDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase());
    setDayBefore(dayBeforeDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase());
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  // Function to decode the habit history
  const decodeHistory = (history: number, daysAgo: number): boolean => {
    // Shift the bits to the right to get the corresponding bit at the beginning
    const shifted = history >> daysAgo;
    // Check if the least significant bit is set (1) or not (0)
    return (shifted & 1) === 1;
  };

  // Function to update the habit history when a checkbox is clicked
  const updateHistory = (habit: Habit, daysAgo: number) => {
    const updatedHabits = habits.map((h) => {
      if (h.id === habit.id) {
        const updatedHistory = h.history | (1 << daysAgo); // Set the specified day's bit to 1
        return { ...h, history: updatedHistory };
      }
      return h;
    });

    setHabits(updatedHabits);

    fetch(`/api/Habits/${habit.id}/history`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: habit.id, history: updatedHabits.find((h) => h.id === habit.id)?.history }),
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
            <TableCell>{dayBefore}</TableCell>
            <TableCell>Streak</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {habits.map((habit) => (
            <TableRow
              key={habit.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <PhaseIcon phase={habit.phase}/>
              </TableCell>
              <TableCell component="th" scope="row">
                {habit.name}
              </TableCell>
              <TableCell>
                <Button onClick={() => updateHistory(habit, 0)}>
                  <CheckBox done={decodeHistory(habit.history, 0)}/>
                </Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => updateHistory(habit, 1)}>
                  <CheckBox done={decodeHistory(habit.history, 1)}/>
                </Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => updateHistory(habit, 2)}>
                  <CheckBox done={decodeHistory(habit.history, 2)}/>
                </Button>
              </TableCell>
              <TableCell>
                51
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default Habits;
