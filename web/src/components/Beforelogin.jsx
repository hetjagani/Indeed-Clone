import * as React from 'react';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router';
import { AntTab, AntTabs } from './AntTabs';

const Beforelogin = () => {
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push('/login');
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
            <AntTab label="Upload your resume" />
            <AntTab
              label="Sign in"
              style={{ color: '#2557a7', fontWeight: '700' }}
            />
            <hr
              style={{
                height: '25px',
                borderTop: '2px solid #ececec',
                marginTop: '35px',
              }}
            />
            <AntTab label="Employers/Post job" />
          </AntTabs>
          <Box sx={{ p: 3 }} />
        </Box>
      </Box>
    </div>
  );
};

export default Beforelogin;
