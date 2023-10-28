import React from 'react'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';

interface Props {
  phase: string;
}

const PhaseIcon: React.FC<Props> = ({ phase }) => {
  return (
    <>
      {phase === 'New' && <ChildFriendlyIcon />}
      {phase === 'Build' && <TrendingUpIcon />}
      {phase === 'Strong' && <WhatshotIcon />}
      {phase === 'Fade' && <TrendingDownIcon />}
      {phase === 'Plateau' && <TrendingFlatIcon />}
    </>
  )
}

export default PhaseIcon