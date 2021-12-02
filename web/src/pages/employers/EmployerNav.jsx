import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { ThemeProvider } from '@emotion/react';
import {
  AppBar, createTheme, IconButton, Toolbar,
} from '@mui/material';

import IndeedForEmployersSVG from '../../components/svg/IndeedForEmployersSVG';
import { DarkAntTab, DarkAntTabs } from '../../components/AntTabsDark';
import Button from '../../components/Button';

function appBarLabel() {
  const [value, setValue] = useState(0);
  const history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // history.push('/login');
  };

  return (
    <Toolbar>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <IndeedForEmployersSVG onClick={() => history.push('/hire')} />
          </IconButton>
          <DarkAntTabs
            value={value}
            onChange={handleChange}
            aria-label="ant example"
          >
            <DarkAntTab label="Post a job" />
            <DarkAntTab label="Find Candidates" />
            <Button style={{ marginLeft: '1250px', width: '100px', marginTop: '5px' }} label="Sign in" />
          </DarkAntTabs>
        </>
      </div>
    </Toolbar>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

function EmployerNav() {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="primary" sx={{ height: '60px' }}>
        {appBarLabel('default')}
      </AppBar>
    </ThemeProvider>
  );
}

export default EmployerNav;
