/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { useHistory } from 'react-router';

import JobSVG from '../../components/svg/JobSVG';
import './css/Employeedetails.css';

const Jobdescription = () => {
  const history = useHistory();
  const [description, setDescription] = useState('');
  const [postedOn, setPostedOn] = useState('');
  const [summary, setSummary] = useState('');
  const [salary, setSalary] = useState('');
  const [type, setType] = useState({
    contract: false,
    fullTime: false,
    internship: false,
  });
  console.log(type);
  const backtojob = () => {
    history.push('/jobpost');
  };
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
              Describe the job
            </span>
          </div>
          <div style={{ width: '350px', height: '180px', paddingBottom: '20px' }}>
            <JobSVG style={{ width: '350px', height: '180px' }} />
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
                Description
                <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="employeeInput"
              />
            </div>
            <div className="employeeform">
              <label className="employeeLabel">Summary</label>
              <input
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
                className="employeeInput"
              />
            </div>
            <div className="employeeform">
              <label className="employeeLabel">Salary</label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
                className="employeeInput"
              />
            </div>
            <div className="employeeform">
              <label className="employeeLabel">Type</label>
              <RadioGroup aria-label="Type" name="radio-buttons-group">
                <div className="companyradiodiv">
                  <FormControlLabel
                    value="Contract"
                    control={<Radio />}
                    onChange={(event) => setType({
                      contract: event.target.checked,
                      fullTime: !event.target.checked,
                      internship: !event.target.checked,

                    })}
                    label="Contract"
                  />
                </div>
                <div className="companyradiodiv">
                  <FormControlLabel
                    value="Full Time"
                    control={<Radio />}
                    label="Full Time"
                    onChange={(event) => setType({
                      contract: !event.target.checked,
                      fullTime: event.target.checked,
                      internship: !event.target.checked,
                    })}
                  />
                </div>
                <div className="companyradiodiv">
                  <FormControlLabel
                    value="Internship"
                    control={<Radio />}
                    label="Internship"
                    onChange={(event) => setType({
                      contract: !event.target.checked,
                      fullTime: !event.target.checked,
                      internship: event.target.checked,
                    })}
                  />
                </div>
              </RadioGroup>
            </div>
            <div className="employeeform">
              <label className="employeeLabel">
                Posted On
                <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
              </label>
              <input
                type="date"
                value={postedOn}
                onChange={(e) => setPostedOn(e.target.value)}
                required
                className="employeeInput"
              />
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
            <button disabled className="employeeBack" onClick={backtojob}>back</button>
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

export default Jobdescription;
