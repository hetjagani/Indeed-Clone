/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { useHistory } from 'react-router';

import EmployeSVG from '../../components/svg/EmployeSVG';
import './css/Employeedetails.css';
import postJob from '../../api/jobs/postJob';

const industries = [
  {
    value: 'Business Operations & Management',
    label: 'Business Operations & Management',
  },
  {
    value: 'Construction',
    label: 'Construction',
  },
  {
    value: 'Education',
    label: 'Education',
  },
  {
    value: 'Finance & Accounting',
    label: 'Finance & Accounting',
  },
  {
    value: 'Food & Beverage',
    label: 'Food & Beverage',
  },
  {
    value: 'Healthcare',
    label: 'Healthcare',
  },
  {
    value: 'Manufacturing & Utilities',
    label: 'Manufacturing & Utilities',
  },
  {
    value: 'Marketing, Advertising & Public Relations',
    label: 'Marketing, Advertising & Public Relations',
  },
  {
    value: 'Sales & Retail',
    label: 'Sales & Retail',
  },
  {
    value: 'Technology',
    label: 'Technology',
  },
  {
    value: 'Transportation',
    label: 'Transportation',
  },
];

const Jobpost = () => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [city, setCity] = useState('');
  const [jobLocation, setJobLocation] = useState({
    remote: true,
    onsite: true,
  });

  const saveJobDetails = async () => {
    const date = new Date();
    let loc = '';
    if (jobLocation.remote === true) {
      loc = 'remote';
    } else {
      loc = 'onsite';
    }
    const body = {
      title,
      jobLocation: loc,
      city,
      country,
      zipcode,
      state: region,
      industry: { name: industry },
      postedOn: date,
      description: {},
      address,
    };

    console.log('body', body);
    await postJob(body);
    history.push('/jobDescription');
  };
  console.log(jobLocation);
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
            width: '50%',
          }}
        >
          <div style={{ minWidth: '0px', width: '100%', paddingLeft: '40px' }}>
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
              Post a Job
            </span>
          </div>
          <div style={{ width: '350px', height: '180px', paddingBottom: '20px' }}>
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
            width: '50%',
          }}
        >
          <div
            style={{
              paddingLeft: '3rem',
              paddingRight: '3rem',
              paddingBottom: '1rem',
              paddingTop: '3rem',
            }}
          >
            <div className="employeeform">
              <label className="employeeLabel">
                Job title
                <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="employeeInput"
              />
            </div>
            <div className="employeeform">
              <label className="employeeLabel">
                Industry
              </label>
              <select
                className="employeeInput"
                select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                style={{
                  height: '48px',
                  border: '1px solid black',
                  fontSize: '16px',
                }}
              >
                {industries.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="employeeform">
              <label className="employeeLabel">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="employeeInput"
              />
            </div>
            <div className="employeeform">
              <label className="employeeLabel">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="employeeInput"
              />
            </div>
            <div className="employeeform">
              <label className="employeeLabel">Country</label>
              <CountryDropdown
                value={country}
                onChange={(val) => setCountry(val)}
                className="employeeInput"
                style={{
                  height: '48px',
                  border: '1px solid black',
                  fontSize: '16px',
                }}
              />
              {' '}
            </div>
            <div className="employeeform">
              <label className="employeeLabel">State</label>
              <RegionDropdown
                country={country}
                value={region}
                onChange={(val) => setRegion(val)}
                className="employeeInput"
                style={{
                  height: '48px',
                  border: '1px solid black',
                  fontSize: '16px',
                }}
              />
            </div>
            <div className="employeeform">
              <label className="employeeLabel">
                Zipcode
                <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                required
                className="employeeInput"
              />
            </div>
            <div className="employeeform">
              <label className="employeeLabel">
                Job Location
                <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
              </label>
              <RadioGroup aria-label="job location" name="radio-buttons-group">
                <div className="companyradiodiv">
                  <FormControlLabel
                    value="Remote"
                    control={<Radio />}
                    onChange={(event) => setJobLocation({
                      remote: event.target.checked,
                      onsite: !event.target.checked,
                    })}
                    label="Remote"
                  />
                </div>
                <div className="companyradiodiv">
                  <FormControlLabel
                    value="Onsite"
                    control={<Radio />}
                    label="Onsite"
                    onChange={(event) => setJobLocation({
                      remote: !event.target.checked,
                      onsite: event.target.checked,
                    })}
                  />
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            borderRadius: '1rem',
            width: '43%',
            padding: '3rem',
            marginTop: '2rem',
          }}
        >
          <div>
            <button type="submit" disabled className="employeeBack">back</button>
          </div>
          <div>
            <button type="submit" className="employeeButton" onClick={saveJobDetails}>
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </form>

  );
};

export default Jobpost;
