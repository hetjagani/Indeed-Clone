/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { useSelector } from 'react-redux';
import Switch from '@mui/material/Switch';
import { createReactEditorJS } from 'react-editor-js';
import List from '@editorjs/list';
import Header from '@editorjs/header';
import JobSVG from '../../components/svg/JobSVG';
import './css/Employeedetails.css';
import postJob from '../../api/jobs/postJob';

const ReactEditorJS = createReactEditorJS();

const EDITOR_JS_TOOLS = {
  list: List,
  header: Header,
};

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

const Jobpost = ({ handleClose, getCompanyJobs }) => {
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
  const [isFeatured, setIsFeatured] = useState(false);
  const [type, setType] = useState({
    internship: true,
    fullTime: true,
    contract: true,
  });
  const [salary, setSalary] = useState(0);
  const [summary, setSummary] = useState('');
  const [questions, setQuestions] = useState('');

  const user = useSelector((state) => state.user);

  function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${month}/${day}/${year}`;
  }

  const editorJS = React.useRef(null);
  const handleInitialize = React.useCallback((instance) => {
    editorJS.current = instance;
  }, []);
  const handleSave = async () => {
    const savedData = await editorJS.current.save();
    return savedData;
  };

  const saveJobDetails = async (e) => {
    e.preventDefault();
    let loc = '';
    let tempType = '';
    if (jobLocation.remote === true) {
      loc = 'remote';
    } else {
      loc = 'in_person';
    }
    if (type.internship === true) {
      tempType = 'internship';
    } else if (type.fullTime === true) {
      tempType = 'full_time';
    } else {
      tempType = 'contract';
    }

    const postedOn = getFormattedDate(new Date());
    const questionsArr = questions.split(',');
    const descriptionObj = await handleSave();

    const body = {
      title,
      jobLocation: loc,
      city,
      country,
      zipcode,
      state: region,
      industry: { name: industry },
      postedOn,
      description: descriptionObj,
      address,
      isFeatured,
      type: tempType,
      salary,
      summary: [summary],
      questions: questionsArr,
    };
    console.log(body);

    await postJob(body, user.company._id);
    handleClose();
    getCompanyJobs();
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
            width: '80%',
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
          <div
            style={{ width: '350px', height: '180px', paddingBottom: '20px' }}
          >
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
            width: '80%',
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
              <label className="employeeLabel">Industry</label>
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
            <div>
              <label className="employeeLabel">
                Job is featured?
                <span
                  style={{
                    paddingLeft: '5px',
                    marginRight: '10px',
                    color: 'red',
                  }}
                >
                  *
                </span>
              </label>
              <Switch
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
              />
            </div>
            <div className="employeeform" style={{ marginTop: '20px' }}>
              <label className="employeeLabel">
                Job type
                <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
              </label>
              <RadioGroup
                aria-label="job type"
                name="radio-buttons-group"
                sx={{ marginTop: '10px' }}
              >
                <div className="companyradiodiv">
                  <FormControlLabel
                    value="internship"
                    control={<Radio />}
                    onChange={(event) => setType({
                      internship: event.target.checked,
                      fullTime: !event.target.checked,
                      contract: !event.target.checked,
                    })}
                    label="Internship"
                  />
                </div>
                <div className="companyradiodiv">
                  <FormControlLabel
                    value="full_time"
                    control={<Radio />}
                    onChange={(event) => setType({
                      internship: !event.target.checked,
                      fullTime: event.target.checked,
                      contract: !event.target.checked,
                    })}
                    label="Full Time"
                  />
                </div>
                <div className="companyradiodiv">
                  <FormControlLabel
                    value="contract"
                    control={<Radio />}
                    onChange={(event) => setType({
                      internship: !event.target.checked,
                      fullTime: !event.target.checked,
                      contract: event.target.checked,
                    })}
                    label="Contract"
                  />
                </div>
              </RadioGroup>
            </div>
            <div className="employeeform">
              <label className="employeeLabel">
                Salary
                <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
              </label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
                className="employeeInput"
              />
            </div>
            <div className="employeeform">
              <label className="employeeLabel">
                Summary
                <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
                className="employeeInput"
              />
            </div>
            <div className="employeeform">
              <label className="employeeLabel">
                Job Description
                <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
              </label>
              <ReactEditorJS
                onInitialize={handleInitialize}
                tools={EDITOR_JS_TOOLS}
              />
            </div>
            <div className="employeeform">
              <label className="employeeLabel">
                Questions for candidates (comma separated)
                <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
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
            justifyContent: 'flex-end',
            backgroundColor: 'white',
            borderRadius: '1rem',
            width: '69%',
            padding: '3rem',
            marginTop: '2rem',
          }}
        >
          <div>
            <button
              type="submit"
              className="employeeButton"
              onClick={saveJobDetails}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Jobpost;
