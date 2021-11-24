/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Autocomplete, InputAdornment, TextField } from '@mui/material';

// import './css/SearchInput.css';
import Button from '../../components/Button';

const whatFilter = [
  { title: 'work from home' },
  { title: 'part time' },
  { title: 'hiring immediately' },
  { title: 'remote' },
  { title: 'full time' },
  { title: 'remote work from home' },
  { title: 'warehouse' },
  { title: 'amazon' },
  { title: 'receptionist' },
  { title: 'walmart' },
];

const whereFilter = [
  { title: 'San Jose, CA' },
  { title: 'San Francisco, CA' },
  { title: 'Sunnyvale, CA' },
  { title: 'Santa Clara, CA' },
  { title: 'Sacramento, CA' },
  { title: 'California' },
  { title: 'Fremont, CA' },
  { title: 'Los Angeles, CA' },
  { title: 'Oakland, CA' },
  { title: 'Las Vegas, NV' },
];

function Search() {
  return (
    <div
      style={{
        height: '130px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '900px',
          justifyContent: 'center',
          margin: '0 auto',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        <Autocomplete
          freeSolo
          disableClearable
          options={whatFilter.map((option) => option.title)}
          sx={{ width: '100%', padding: '5px' }}
          ListboxProps={{
            style: {
              maxHeight: '550px',
              borderColor: '#2557a7',
              borderWidth: '10px',
            },
          }}
          renderInput={(params) => (
            <TextField
              sx={{ boxShadow: 3 }}
              {...params}
              InputProps={{
                ...params.InputProps,
                type: 'search',
                startAdornment: (
                  <InputAdornment position="start">
                    <p
                      style={{
                        fontWeight: 'bold',
                        color: 'black',
                        fontSize: '14px',
                        padding: '6px',
                      }}
                    >
                      {' '}
                      What
                    </p>
                  </InputAdornment>
                ),
                endAdornment: (
                  <div style={{ marginRight: '15px', marginTop: '5px' }}>
                    <SearchIcon fontSize="10px" />
                  </div>
                ),
              }}
              size="small"
              variant="outlined"
              placeholder="Job title, keywords, or company"
            />
          )}
        />
        <Autocomplete
          freeSolo
          disableClearable
          options={whereFilter.map((option) => option.title)}
          sx={{ width: '100%', padding: '5px', marginLeft: '5px' }}
          ListboxProps={{ style: { maxHeight: '550px' } }}
          renderInput={(params) => (
            <TextField
              sx={{ boxShadow: 3 }}
              {...params}
              InputProps={{
                ...params.InputProps,
                type: 'search',
                startAdornment: (
                  <InputAdornment position="start">
                    <p
                      style={{
                        fontWeight: 'bold',
                        color: 'black',
                        fontSize: '14px',
                        padding: '6px',
                      }}
                    >
                      {' '}
                      Where
                    </p>
                  </InputAdornment>
                ),
                endAdornment: (
                  <div style={{ marginRight: '15px', marginTop: '5px' }}>
                    <LocationOnIcon fontSize="10px" />
                  </div>
                ),
              }}
              size="small"
              variant="outlined"
              placeholder="City, state, zip code or remote"
            />
          )}
        />
        <Button
          label="Find jobs"
          type="button"
          style={{
            width: '200px',
            height: '45px',
            marginLeft: '10px',
            marginTop: '5px',
            fontSize: '14px',
          }}
        />
      </div>
      <span style={{ marginTop: '30px' }}>
        <a href>Employers: post a job</a> - your next hire is here
      </span>
    </div>
  );
}

export default Search;
