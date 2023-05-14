import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

const AddHabit = () => {
  const [habitName, setHabitName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Make the API request
    try {
      const response = await fetch('/api/Habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Name: habitName }),
      });

      if (response.ok) {
        // Handle successful response
        navigate('/habits');
      } else {
        // Handle error response
        // You can show an error message or perform appropriate error handling
        console.error('Failed to add habit');
      }
    } catch (error) {
      // Handle network or request error
      console.error('Error occurred while adding habit', error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
      <TextField
          required
          id="outlined-required"
          label="Habit Name"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
        />
      </div>
    </Box>
  );
};

export default AddHabit;