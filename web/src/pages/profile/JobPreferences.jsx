import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import putUser from '../../api/users/putDetails';
import getUserByID from '../../api/users/getUser';

const JobPreferences = () => {
  const [JobPreference, setJobPreferences] = useState({
    title: 'Software Engineer intern',
    relocation: 'Yes, I am willing to relocate',
    type: 'Full-time',
    schedule: '8 hour shift',
    pay: 0,
    remote: null,
  });

  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [title, setTitle] = useState(true);
  const [relocation, setRelocation] = useState(true);
  const [showMe, setShowMe] = useState(true);
  const [type, setType] = useState(true);
  const [schedule, setSchedule] = useState(true);
  const [pay, setPay] = useState(true);
  const [remote, setRemote] = useState(true);

  const [typee, setTypee] = useState({
    Fulltime: false,
    Parttime: false,
    Contract: false,
    Temporary: false,
    Internship: false,
  });

  const [schedulee, setSchedulee] = useState({
    hr8: false,
    hr10: false,
    hr12: false,
    Dayshift: false,
    Nightshift: false,
  });

  const [remotee, setRemotee] = useState({
    remote: false,
    hybrid: false,
    inperson: false,
    temp: false,
  });

  const handleChangetitle = (event) => {
    setJobPreferences({
      ...JobPreference,
      title: event.target.value,
    });
  };

  const handleChangeReloc = (event) => {
    setJobPreferences({
      ...JobPreference,
      relocation: event.target.checked,
    });
  };
  const handleChangeType = (event) => {
    setJobPreferences({
      ...JobPreference,
      type: event.target.checked,
    });
  };
  const handleChangeSche = (event) => {
    setJobPreferences({
      ...JobPreference,
      schedule: event.target.checked,
    });
  };

  const handleChangePay = (event) => {
    setJobPreferences({
      ...JobPreference,
      pay: event.target.value,
    });
  };

  const handleChangeRemote = (event) => {
    setJobPreferences({
      ...JobPreference,
      remote: event.target.checked,
    });
  };
  const getUserDetails = async () => {
    console.log('user', user.user);
    const userDetails = await getUserByID(user.user.id);
    console.log('details', userDetails);
  };

  const putUserDetails = async () => {
    const body = {
      preferences: JobPreference,
    };
    await putUser(body, user.user.id);
    getUserDetails();
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const titleFunc = () => {
    console.log('here', title);
    setTitle(!title);
  };

  const relocationFunc = () => {
    setRelocation(!relocation);
  };

  const preferences = () => {
    setShowMe(!showMe);
  };

  const typeFunc = () => {
    setType(!type);
  };

  const scheduleFunc = () => {
    setSchedule(!schedule);
  };

  const payFunc = () => {
    setPay(!pay);
  };

  const remoteFunc = () => {
    setRemote(!remote);
  };
  const style = {
    position: 'absolute',
    top: '57%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: '90%',
    overflowY: 'scroll',
    overflowX: 'hidden',
    bgcolor: 'background.paper',

    p: 4,
  };

  return (
    <div>
      <Box sx={style}>
        <ArrowBackIcon
          onClick={() => {
            history.push('./userprofile');
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
              paddingTop: '25px',
            }}
          >
            Job preferences
          </div>
        </div>
        <div
          style={{
            marginLeft: '0px',
            marginTop: ' 8px',
            paddingBottom: '30px',
            fontSize: '1rem',
            fontWeight: '400',
            lineHeight: '1.3em',
            color: '#444444',
          }}
        >
          Update preferences as needed to get better recommendations across
          Indeed.
        </div>
        <hr />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              position: 'absolute',
              top: '29%',
              left: '8%',
              transform: 'translate(-50%, -50%)',
              border: '1px solid rgb(53 130 113) ',
              width: '35px',
              height: '35px',
              borderRadius: '65px',
              borderColor: 'green',
              display: 'flex',
              backgroundColor: 'rgb(53 130 113)',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ marginLeft: '4px' }}>
              {' '}
              <ArrowUpwardIcon style={{ color: 'white' }} />
            </div>
          </div>
          <div
            style={{
              marginLeft: '60px',
              marginTop: ' 15px',
              fontSize: '1.2rem',
              fontFamily:
                'Helvetica Neue,Helvetica,Avenir Next,Arial,Roboto,Noto,sans-serif',
              fontWeight: '700',
              lineHeight: '1.5rem',
            }}
          >
            Interested
          </div>
        </div>
        <div
          style={{
            marginLeft: '60px',
            marginTop: ' 8px',
            paddingBottom: '30px',
            fontSize: '1rem',
            fontWeight: '400',
            lineHeight: '1.3em',
            color: '#444444',
          }}
        >
          We’ll show you more jobs that include these details.
        </div>
        <hr style={{ color: 'grey' }} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ marginLeft: '9px', paddingTop: '20px' }}>
              {' '}
              <PersonIcon style={{ color: 'grey' }} />
            </div>
          </div>
          <div
            style={{
              marginLeft: '29px',
              marginTop: ' 20px',
              fontSize: '1rem',
              fontFamily:
                'Helvetica Neue,Helvetica,Avenir Next,Arial,Roboto,Noto,sans-serif',
              fontWeight: '700',
              lineHeight: '1.5rem',
            }}
          >
            Job Title
          </div>

          <div style={{ marginLeft: '410px', paddingTop: '20px' }}>
            {' '}
            <Button onClick={titleFunc}>
              <EditIcon />
            </Button>
          </div>
        </div>
        {title ? (
          <div
            style={{
              marginLeft: '60px',
              marginTop: ' 8px',
              paddingBottom: '30px',
              fontSize: '1rem',
              fontWeight: '400',
              lineHeight: '1.3em',
            }}
          >
            Software Engineer Intern
          </div>
        ) : (
          <div>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">
                What is your desired job title?
              </FormLabel>
              <br />
              <TextField
                sx={{ width: '95%', height: '50%', fontSize: '0.9em' }}
                value={JobPreference.title}
                onChange={handleChangetitle}
              />
            </FormControl>
            <br />
            <button
              className="reviewSubmitButton"
              type="submit"
              style={{
                marginTop: '15px',
                borderRadius: '6.25rem',
                width: '70px',
                height: '40px',
                fontWeight: 'bold',
                fontColor: 'white',
                backgroundColor: '#085ff7',
                border: '#085ff7',
                cursor: 'pointer',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
                textAlign: 'center',
              }}
              onClick={() => {
                titleFunc();
                putUserDetails();
              }}
            >
              Save
            </button>
            <Button
              type="submit"
              sstyle={{
                marginTop: '15px',
                marginLeft: '20px',
                width: '70px',
                height: '40px',
                fontWeight: 'bold',
                cursor: 'pointer',
                backgroundColor: 'white',
                borderColor: 'white',
              }}
              onClick={titleFunc}
            >
              Cancel
            </Button>
            <br />
            <br />
          </div>
        )}

        <hr style={{ color: 'grey' }} />

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ marginLeft: '9px', paddingTop: '20px' }}>
              {' '}
              <LocationOnIcon style={{ color: 'grey' }} />
            </div>
          </div>
          <div
            style={{
              marginLeft: '28px',
              marginTop: ' 20px',
              fontSize: '1rem',
              fontFamily:
                'Helvetica Neue,Helvetica,Avenir Next,Arial,Roboto,Noto,sans-serif',
              fontWeight: '700',
              lineHeight: '1.5rem',
            }}
          >
            Relocation
          </div>

          <div style={{ marginLeft: '395px', paddingTop: '20px' }}>
            {' '}
            <Button onClick={relocationFunc}>
              <EditIcon />
            </Button>
          </div>
        </div>
        {relocation ? (
          <div
            style={{
              marginLeft: '60px',
              marginTop: ' 8px',
              paddingBottom: '30px',
              fontSize: '1rem',
              fontWeight: '400',
              lineHeight: '1.3em',
            }}
          >
            Willing to relocate anywhere
          </div>
        ) : (
          <div>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">
                Are you willing to relocate anywhere?
              </FormLabel>
              <RadioGroup
                defaultValue="Yes, I,m willing to relocate"
                name="radio-buttons-group"
                onChange={handleChangeReloc}
                value={JobPreference.relocation}
              >
                <FormControlLabel
                  value="Yes, I,m willing to relocate"
                  control={<Radio />}
                  label="Yes, I,m willing to relocate"
                />
                <FormControlLabel
                  value="No, I,m not willing to relocate"
                  control={<Radio />}
                  label="No, I,m not willing to relocate"
                />
              </RadioGroup>
            </FormControl>
            <br />
            <button
              className="reviewSubmitButton"
              type="submit"
              style={{
                marginTop: '15px',
                borderRadius: '6.25rem',
                width: '70px',
                height: '40px',
                fontWeight: 'bold',
                fontColor: 'white',
                backgroundColor: '#085ff7',
                border: '#085ff7',
                cursor: 'pointer',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
                textAlign: 'center',
              }}
              onClick={relocationFunc}
            >
              Save
            </button>
            <Button
              className="reviewSubmitButton"
              type="submit"
              style={{
                marginTop: '15px',
                marginLeft: '20px',
                width: '70px',
                height: '40px',
                fontWeight: 'bold',
                cursor: 'pointer',
                backgroundColor: 'white',
                borderColor: 'white',
              }}
              onClick={relocationFunc}
            >
              Cancel
            </Button>
            <br />
            <br />
          </div>
        )}

        <hr style={{ color: 'grey' }} />

        {showMe ? (
          <Button
            style={{ textTransform: 'none', cusor: 'pointer' }}
            onClick={preferences}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <div style={{ marginLeft: '9px', paddingTop: '20px' }}>
                  {' '}
                  <KeyboardArrowDownIcon style={{ color: 'blue' }} />
                </div>
              </div>
              <div
                style={{
                  marginLeft: '28px',
                  marginTop: ' 20px',
                  fontSize: '1rem',
                  color: 'rgb(8 95 247)',
                  fontFamily:
                    'Helvetica Neue,Helvetica,Avenir Next,Arial,Roboto,Noto,sans-serif',
                  fontWeight: '700',
                  lineHeight: '1.5rem',
                  paddingBottom: '30px',
                  paddingTop: '20px',
                }}
              >
                Add more preferences
              </div>
            </div>
          </Button>
        ) : (
          <div>
            <Button
              style={{ textTransform: 'none', cusor: 'pointer' }}
              onClick={preferences}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ marginLeft: '9px', paddingTop: '20px' }}>
                    {' '}
                    <KeyboardArrowUpIcon style={{ color: 'blue' }} />
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: '28px',
                    marginTop: ' 20px',
                    fontSize: '1rem',
                    color: 'rgb(8 95 247)',
                    fontFamily:
                      'Helvetica Neue,Helvetica,Avenir Next,Arial,Roboto,Noto,sans-serif',
                    fontWeight: '700',
                    lineHeight: '1.5rem',
                    paddingBottom: '30px',
                    paddingTop: '20px',
                  }}
                >
                  Add more preferences
                </div>
              </div>
            </Button>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {type ? (
                <div style={{ display: 'flex' }}>
                  <Button onClick={typeFunc}>
                    {' '}
                    <AddIcon
                      style={{ color: 'rgb(8 95 247)', marginLeft: '20px' }}
                    />
                  </Button>
                  <div
                    style={{
                      marginLeft: '22px',
                      paddingBottom: '30px',
                      paddingTop: '25px',
                    }}
                  >
                    Job types
                  </div>
                </div>
              ) : (
                <div>
                  <FormControl
                    sx={{ m: 3 }}
                    component="fieldset"
                    variant="standard"
                  >
                    <FormLabel component="legend">
                      What are your desired job types?
                    </FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={typee.Fulltime}
                            onChange={handleChangeType}
                            name="Full-time"
                          />
                        )}
                        label="Full-time"
                      />
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={JobPreference.type}
                            onChange={handleChangeType}
                            name="Part-time "
                          />
                        )}
                        label="Part-time"
                      />
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={JobPreference.type}
                            onChange={handleChangeType}
                            name="Contract"
                          />
                        )}
                        label="Contract"
                      />
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={JobPreference.type}
                            onChange={handleChangeType}
                            name="Temporary"
                          />
                        )}
                        label="Temporary"
                      />
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={JobPreference.type}
                            onChange={handleChangeType}
                            name="Internship"
                          />
                        )}
                        label="Internship"
                      />
                    </FormGroup>
                  </FormControl>
                  <br />
                  <button
                    className="reviewSubmitButton"
                    type="submit"
                    style={{
                      marginTop: '15px',
                      borderRadius: '6.25rem',
                      width: '70px',
                      height: '40px',
                      fontWeight: 'bold',
                      fontColor: 'white',
                      backgroundColor: '#085ff7',
                      border: '#085ff7',
                      cursor: 'pointer',
                      paddingLeft: '1.5rem',
                      paddingRight: '1.5rem',
                      textAlign: 'center',
                    }}
                    onClick={typeFunc}
                  >
                    Save
                  </button>
                  <Button
                    className="reviewSubmitButton"
                    type="submit"
                    style={{
                      marginTop: '15px',
                      marginLeft: '20px',
                      width: '70px',
                      height: '40px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      backgroundColor: 'white',
                      borderColor: 'white',
                    }}
                    onClick={typeFunc}
                  >
                    Cancel
                  </Button>
                  <br />
                  <br />
                  <hr />
                  <br />
                </div>
              )}
              {schedule ? (
                <div style={{ display: 'flex' }}>
                  <Button onClick={scheduleFunc}>
                    {' '}
                    <AddIcon
                      style={{ color: 'rgb(8 95 247)', marginLeft: '20px' }}
                    />
                  </Button>
                  <div style={{ marginLeft: '22px', paddingBottom: '30px' }}>
                    {' '}
                    Work schedule
                  </div>
                </div>
              ) : (
                <div>
                  <FormControl
                    sx={{ m: 3 }}
                    component="fieldset"
                    variant="standard"
                  >
                    <FormLabel component="legend">
                      What are your desired work schedules?
                    </FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={JobPreference.schedule}
                            onChange={handleChangeSche}
                            name="8 hour shift"
                          />
                        )}
                        label="8 hour shift"
                      />
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={JobPreference.schedule}
                            onChange={handleChangeSche}
                            name="10 hour shift"
                          />
                        )}
                        label="10 hour shift"
                      />
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={JobPreference.schedule}
                            onChange={handleChangeSche}
                            name="12 hour shift"
                          />
                        )}
                        label="12 hour shift"
                      />
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={JobPreference.schedule}
                            onChange={handleChangeSche}
                            name="Day shift"
                          />
                        )}
                        label="Day shift"
                      />
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={JobPreference.schedule}
                            onChange={handleChangeSche}
                            name="Night shift"
                          />
                        )}
                        label="Night shift"
                      />
                    </FormGroup>
                  </FormControl>
                  <br />
                  <button
                    className="reviewSubmitButton"
                    type="submit"
                    style={{
                      marginTop: '15px',
                      borderRadius: '6.25rem',
                      width: '70px',
                      height: '40px',
                      fontWeight: 'bold',
                      fontColor: 'white',
                      backgroundColor: '#085ff7',
                      border: '#085ff7',
                      cursor: 'pointer',
                      paddingLeft: '1.5rem',
                      paddingRight: '1.5rem',
                      textAlign: 'center',
                    }}
                    onClick={scheduleFunc}
                  >
                    Save
                  </button>
                  <Button
                    className="reviewSubmitButton"
                    type="submit"
                    style={{
                      marginTop: '15px',
                      marginLeft: '20px',
                      width: '70px',
                      height: '40px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      backgroundColor: 'white',
                      borderColor: 'white',
                    }}
                    onClick={scheduleFunc}
                  >
                    Cancel
                  </Button>
                  <br />
                  <br />
                  <hr />
                  <br />
                </div>
              )}
              {pay ? (
                <div style={{ display: 'flex' }}>
                  <Button onClick={payFunc}>
                    {' '}
                    <AddIcon
                      style={{ color: 'rgb(8 95 247)', marginLeft: '20px' }}
                    />
                  </Button>
                  <div style={{ marginLeft: '22px', paddingBottom: '30px' }}>
                    {' '}
                    Pay
                  </div>
                </div>
              ) : (
                <div>
                  <FormControl
                    sx={{ m: 3 }}
                    component="fieldset"
                    variant="standard"
                  >
                    <FormLabel component="legend">
                      What is your desired minimum pay (per hour)?
                    </FormLabel>
                    <br />
                    <TextField
                      sx={{ width: '95%', height: '50%', fontSize: '0.9em' }}
                      label="$"
                      value={JobPreference.pay}
                      onChange={handleChangePay}
                    />
                  </FormControl>
                  <br />
                  <button
                    className="reviewSubmitButton"
                    type="submit"
                    style={{
                      marginTop: '15px',
                      borderRadius: '6.25rem',
                      width: '70px',
                      height: '40px',
                      fontWeight: 'bold',
                      fontColor: 'white',
                      backgroundColor: '#085ff7',
                      border: '#085ff7',
                      cursor: 'pointer',
                      paddingLeft: '1.5rem',
                      paddingRight: '1.5rem',
                      textAlign: 'center',
                    }}
                    onClick={payFunc}
                  >
                    Save
                  </button>
                  <Button
                    className="reviewSubmitButton"
                    type="submit"
                    style={{
                      marginTop: '15px',
                      marginLeft: '20px',
                      width: '70px',
                      height: '40px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      backgroundColor: 'white',
                      borderColor: 'white',
                    }}
                    onClick={payFunc}
                  >
                    Cancel
                  </Button>
                  <br />
                  <br />
                  <hr />
                  <br />
                </div>
              )}
              {remote ? (
                <div style={{ display: 'flex' }}>
                  <Button onClick={remoteFunc}>
                    {' '}
                    <AddIcon
                      style={{ color: 'rgb(8 95 247)', marginLeft: '20px' }}
                    />
                  </Button>
                  <div style={{ marginLeft: '22px', paddingBottom: '30px' }}>
                    {' '}
                    Remote
                  </div>
                </div>
              ) : (
                <div>
                  <FormControl
                    sx={{ m: 3 }}
                    component="fieldset"
                    variant="standard"
                  >
                    <FormLabel component="legend">
                      What is your desired work setting?
                    </FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={JobPreference.remote}
                            onChange={handleChangeRemote}
                            name="Remote"
                          />
                        )}
                        label="Remote"
                      />
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={JobPreference.remote}
                            onChange={handleChangeRemote}
                            name="Hybrid remote"
                          />
                        )}
                        label="Hybrid remote"
                      />
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={JobPreference.remote}
                            onChange={handleChangeRemote}
                            name="In person"
                          />
                        )}
                        label="In person"
                      />
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={JobPreference.remote}
                            onChange={handleChangeRemote}
                            name="Temporarily remote (COVID-19)"
                          />
                        )}
                        label="Temporarily remote (COVID-19)"
                      />
                    </FormGroup>
                  </FormControl>
                  <br />
                  <button
                    className="reviewSubmitButton"
                    type="submit"
                    style={{
                      marginTop: '15px',
                      borderRadius: '6.25rem',
                      width: '70px',
                      height: '40px',
                      fontWeight: 'bold',
                      fontColor: 'white',
                      backgroundColor: '#085ff7',
                      border: '#085ff7',
                      cursor: 'pointer',
                      paddingLeft: '1.5rem',
                      paddingRight: '1.5rem',
                      textAlign: 'center',
                    }}
                    onClick={remoteFunc}
                  >
                    Save
                  </button>
                  <Button
                    className="reviewSubmitButton"
                    type="submit"
                    style={{
                      marginTop: '15px',
                      marginLeft: '20px',
                      width: '70px',
                      height: '40px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      backgroundColor: 'white',
                      borderColor: 'white',
                    }}
                    onClick={remoteFunc}
                  >
                    Cancel
                  </Button>
                  <br />
                  <br />
                  <hr />
                  <br />
                </div>
              )}
            </div>
          </div>
        )}

        <hr style={{ color: 'grey' }} />

        <div style={{ display: 'flex', alignItems: 'center' }}>
          {showMe && title && relocation ? (
            <div
              style={{
                position: 'absolute',
                top: '93%',
                left: '8%',
                transform: 'translate(-50%, -50%)',
                border: '1px solid rgb(177 99 0) ',
                width: '35px',
                height: '35px',
                borderRadius: '65px',
                borderColor: 'rgb(177 99 0)',
                display: 'flex',
                backgroundColor: 'rgb(177 99 0)',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <div style={{ marginLeft: '4px' }}>
                {' '}
                <ArrowDownwardIcon style={{ color: 'white' }} />
              </div>
            </div>
          ) : (
            <div> </div>
            // <div
            //   style={{
            //     position: 'absolute',
            //     top: '117%',
            //     left: '8%',
            //     transform: 'translate(-50%, -50%)',
            //     border: '1px solid rgb(177 99 0) ',
            //     width: '35px',
            //     height: '35px',
            //     borderRadius: '65px',
            //     borderColor: 'rgb(177 99 0)',
            //     display: 'flex',
            //     backgroundColor: 'rgb(177 99 0)',
            //     alignItems: 'center',
            //     textAlign: 'center',
            //   }}
            // >
            //   <div style={{ marginLeft: '4px' }}>
            //     {' '}
            //     <ArrowDownwardIcon style={{ color: 'white' }} />
            //   </div>
            // </div>
          )}
          <div
            style={{
              marginLeft: '60px',
              marginTop: ' 15px',
              fontSize: '1.2rem',
              fontFamily:
                'Helvetica Neue,Helvetica,Avenir Next,Arial,Roboto,Noto,sans-serif',
              fontWeight: '700',
              lineHeight: '1.5rem',
            }}
          >
            Not interested
          </div>
        </div>
        <div
          style={{
            marginLeft: '60px',
            marginTop: ' 8px',
            paddingBottom: '30px',
            fontSize: '1rem',
            fontWeight: '400',
            lineHeight: '1.3em',
            color: '#444444',
          }}
        >
          We’ll show you fewer jobs that include these details.
        </div>

        <div
          style={{
            height: '90px',
            width: '100%',
            backgroundColor: 'rgb(243 242 241)',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: '0.9rem',
              color: 'rgb(89 89 89)',
              lineHeight: '1.5rem',
            }}
          >
            {' '}
            Review and respond to emails and searches to see not interested job
            details here.
          </div>
        </div>

        <div
          style={{
            paddingTop: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            color: 'rgb(89 89 89)',
            lineHeight: '1.5rem',
          }}
        >
          <div> ©2021 Indeed -</div>
          <div style={{ color: 'rgb(8 95 247)', borderBottom: '1px solid' }}>
            {' '}
            Do not sell my personal information
          </div>
        </div>
      </Box>
    </div>
  );
};

export default JobPreferences;
