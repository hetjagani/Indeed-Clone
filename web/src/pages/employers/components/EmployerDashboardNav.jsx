/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import {
  AppBar, createTheme, Toolbar,
} from '@mui/material';
import { AntTab, AntTabs } from '../../../components/AntTabs';

function appBarLabel(bruh, setShowComponent) {
  // const decoded = getLoginDetails();
  // const dispatch = useDispatch();

  const [value, setValue] = useState(2);

  useEffect(() => {
    setShowComponent(2);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setShowComponent(newValue);
  };

  return (
    <Toolbar>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          height: '100px',
        }}
      >
        <>
          <AntTabs
            value={value}
            onChange={handleChange}
            aria-label="ant example"
          >
            <AntTab label="Profile" />
            <AntTab label="Reviews" />
            <AntTab label="Jobs" />
            <AntTab label="Applicants" />
            {/* <AntTab label="Report" /> */}
          </AntTabs>
        </>
      </div>
    </Toolbar>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#fff',
    },
  },
});

function EmployerDashboardNav({ setShowComponent }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" sx={{ height: '60px' }}>
        {appBarLabel('default', setShowComponent)}
      </AppBar>
    </ThemeProvider>
  );
}

export default EmployerDashboardNav;
