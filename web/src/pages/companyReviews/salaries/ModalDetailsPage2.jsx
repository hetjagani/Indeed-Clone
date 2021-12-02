/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import addNewSalary from '../../../api/salary/addNewSalary';

function ModalDetailsPage2({ compId, handleClose }) {
  const user = useSelector((state) => state.user);
  const [experience, setExperience] = useState(2021);
  const [salary, setSalary] = useState('');
  const [benefits, setBenefits] = useState({
    paidTimeOff: false,
    healthInsurance: false,
    lifeInsurance: false,
    dentalInsurance: false,
    retirement: false,
    other: false,
    otherBenefits: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const benefit = [];
    Object.entries(benefits).map(([key, value]) => (value === true ? benefit.push(key) : null));
    const industry = {};
    industry.name = user.salary.industry;

    const sendData = {
      title: user.salary.title,
      name: user.salary.name,
      currentlyWorking: user.salary.currentlyWorking,
      endDate: user.salary.endDate,
      jobLocation: user.salary.jobLocation,
      experience: experience.toString(),
      salary,
      benefits: benefit,
      industry,
      companyId: compId,
    };

    await addNewSalary(sendData, user.user.id);
    handleClose();
  };

  return (
    <>
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
          Pay and benefits
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
          Your anonymous pay will help other job seekers.
        </Typography>
      </div>
      <hr style={{ marginTop: '15px' }} />

      <div>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex' }}>
            <div>
              <p style={{ fontWeight: 'bold', color: 'rgb(45, 45, 45)' }}>
                What&apos;s your pay at XYZ?
                {' '}
                <span style={{ color: '#db183f' }}>*</span>
              </p>
              <TextField
                inputProps={{ style: { marginLeft: '20px' } }}
                InputProps={{
                  startAdornment: '$',
                  style: { fontWeight: 'bold' },
                }}
                sx={{ width: '550px' }}
                required
                type="number"
                onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                value={salary}
                onChange={(event) => setSalary(event.target.value)}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <FormControl variant="standard">
                <Select
                  disabled
                  disableUnderline
                  sx={{
                    width: '110%',
                    height: '56px',
                    padding: '5px',
                    border: '1px solid #2557a7',
                    borderRadius: '10px',
                    borderBottom: '4px solid #2557a7',
                  }}
                  value="per year"
                >
                  <MenuItem value="per year">per year</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <p style={{ fontWeight: 'bold', color: 'rgb(45, 45, 45)' }}>
            How many years of relevant experience do you have?
            {' '}
            <span style={{ color: '#db183f' }}>*</span>
          </p>
          <TextField
            type="number"
            onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
            sx={{ width: '550px' }}
            required
            value={experience}
            onChange={(event) => setExperience(event.target.value)}
          />

          <p style={{ fontWeight: 'bold', color: 'rgb(45, 45, 45)' }}>
            Which benefits did you receive at asd?
            {' '}
            <span style={{ color: '#db183f' }}>*</span>
          </p>
          <div
            style={{
              marginLeft: '10px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <FormControlLabel
              label="Paid time off"
              sx={{ marginTop: '10px' }}
              control={(
                <Checkbox
                  value={benefits.paidTimeOff}
                  onChange={(event) => setBenefits({
                    ...benefits,
                    paidTimeOff: event.target.checked,
                  })}
                  sx={{
                    padding: 0,
                    marginRight: '10px',
                    '& .MuiSvgIcon-root': { fontSize: 28 },
                    '&.Mui-checked': {
                      color: '#2557a7',
                    },
                  }}
                />
              )}
            />
            <FormControlLabel
              label="Health insurance"
              sx={{ marginTop: '10px' }}
              control={(
                <Checkbox
                  value={benefits.healthInsurance}
                  onChange={(event) => setBenefits({
                    ...benefits,
                    healthInsurance: event.target.checked,
                  })}
                  sx={{
                    padding: 0,
                    marginRight: '10px',
                    '& .MuiSvgIcon-root': { fontSize: 28 },
                    '&.Mui-checked': {
                      color: '#2557a7',
                    },
                  }}
                />
              )}
            />
            <FormControlLabel
              label="Life insurance"
              sx={{ marginTop: '10px' }}
              control={(
                <Checkbox
                  value={benefits.lifeInsurance}
                  onChange={(event) => setBenefits({
                    ...benefits,
                    lifeInsurance: event.target.checked,
                  })}
                  sx={{
                    padding: 0,
                    marginRight: '10px',
                    '& .MuiSvgIcon-root': { fontSize: 28 },
                    '&.Mui-checked': {
                      color: '#2557a7',
                    },
                  }}
                />
              )}
            />
            <FormControlLabel
              label="Dental/vision insurance"
              sx={{ marginTop: '10px' }}
              control={(
                <Checkbox
                  value={benefits.dentalInsurance}
                  onChange={(event) => setBenefits({
                    ...benefits,
                    dentalInsurance: event.target.checked,
                  })}
                  sx={{
                    padding: 0,
                    marginRight: '10px',
                    '& .MuiSvgIcon-root': { fontSize: 28 },
                    '&.Mui-checked': {
                      color: '#2557a7',
                    },
                  }}
                />
              )}
            />
            <FormControlLabel
              label="Retirement / 401(k)"
              sx={{ marginTop: '10px' }}
              control={(
                <Checkbox
                  value={benefits.retirement}
                  onChange={(event) => setBenefits({
                    ...benefits,
                    retirement: event.target.checked,
                  })}
                  sx={{
                    padding: 0,
                    marginRight: '10px',
                    '& .MuiSvgIcon-root': { fontSize: 28 },
                    '&.Mui-checked': {
                      color: '#2557a7',
                    },
                  }}
                />
              )}
            />
            <FormControlLabel
              label="Other benefits"
              sx={{ marginTop: '10px' }}
              control={(
                <Checkbox
                  value={benefits.other}
                  onChange={(event) => setBenefits({
                    ...benefits,
                    other: event.target.checked,
                  })}
                  sx={{
                    padding: 0,
                    marginRight: '10px',
                    '& .MuiSvgIcon-root': { fontSize: 28 },
                    '&.Mui-checked': {
                      color: '#2557a7',
                    },
                  }}
                />
              )}
            />
          </div>

          {benefits.other ? (
            <div>
              <TextField
                multiline
                rows={3}
                sx={{ width: '550px' }}
                required
                value={benefits.otherBenefits}
                onChange={(event) => setBenefits({
                  ...benefits,
                  otherBenefits: event.target.value,
                })}
              />
            </div>
          ) : null}

          <hr style={{ marginTop: '35px' }} />
          {/* <button
            type=""
            onClick={()=>}
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
          </button> */}
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ModalDetailsPage2;
