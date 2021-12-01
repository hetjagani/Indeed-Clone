/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import {
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router';
import ValuesSVG from '../../components/svg/ValuesSVG';
import './css/Employeedetails.css';

const Input = styled('input')({
  display: 'none',
});

const CompanyValues = () => {
  const history = useHistory();
  const [workCulture, setWorkCulture] = useState({
    Learning: false,
    Caring: false,
    Purpose: false,
    Enjoyment: false,
    Results: false,
    Authority: false,
    Respect: false,
    Safety: false,
  });
  const [value, setValue] = useState({
    Trust: false,
    Loyalty: false,
    Ingenuity: false,
    Honesty: false,
    Accounting: false,
    Simplicity: false,
    Respect: false,
    ValueCentricity: false,
  });
  const [description, setDescription] = useState('');
  const [mission, setMission] = useState('');
  const [about, setAbout] = useState('');
  const backtoprofile = () => {
    history.push('/company');
  };
  console.log(value, workCulture);
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
              Include Company details
            </span>
          </div>
          <div style={{ width: '350px', height: '180px', paddingBottom: '20px' }}>
            <ValuesSVG style={{ width: '350px', height: '180px' }} />
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
              You haven&apos;t posted a job before, please tell about your company.
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
                Mission
                <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                required
                className="employeeInput"
              />
            </div>
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
              <label className="employeeLabel">
                About
                <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                required
                className="employeeInput"
              />
            </div>
            <div className="employeeform">
              <label className="employeeLabel">
                Values
                <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
              </label>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem ' }}>
                  <div className="companyradiodiv">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Loyalty"
                      onChange={
                  (event) => setValue(
                    {
                      Loyalty: event.target.checked,
                    },
                  )
                }
                    />
                  </div>
                  <div className="companyradiodiv">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Honesty"
                      onChange={
                  (event) => setValue(
                    {
                      Honesty: event.target.checked,
                    },
                  )
                }
                    />
                  </div>
                  <div className="companyradiodiv">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Trust"
                      onChange={
                  (event) => setValue(
                    {
                      Trust: event.target.checked,
                    },
                  )
                }
                    />
                  </div>
                  <div className="companyradiodiv">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Ingenuity"
                      onChange={
                  (event) => setValue(
                    {
                      Ingenuity: event.target.checked,
                    },
                  )
                }
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
                  <div className="companyradiodiv">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Accountability"
                      onChange={
                  (event) => setValue(
                    {
                      Accountability: event.target.checked,
                    },
                  )
                }
                    />
                  </div>
                  <div className="companyradiodiv">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Simplicity"
                      onChange={
                  (event) => setValue(
                    {
                      Simplicity: event.target.checked,
                    },
                  )
                }
                    />
                  </div>
                  <div className="companyradiodiv">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Respect"
                      onChange={
                  (event) => setValue(
                    {
                      Respect: event.target.checked,
                    },
                  )
                }
                    />
                  </div>
                  <div className="companyradiodiv">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Value-centricity"
                      onChange={
                  (event) => setValue(
                    {
                      ValueCentricity: event.target.checked,
                    },
                  )
                }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="employeeform">
              <label className="employeeLabel">
                Work Culture
                <span style={{ paddingLeft: '5px', color: 'red' }}>*</span>
              </label>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem ' }}>
                  <div className="companyradiodiv">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Learning"
                      onChange={
                  (event) => setWorkCulture(
                    {
                      Learning: event.target.checked,
                    },
                  )
                }
                    />
                  </div>
                  <div className="companyradiodiv">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Caring"
                      onChange={
                  (event) => setWorkCulture(
                    {
                      Caring: event.target.checked,
                    },
                  )
                }
                    />
                  </div>
                  <div className="companyradiodiv">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Purpose"
                      onChange={
                  (event) => setWorkCulture(
                    {
                      Purpose: event.target.checked,
                    },
                  )
                }
                    />
                  </div>
                  <div className="companyradiodiv">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Enjoyment"
                      onChange={
                  (event) => setWorkCulture(
                    {
                      Enjoyment: event.target.checked,
                    },
                  )
                }
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
                  <div className="companyradiodiv">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Results"
                      onChange={
                  (event) => setWorkCulture(
                    {
                      Results: event.target.checked,
                    },
                  )
                }
                    />
                  </div>
                  <div className="companyradiodiv">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Authority"
                      onChange={
                  (event) => setWorkCulture(
                    {
                      Authority: event.target.checked,
                    },
                  )
                }
                    />
                  </div>
                  <div className="companyradiodiv">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Respect"
                      onChange={
                  (event) => setWorkCulture(
                    {
                      Respect: event.target.checked,
                    },
                  )
                }
                    />
                  </div>
                  <div className="companyradiodiv">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Safety"
                      onChange={
                  (event) => setWorkCulture(
                    {
                      Safety: event.target.checked,
                    },
                  )
                }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'left',
          backgroundColor: 'white',
          borderRadius: '1rem',
          width: '43%',
          padding: '3rem',
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
              <Input accept="image/*" id="contained-button-file" multiple type="file" />
              <Button
                variant="contained"
                component="span"
                style={{
                  width: '160px', height: '44px', color: '#2557a7', fontWeight: '700', backgroundColor: '#f2f2f2', border: '#949494',
                }}
              >
                Add Photo
              </Button>
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
            padding: '3rem',
            marginTop: '2rem',
          }}
        >
          <div>
            <button className="employeeBack" onClick={backtoprofile}>back</button>
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

export default CompanyValues;
