import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CreateIcon from '@mui/icons-material/Create';
import BrushIcon from '@mui/icons-material/Brush';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      sx={{ width: '100%', position: 'fixed', bottom: 0 }} 
    >
    
      <BottomNavigationAction label="Read" icon={<LibraryBooksIcon />} 
      />
      <BottomNavigationAction label="Write" icon={<CreateIcon />} component={Link} 
        to="/write" />
      <BottomNavigationAction label="Illustrate" icon={<BrushIcon />} />
      <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
    </BottomNavigation>
  );
};

export default BottomNav;
