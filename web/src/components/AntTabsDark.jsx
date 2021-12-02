import React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import { Tab } from '@mui/material';

const DarkAntTabs = styled(Tabs)({
  height: 45,
  '& .MuiTabs-indicator': {
    backgroundColor: '#9BB1F0',
  },
  '& .MuiTabs-indicator:hover': {
    backgroundColor: '#9BB1F0',
  },
});

const DarkAntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    color: 'white',
    textTransform: 'none',
    minWidth: 0,
    overflowY: 'visible',
    marginTop: 1,
    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
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
      color: 'white',
      borderBottom: '5px solid #9BB1F0',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'black',
    },
  }),
);

export { DarkAntTab, DarkAntTabs };
