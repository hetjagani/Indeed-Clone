import {
  Autocomplete, FormControl, MenuItem, Select, TextField, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSalary } from '../../../app/actions';

const cities = [
  { title: 'Fremont, California' },
  { title: 'Las Vegas, Nevada' },
  { title: 'Los Angeles, California' },
  { title: 'Oakland, California' },
  { title: 'San Francisco, California' },
  { title: 'Sacramento, California' },
  { title: 'San Jose, California' },
  { title: 'Santa Clara, California' },
  { title: 'Sunnyvale, California' },
];

function ModalDetailsPage1({ setGotoNextFlag }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [currentlyWorking, setCurrentlyWorking] = useState(true);
  const [endDate, setEndDate] = useState(2021);
  const [jobLocation, setJobLocation] = useState('');
  const [industry, setIndustry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // do form submit API call here
    setGotoNextFlag(true);
    const date = `01/01/${endDate}`;
    dispatch(addSalary({
      title,
      name,
      currentlyWorking,
      endDate: date,
      jobLocation,
      industry,
    }));
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <Typography
          style={{
            marginTop: '15px',
            fontWeight: 'bold',
            fontSize: '1.25em',
            lineHeight: '1.25',
          }}
        >
          Can you tell us about yourself?
        </Typography>
        <Typography
          style={{
            marginTop: '5px',
            fontSize: '0.87em',
            lineHeight: '1.25',
            marginBottom: '0.5rem',
            color: 'rgb(89, 89, 89)',
          }}
        >
          Let’s start building your report with basics, like your job
          title, location and company.
        </Typography>
      </div>
      <hr style={{ marginTop: '15px' }} />

      <div>
        <form onSubmit={handleSubmit}>
          <p style={{ fontWeight: 'bold', color: 'rgb(45, 45, 45)' }}>
            What&apos;s your company name?
            {' '}
            <span style={{ color: '#db183f' }}>*</span>
          </p>
          <TextField
            sx={{ width: '550px' }}
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <p style={{ fontWeight: 'bold', color: 'rgb(45, 45, 45)' }}>
            Are you currently working at this company?
          </p>
          <div
            style={{
              borderRadius: '30px',
              width: '300px',
              overflow: 'visible',
            }}
          >
            <button
              onClick={() => setCurrentlyWorking(true)}
              className={`ceoButtonHover ${
                currentlyWorking ? 'ceoButtonOnSelect' : ''
              }`}
              type="button"
              style={{
                borderRadius: '15px',
                width: '120px',
                height: '50px',
                fontWeight: 'bold',
                fontSize: 'medium',
              }}
            >
              Yes
            </button>
            <button
              onClick={() => setCurrentlyWorking(false)}
              className={`ceoButtonHover ${
                !currentlyWorking ? 'ceoButtonOnSelect' : ''
              }`}
              type="button"
              style={{
                borderTopRightRadius: '15px',
                borderBottomRightRadius: '15px',
                width: '100px',
                height: '50px',
                marginLeft: '-25px',
                fontWeight: 'bold',
                fontSize: 'medium',
              }}
            >
              No
            </button>
          </div>

          {!currentlyWorking ? (
            <>
              <p style={{ fontWeight: 'bold', color: 'rgb(45, 45, 45)' }}>
                End date
              </p>
              <FormControl variant="standard">
                <Select
                  disableUnderline
                  sx={{
                    width: '550px',
                    height: '100%',
                    padding: '5px',
                    border: '1px solid #2557a7',
                    borderRadius: '10px',
                    borderBottom: '4px solid #2557a7',
                  }}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                >
                  {Array.range(1981, 2022).map((ele) => (
                    <MenuItem value={ele}>{ele}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : null}

          <p style={{ fontWeight: 'bold', color: 'rgb(45, 45, 45)' }}>
            What&apos;s your job title?
            {' '}
            <span style={{ color: '#db183f' }}>*</span>
          </p>
          <TextField
            sx={{ width: '550px' }}
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <p style={{ fontWeight: 'bold', color: 'rgb(45, 45, 45)' }}>
            What&apos;s your job Industry?
            {' '}
            <span style={{ color: '#db183f' }}>*</span>
          </p>
          <TextField
            sx={{ width: '550px' }}
            required
            value={industry}
            onChange={(event) => setIndustry(event.target.value)}
          />

          <p style={{ fontWeight: 'bold', color: 'rgb(45, 45, 45)' }}>
            What&apos;s your job location?
            {' '}
            <span style={{ color: '#db183f' }}>*</span>
          </p>
          <Autocomplete
            value={jobLocation}
            onChange={(_, newValue) => {
              setJobLocation(newValue);
            }}
            freeSolo
            options={cities.map((option) => option.title)}
            sx={{ width: '550px' }}
            disableClearable
            renderInput={(params) => (
              <TextField
                onChange={(e) => setJobLocation(e.target.value)}
                value={jobLocation}
                {...params}
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
                size="small"
                placeholder="City, state"
              />
            )}
          />

          <hr style={{ marginTop: '35px' }} />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#2557a7',
                border: 0,
                color: 'white',
                marginTop: '25px',
                borderRadius: '10px',
                width: '245px',
                height: '60px',
                fontWeight: 'bold',
                fontSize: 'large',
              }}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalDetailsPage1;
