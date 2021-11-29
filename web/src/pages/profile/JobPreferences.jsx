import React from 'react';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useHistory } from 'react-router-dom';

const JobPreferences = () => {
  const history = useHistory();

  const style = {
    position: 'absolute',
    top: '57%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    height: '90%',
    overflowY: 'scroll',
    overflowX: 'hidden',
    bgcolor: 'background.paper',

    p: 4,
  };

  return (
    <div>
      <div>Nav bar</div>

      <Box sx={style}>
        <ArrowBackIcon
          onClick={() => {
            history.push('./Profile")');
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              marginLeft: '2px',
              marginTop: ' 15px',
              fontSize: '1.5rem',
              fontFamily:
                'Helvetica Neue,Helvetica,Avenir Next,Arial,Roboto,Noto,sans-serif',
              fontWeight: '700',
              lineHeight: '1.5rem',
            }}
          >
            Job preferences
            {' '}
          </div>
        </div>
        <div
          style={{
            marginLeft: '0px',
            marginTop: ' 8px',
            fontSize: '1rem',
            fontWeight: '400',
            lineHeight: '1.3em',
            color: '#444444',
          }}
        >
          Update preferences as needed to get better recommendations across
          Indeed.
        </div>
      </Box>
    </div>
  );
};

export default JobPreferences;
