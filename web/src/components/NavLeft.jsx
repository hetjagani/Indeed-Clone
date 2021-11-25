import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import FeedIcon from '@mui/icons-material/Feed';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReviewsIcon from '@mui/icons-material/Reviews';
import EmailIcon from '@mui/icons-material/Email';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

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
    marginLeft: 20,
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

const NavLeft = () => {
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleChange = (event, newValue) => {
    if (newValue === 2) {
      setAnchorEl(event.currentTarget);
    }
    setValue(newValue);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
            <AntTab icon={<ChatIcon />} aria-label="phone" />
            <AntTab icon={<NotificationsIcon />} aria-label="favorite" />
            <AntTab icon={<PersonIcon />} aria-label="person" />
            <hr
              style={{
                height: '25px',
                borderTop: '2px solid #ececec',
                marginTop: '35px',
                marginLeft: '0px',
                marginRight: '0px',
              }}
            />
            <AntTab label="Employers/Post job" />
          </AntTabs>
          <Box sx={{ p: 3 }} />
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 0,
            width: 350,
            height: 470,
            '& .MuiMenuItem-root': {
              height: 42,
              mt: 1,
              paddingRight: 4,
              paddingLeft: 4,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 15,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>emailAddress</MenuItem>
        <MenuItem>
          <FeedIcon />
          {' '}
          <p style={{ marginLeft: '15px' }}>Profile</p>
        </MenuItem>
        <MenuItem>
          <FavoriteIcon />
          {' '}
          <p style={{ marginLeft: '15px' }}>My jobs</p>
        </MenuItem>
        <MenuItem>
          <ReviewsIcon />
          {' '}
          <p style={{ marginLeft: '15px' }}>My reviews</p>
        </MenuItem>
        <MenuItem>
          <EmailIcon />
          {' '}
          <p style={{ marginLeft: '15px' }}>Email preferences</p>
        </MenuItem>
        <MenuItem>
          <SearchIcon />
          {' '}
          <p style={{ marginLeft: '15px' }}>Search preferences</p>
        </MenuItem>
        <MenuItem>
          <SettingsIcon />
          {' '}
          <p style={{ marginLeft: '15px' }}>Settings</p>
        </MenuItem>
        <MenuItem>
          <HelpIcon />
          {' '}
          <p style={{ marginLeft: '15px' }}>Help Center</p>
        </MenuItem>
        <Divider />
        <p style={{ textAlign: 'center', fontWeight: '700', color: '#2557a7' }}>
          Sign out
        </p>
      </Menu>
    </div>
  );
};

export default NavLeft;
