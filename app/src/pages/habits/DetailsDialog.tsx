import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React from 'react';

interface Props {
  open: boolean;
  handleClose: () => void;
  habit: Habit;
}

interface Habit {
  id: string;
  name: string;
  history: number;
}

const DetailsDialog: React.FC<Props> = ({
  open,
  handleClose,
  habit,
}) => {
  const [name, setName] = React.useState(habit.name);

  // Decodes the history to an array of boolean values
  const history = Array.from({length: 32}, (_, i) => ((habit.history >> i) & 1) === 1);

  // Days of the week
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Function to get today's day of the week
  const getDayOfWeek = () => {
    const date = new Date();
    const day = date.getDay();
    return day;
  };

  // Function to get shifted days of the week
  const getShiftedDaysOfWeek = () => {
    const dayOfWeek = getDayOfWeek();
    const shiftedDaysOfWeek = [...daysOfWeek.slice(dayOfWeek), ...daysOfWeek.slice(0, dayOfWeek + 1)].reverse();
    return shiftedDaysOfWeek;
  };

  // Chunks the history into weeks
  const chunks = Array(Math.ceil(history.length / 7)).fill(0).map(_ => history.splice(0, 7));

  return (
    <>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{habit.name}</DialogTitle>
      <TextField 
        label="Habit Name" 
        value={habit.name}
        sx={{m:2}}
        InputProps={{
          readOnly: true,
        }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {getShiftedDaysOfWeek().map((day) => (
                <TableCell align="center">{day}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {chunks.map((week, weekIndex) => (
              <TableRow key={weekIndex}>
                {week.map((value, index) => (
                  <TableCell align="center" key={index}>{value ? "Done" : "Not Done"}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
    </>
  )
}

export default DetailsDialog;
