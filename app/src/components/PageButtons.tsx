import { Button } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const PageButtons = () => {
  const location = useLocation();
  const showHabitsButtons = location.pathname === '/habits';

  
  return (
    <div>
      {showHabitsButtons && (
        <Button component={NavLink} to="add" relative="path">
          <AddIcon/>
        </Button>
      )}
    </div>
  )
}

export default PageButtons