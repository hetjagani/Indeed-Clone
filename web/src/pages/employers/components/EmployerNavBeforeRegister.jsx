/* eslint-disable no-nested-ternary */
import React from 'react';
import { useHistory } from 'react-router';
import { ThemeProvider } from '@emotion/react';
import {
  AppBar, createTheme, IconButton, Toolbar,
} from '@mui/material';

import IndeedForEmployersSVG from '../../../components/svg/IndeedForEmployersSVG';
import { DarkAntTabs } from '../../../components/AntTabsDark';

function appBarLabel() {
  const history = useHistory();

  return (
    <Toolbar>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <IndeedForEmployersSVG onClick={() => history.push('/employee/hire')} />
          </IconButton>
          <DarkAntTabs
            // value={value}
            // onChange={handleChange}
            aria-label="ant example"
          >
            {/* <DarkAntTab label="Post a job" /> */}
            {/* <DarkAntTab label="Dashboard" /> */}
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

function EmployerNavBeforeRegister() {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="primary" sx={{ height: '52px' }}>
        {appBarLabel('default')}
      </AppBar>
    </ThemeProvider>
  );
}

export default EmployerNavBeforeRegister;
