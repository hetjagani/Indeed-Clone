import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useHistory, useLocation } from 'react-router';

const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  height: 82,
  '& .MuiTabs-indicator': {
    backgroundColor: '#2557a7',
  },
  '& .MuiTabs-indicator:hover': {
    backgroundColor: '#2557a7',
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,
    marginTop: 25,
    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '& .MuiTabs-indicator:hover': {
      backgroundColor: '#2557a7',
    },
    '&.Mui-selected': {
      color: 'black',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'black',
    },
  }),
);
const Nav = () => {
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = React.useState(1);

  useEffect(() => {
    const paths = location.pathname.split('/');
    if (paths.length > 1) {
      switch (paths[1]) {
        case 'reviews': setValue(1);
          break;
        case 'salaries': setValue(2);
          break;
        default: setValue(0);
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
