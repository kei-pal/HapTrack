import React from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

interface Props {
  done: boolean;
}

const CheckBox: React.FC<Props> = ({ done }) => {
  return (
    <>
      {done ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon/>}
    </>
  )
}

export default CheckBox