/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import FeedIcon from '@mui/icons-material/Feed';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Favorite } from '@mui/icons-material';
import { logout } from '../app/actions';

import { AntTab, AntTabs } from './AntTabs';

const NavLeft = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [value, setValue] = React.useState(1);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const location = useLocation();

  useEffect(() => {
    const paths = location.pathname.split('/');
    if (paths.length > 1) {
      if (paths[1] === 'hire') {
        setValue(4);
      } else {
        setValue(-1);
      }
    }
  }, []);

  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      history.push('/messages');
    }
    if (newValue === 2) {
      setAnchorEl(event.currentTarget);
    }
    setValue(newValue);
    if (newValue === 4) {
      history.push('/hire');
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
    setValue(2);
  };
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ bgcolor: '#fff' }}>
          <AntTabs value={value} onChange={handleChange} aria-label="ant example">
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
            height: 220,
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
        <MenuItem onClick={() => history.push('/profile')}>
          <FeedIcon />
          {' '}
          <p style={{ marginLeft: '15px' }}>Profile</p>
        </MenuItem>
        <MenuItem onClick={() => history.push('/users/reviews')}>
          <ReviewsIcon />
          {' '}
          <p style={{ marginLeft: '15px' }}>My reviews</p>
        </MenuItem>
        <MenuItem onClick={() => history.push('/users/applications')}>
          <Favorite />
          {' '}
          <p style={{ marginLeft: '15px' }}>My Jobs</p>
        </MenuItem>
        <Divider />
        <p
          onClick={() => {
            dispatch(logout());
            history.push('/login');
          }}
          style={{
            textAlign: 'center',
            fontWeight: '700',
            color: '#2557a7',
            cursor: 'pointer',
          }}
        >
          Sign out
        </p>
      </Menu>
    </div>
  );
};

export default NavLeft;
