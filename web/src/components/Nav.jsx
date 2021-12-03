/* eslint-disable import/no-duplicates */
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useHistory, useLocation } from 'react-router';

import { AntTabs, AntTab } from './AntTabs';

const Nav = () => {
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = useState(-1);

  useEffect(() => {
    const paths = location.pathname.split('/');
    if (paths.length > 1) {
      switch (paths[1]) {
        case 'reviews': setValue(1);
          break;
        case 'salaries': setValue(2);
          break;
        case '': setValue(0);
          break;
        default: setValue(-1);
          break;
      }
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      history.push('/');
    } else if (newValue === 1) {
      history.push('/reviews');
    } else if (newValue === 2) {
      history.push('/salaries');
    }
  };
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ bgcolor: '#fff' }}>
          <AntTabs
            value={value}
            onChange={handleChange}
            aria-label="ant example"
          >
            <AntTab label="Find jobs" />
            <AntTab label="Companies reviews" />
            <AntTab label="Find salaries" />
          </AntTabs>
          <Box sx={{ p: 3 }} />
        </Box>
      </Box>
    </div>
  );
};

export default Nav;
