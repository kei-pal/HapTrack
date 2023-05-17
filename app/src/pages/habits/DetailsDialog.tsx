import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react'

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
  const [id] = React.useState(habit.id);
  const [name, setName] = React.useState(habit.name);
  const [history] = React.useState(habit.history);

  return (
    <>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{name} Details</DialogTitle>
    </Dialog>
    </>
  )
}

export default DetailsDialog