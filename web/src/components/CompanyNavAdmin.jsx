import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const AntTabs = styled(Tabs)({
  width: '100%',
  marginLeft: 'auto',
  borderBottom: '1px solid #e8e8e8',
  height: 82,
  '& .MuiTabs-indicator': {
    backgroundColor: '#000',
    height: '4px',
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
const CompanyNavAdmin = () => {
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const paths = location.pathname.split('/');
    console.log(paths);
    if (paths.length > 2) {
      switch (paths[3]) {
        case 'reviews': setValue(0);
          break;
        case 'photos': setValue(1);
          break;
        default: setValue(0);
          break;
      }
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const paths = location.pathname.split('/');
    console.log('path', paths);
    if (newValue === 0) {
      history.push(`/${paths[1]}/${paths[2]}/${paths[3]}`);
    } else if (newValue === 1) {
      history.push(`/${paths[1]}/${paths[2]}/${paths[3]}/photos`);
    }
  };
  return (
    <>
      <div
        className="fixed"
        style={{
          zIndex: 10,
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <Box sx={{
          bgcolor: '#fff',
          boxShadow: '0 4px 4px -4px #888',
        }}
        >
          <AntTabs
            value={value}
            onChange={handleChange}
            aria-label="ant example"
          >
            <AntTab label="Reviews" />
            <AntTab label="Photos" />
          </AntTabs>
        </Box>
      </div>
      <hr style={{ marginTop: '0px', borderTop: '1px #faf9f9', width: '100%' }} />
    </>
  );
};

export default CompanyNavAdmin;
