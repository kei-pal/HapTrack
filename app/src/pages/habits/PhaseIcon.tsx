import React from 'react'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

interface Props {
  phase: string;
}

const PhaseIcon: React.FC<Props> = ({ phase }) => {
  return (
    <>
      {phase === 'up' && <TrendingFlatIcon />}
      {phase === 'down' && <TrendingFlatIcon />}
    </>
  )
}

export default PhaseIcon