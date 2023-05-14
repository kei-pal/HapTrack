import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

const AddHabit = () => {
  const [habitName, setHabitName] = useState('');
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Make the API request
    try {
      const response = await fetch('/api/Habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ Name: habitName }),
      });

      if (response.ok) {
        // Handle successful response
        navigate('/habits');
      } else {
        response.json().then((data) => {
          setErrors(data.errors); // Set errors state with the returned errors
        });
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
          label="Habit Name"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          error={Boolean(errors.Name)}
          helperText={errors.Name || ''}
        />
      </div>
    </Box>
  );
};

export default AddHabit;