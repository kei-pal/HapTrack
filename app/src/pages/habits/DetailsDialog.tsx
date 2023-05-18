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
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
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
  const history = Array.from({length: 32}, (_, i) => ((habit.history >> i) & 1) === 1).reverse();

  const dayOfWeek = new Date().getDay();
  // If today is Sunday (dayOfWeek is 0), make it 7 to fit the Monday-based week
  const adjustedDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

  // Get the portion of the history from today and previous days
  const currentAndPastHistory = history.slice(history.length - adjustedDayOfWeek);
  
  // Get the portion of the history for future days of this week
  const futureHistory = history.slice(0, history.length - adjustedDayOfWeek);

  // Merge the arrays so that currentAndPastHistory appears at the end
  const orderedHistory = [...futureHistory, ...currentAndPastHistory];

  // Chunks the history into weeks
  const chunks = Array(Math.ceil(orderedHistory.length / 7)).fill(0).map(_ => orderedHistory.splice(0, 7)).reverse();

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
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day) => (
                <TableCell align="center">{day}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {chunks.map((week, weekIndex) => (
              <TableRow key={weekIndex}>
                {week.map((value, index) => (
                  <TableCell align="center" key={index}>
                    {value ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                  </TableCell>
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
