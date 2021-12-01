/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import EmployeSVG from '../../components/svg/EmployeSVG';
import './css/Employeedetails.css';
import CustomAutocomplete from '../../components/CustomAutocomplete';

const Input = styled('input')({
  display: 'none',
});

const roles = [
  {
    title: 'Human Resoures Generalist',
  },
  {
    title: 'Assistan or Office Manager',
  },
  {
    title: 'Owner or CEO',
  },
  {
    title: 'Recruiter',
  },
  {
    title: 'Other',
  },
];

const Employeedetails = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [otherRole, setOtherRole] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [companyName, setCompanyName] = useState('');
  return (
    <form>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f2f2f2',
          minHeight: '100vh',
          paddingTop: '30px',
          paddingBottom: '50px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: '1rem',
            maxWidth: '50%',
          }}
        >
          <div
            style={{
              minWidth: '0px',
              width: '100%',
              paddingRight: '3.8rem',
              paddingLeft: '3.8rem',
            }}
          >
            <span
              style={{
                fontWeight: '700',
                color: 'rgb(45, 45, 45)',
                fontFamily:
                  '"Noto Sans", "Helvetica Neue", Helvetica, Arial, "Liberation Sans", Roboto, Noto, sans-serif',
                lineHeight: '1.25',
                fontSize: '1.75rem',
              }}
            >
              Create an employer account
            </span>
          </div>
          <div
            style={{ width: '350px', height: '180px', paddingBottom: '20px' }}
          >
            <EmployeSVG style={{ width: '350px', height: '180px' }} />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            borderRadius: '1rem',
            marginTop: '2rem',
            maxWidth: '50%',
          }}
        >
          <div
            style={{
              paddingLeft: '3rem',
              paddingRight: '3rem',
              paddingTop: '3rem',
              paddingBottom: '1.5rem',
            }}
          >
            <span
              style={{
                fontWeight: '700',
                color: 'rgb(45, 45, 45)',
                fontFamily:
                  '"Noto Sans", "Helvetica Neue", Helvetica, Arial, "Liberation Sans", Roboto, Noto, sans-serif',
                lineHeight: '1.5',
                fontSize: '1.25rem',
              }}
            >
              You haven&apos;t posted a job before, so you&apos;ll need to
              create an employer account.
            </span>
          </div>
          <div
            style={{
              paddingLeft: '3rem',
              paddingRight: '3rem',
              paddingBottom: '1rem',
            }}
          >
            <div className="employeeform">
              <label className="employeeLabel">
                Your first and last name
                <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="employeeInput"
              />
            </div>
            <div className="employeeform">
              <label className="employeeLabel">
                Your role in hiring process
              </label>
              <CustomAutocomplete
                sx={{
                  width: '100%',
                  marginTop: '10px',
                }}
                placeholder="Select an option"
                value={role}
                setValue={setRole}
                options={roles}
                endAdornmentIcon={(
                  <div style={{ marginRight: '15px', marginTop: '-10px' }}>
                    <ArrowDropDownIcon fontSize="10px" />
                  </div>
            )}
              />
            </div>
            {role === 'Other'
              ? (
                <div className="employeeform">
                  <input
                    placeholder="Enter role"
                    type="text"
                    value={otherRole}
                    onChange={(e) => setOtherRole(e.target.value)}
                    required
                    className="employeeInput"
                  />
                </div>
              ) : null}
            <div className="employeeform">
              <label className="employeeLabel">Your address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="employeeInput"
              />
            </div>
            <div className="employeeform">
              <label className="employeeLabel">
                Your Date of Birth
                <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
              </label>
              <input
                style={{ paddingLeft: '10px', paddingRight: '10px' }}
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                className="employeeInput"
              />
            </div>
            <div className="employeeform">
              <label className="employeeLabel">
                Your Company name
                <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="employeeInput"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'left',
            backgroundColor: 'white',
            borderRadius: '1rem',
            width: '43%',
            padding: '3.75rem',
            marginTop: '2rem',
          }}
        >
          <div style={{
            width: '100%', paddingBottom: '1rem', display: 'flex', flexDirection: 'column',
          }}
          >
            <span className="employeeLabel">Add Photo</span>
            <span style={{ paddingTop: '0.5rem', color: 'rgb(89, 89, 89)', fontSize: '14px' }}>Give an inside look at working at your company by adding photos to your post</span>
          </div>
          <Stack direction="row" alignItems="center" spacing={2}>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
              />
              <button
                className="employeeBack"
                style={{ width: '165px', height: '44px' }}
              >
                Add photo
              </button>
            </label>
          </Stack>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            borderRadius: '1rem',
            width: '43%',
            padding: '3.75rem',
            marginTop: '2rem',
          }}
        >
          <div>
            <button disabled className="employeeBack">
              back
            </button>
          </div>
          <div>
            <button type="submit" className="employeeButton">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Employeedetails;
