import Box from '@mui/material/Box';
import React, { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useHistory } from 'react-router-dom';

import ResumeModal from './ResumeModal';

function UserProfile() {
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [showMe, setShowMe] = useState(true);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const [firstName, setFirstName] = useState('Gunjal');
  const [lastName, setLastName] = useState('Gupta');
  const [mobile, setmobile] = useState('(408)-673-7346');
  const [stAddress, setStAddress] = useState('');
  const [city, setCity] = useState('San Jose, CA');
  const [zipcode, setZipcode] = useState('95126');

  const contactInfo = () => {
    setShowMe(!showMe);
    return <div>here</div>;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const style = {
    position: 'absolute',
    top: '57%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: '90%',
    overflowY: 'scroll',
    overflowX: 'hidden',
    bgcolor: 'background.paper',
    p: 4,
  };

  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&:after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div>Nav bar</div>

      <Box sx={style}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              position: 'absolute',
              top: '12%',
              left: '13%',
              transform: 'translate(-50%, -50%)',
              border: '3px #1847cb solid ',
              width: '65px',
              height: '65px',
              borderRadius: '65px',
              borderColor: 'black',
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                marginLeft: '13px',
                fontSize: '1.5rem',
                fontFamily:
                  'Helvetica Neue,Helvetica,Avenir Next,Arial,Roboto,Noto,sans-serif',
                fontWeight: '700',
              }}
            >
              {' '}
              GG
            </div>
          </div>
          <div
            style={{
              marginLeft: '90px',
              marginTop: ' 30px',
              fontSize: '1.5rem',
              fontFamily:
                'Helvetica Neue,Helvetica,Avenir Next,Arial,Roboto,Noto,sans-serif',
              fontWeight: '700',
              lineHeight: '1.5rem',
            }}
          >
            Gunjal Gupta
            <div
              style={{
                marginLeft: '0px',
                marginTop: ' 8px',
                fontSize: '1rem',
                fontWeight: '400',
                lineHeight: '1em',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <LocationOnIcon style={{ color: 'grey' }} />
              San Jose, CA
            </div>
          </div>
        </div>

        <ResumeModal
          handleOpen={handleOpen}
          handleClose={handleClose}
          isOpen={isOpen}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: ' 30px',
            marginBottom: '1rem',
          }}
        >
          <div
            style={{
              borderColor: 'd4d2d0',
              borderRadius: '8px',
              border: '1px #afafaf solid',
              marginBottom: '1rem',
              marginTop: ' 8px',
              marginLeft: '8px',
              width: '100%',
              boxShadow: '0 5px 1px -5px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flexStart',
              justifyContent: 'flex-start',
            }}
          >
            <div
              style={{
                marginLeft: ' 20px',
                marginTop: ' 8px',
                fontWeight: '700',
              }}
            >
              Resume
            </div>
            <div
              style={{
                display: 'flex',
                marginLeft: ' 20px',
                marginTop: ' 8px',
                marginBottom: '1rem',
              }}
            >
              <img
                src="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/50/000000/external-pdf-file-online-learning-flatart-icons-lineal-color-flatarticons.png"
                alt="pdf"
              />
              <div style={{ marginLeft: ' 20px', marginTop: ' 8px' }}>
                FileName.pdf
                <div
                  style={{
                    marginLeft: '0px',
                    marginTop: ' 12px',
                    fontSize: '0.8rem',
                    fontWeight: '400',
                    lineHeight: '0.8em',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#444444',
                  }}
                >
                  Added 10/09/2021
                </div>
                <div
                  style={{
                    marginLeft: '0px',
                    marginTop: ' 12px',
                    fontSize: '0.8rem',
                    fontWeight: '400',
                    lineHeight: '0.8em',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#444444',
                  }}
                >
                  <VisibilityIcon
                    style={{ color: 'grey', marginRight: '4px' }}
                  />
                  Public
                </div>
              </div>
              <MoreVertIcon
                style={{ marginLeft: '230px' }}
                onClick={handleOpen}
              />
            </div>
          </div>

          {showMe ? (
            <div
              style={{
                borderColor: 'd4d2d0',
                borderRadius: '8px',
                border: '1px #afafaf solid',
                marginBottom: '1rem',
                marginTop: ' 8px',
                marginLeft: '8px',
                width: '100%',
                boxShadow: '0 5px 1px -5px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flexStart',
                justifyContent: 'flex-start',
              }}
            >
              <div
                style={{
                  marginLeft: ' 20px',
                  marginTop: ' 8px',
                  fontWeight: '700',
                  display: 'flex',
                }}
              >
                <div>Contact Information</div>
                <EditIcon
                  style={{ marginLeft: '260px' }}
                  onClick={contactInfo}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: ' 20px',
                  marginTop: ' 8px',
                  marginBottom: '1.5rem',
                }}
              >
                <div
                  style={{
                    marginLeft: '0px',
                    marginTop: ' 12px',
                    fontSize: '0.8rem',
                    fontWeight: '400',
                    lineHeight: '0.8em',
                    color: '#444444',
                  }}
                >
                  Gunjal Gupta
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      marginLeft: '0px',
                      marginTop: ' 18px',
                      fontSize: '0.8rem',
                      fontWeight: '400',
                      lineHeight: '0.8em',
                      color: '#444444',
                    }}
                  >
                    gunjal1gupta@gmail.com
                  </div>
                  <LockIcon
                    style={{
                      marginLeft: '10px',
                      color: 'grey',
                      fontSize: 'small',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      marginLeft: '0px',
                      marginTop: ' 18px',
                      fontSize: '0.8rem',
                      fontWeight: '400',
                      lineHeight: '0.8em',
                      color: '#444444',
                    }}
                  >
                    (408)-673-7346
                  </div>
                  <LockIcon
                    style={{
                      marginLeft: '10px',
                      color: 'grey',
                      fontSize: 'small',
                    }}
                  />
                </div>

                <div
                  style={{
                    marginLeft: '0px',
                    marginTop: ' 18px',
                    fontSize: '0.8rem',
                    fontWeight: '400',
                    lineHeight: '0.8em',
                    color: '#444444',
                  }}
                >
                  San Jose, CA, 95110
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                borderColor: 'd4d2d0',
                borderRadius: '8px',
                border: '1px #afafaf solid',
                marginBottom: '1rem',
                marginTop: ' 8px',
                marginLeft: '8px',
                width: '100%',
                boxShadow: '0 5px 1px -5px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flexStart',
                justifyContent: 'flex-start',
              }}
            >
              <div
                style={{
                  marginLeft: ' 20px',
                  marginTop: ' 8px',
                  fontWeight: '700',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div>Contact Information</div>
                <div
                  style={{
                    marginLeft: '0px',
                    marginTop: ' 12px',
                    fontSize: '1rem',
                    fontWeight: '400',
                    lineHeight: '1em',
                    color: '#444444',
                  }}
                >
                  <span style={{ color: '#db183f' }}>*</span>
                  Required fields
                </div>
              </div>
              <div
                style={{
                  paddingLeft: '20px',
                  paddingTop: '15px',
                  paddingBottom: '25px',
                }}
              >
                <form onSubmit={handleSubmit}>
                  <p
                    style={{
                      fontWeight: 'bold',
                      color: '#666',
                      fontSize: '0.9em',
                    }}
                  >
                    First Name
                    <span style={{ color: '#db183f' }}>*</span>
                  </p>
                  <TextField
                    sx={{ width: '95%', height: '50%', fontSize: '0.9em' }}
                    required
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                  <p
                    style={{
                      fontWeight: 'bold',
                      color: '#666',
                      fontSize: '0.9em',
                    }}
                  >
                    Last Name
                    <span style={{ color: '#db183f' }}>*</span>
                  </p>
                  <TextField
                    sx={{ width: '95%', height: '50%', fontSize: '0.9em' }}
                    required
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{
                        marginLeft: '0px',
                        marginTop: ' 18px',
                        fontWeight: '400',
                      }}
                    >
                      Email Address
                    </div>
                    <LockIcon style={{ marginLeft: '10px', color: 'grey' }} />
                    <div
                      style={{
                        marginLeft: '0px',
                        marginTop: ' 18px',
                        fontSize: '0.7rem',
                        fontWeight: '400',
                        lineHeight: '0.8em',
                        color: '#444444',
                      }}
                    >
                      only provided to employers you apply or respond to.
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{
                        marginLeft: '0px',
                        marginTop: ' 18px',
                        fontSize: '0.8rem',
                        fontWeight: '400',
                        lineHeight: '0.8em',
                        color: '#444444',
                      }}
                    >
                      gunjal1gupta@gmail.com
                    </div>
                    <Button> edit </Button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{
                        marginLeft: '0px',
                        marginTop: ' 18px',
                        fontWeight: '400',
                      }}
                    >
                      Phone Number (optional)
                    </div>
                    <LockIcon style={{ marginLeft: '10px', color: 'grey' }} />
                    <div
                      style={{
                        marginLeft: '0px',
                        marginTop: ' 18px',
                        fontSize: '0.7rem',
                        fontWeight: '400',
                        lineHeight: '0.8em',
                        color: '#444444',
                      }}
                    >
                      only provided to employers you apply
                    </div>
                  </div>
                  <div
                    style={{
                      marginLeft: '0px',
                      marginTop: ' 5px',
                      marginBottom: '10px',
                      fontSize: '0.7rem',
                      fontWeight: '400',
                      lineHeight: '0.8em',
                      color: '#444444',
                    }}
                  >
                    or respond to.
                  </div>
                  <TextField
                    sx={{ width: '95%', height: '50%', fontSize: '0.9em' }}
                    required
                    value={mobile}
                    onChange={(event) => setmobile(event.target.value)}
                  />

                  <FormControlLabel
                    control={<Checkbox />}
                    label="Call and send me text messages at this phone number"
                  />
                  <div
                    style={{
                      marginLeft: '0px',
                      marginTop: ' 8px',
                      fontSize: '0.9rem',
                      fontWeight: '400',
                      lineHeight: '1.3em',
                      color: '#444444',
                    }}
                  >
                    By submitting the form with this box checked, I consent to
                    receive calls (including live, automated, and recorded
                    calls), texts, and WhatsApp messages from Indeed and
                    employers who use Indeed. This consent includes if this
                    number is a wireless cellular phone number.
                  </div>

                  <div
                    style={{
                      marginTop: ' 12px',
                      fontWeight: '700',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div>Location</div>
                    <div
                      style={{
                        marginTop: ' 12px',
                        fontSize: '0.87rem',
                        fontWeight: '400',
                        lineHeight: '1em',
                        color: '#444444',
                      }}
                    >
                      Providing a specific location helps Indeed connect you
                      with the right job.
                    </div>
                    <div
                      style={{
                        marginTop: ' 8px',
                        fontSize: '0.87rem',
                        fontWeight: '400',
                        lineHeight: '1em',
                        color: '#444444',
                      }}
                    >
                      Your street address is visible only to you.
                    </div>
                  </div>
                  <p
                    style={{
                      fontWeight: 'bold',
                      color: '#666',
                      fontSize: '0.9em',
                    }}
                  >
                    Street Address
                  </p>
                  <TextField
                    sx={{ width: '95%', height: '50%', fontSize: '0.9em' }}
                    required
                    value={stAddress}
                    onChange={(event) => setStAddress(event.target.value)}
                  />
                  <p
                    style={{
                      fontWeight: 'bold',
                      color: '#666',
                      fontSize: '0.9em',
                    }}
                  >
                    City - United States (change)
                    {' '}
                    <span style={{ color: '#db183f' }}>*</span>
                  </p>
                  <TextField
                    sx={{ width: '95%', height: '50%', fontSize: '0.9em' }}
                    required
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  />
                  <p
                    style={{
                      fontWeight: 'bold',
                      color: '#666',
                      fontSize: '0.9em',
                    }}
                  >
                    Postal Code
                  </p>
                  <TextField
                    sx={{ width: '95%', height: '50%', fontSize: '0.9em' }}
                    required
                    value={zipcode}
                    onChange={(event) => setZipcode(event.target.value)}
                  />

                  <button
                    className="reviewSubmitButton"
                    type="submit"
                    style={{
                      marginTop: '25px',
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
                    onClick={contactInfo}
                  >
                    Save
                  </button>
                  <button
                    className="reviewSubmitButton"
                    type="submit"
                    style={{
                      marginTop: '25px',
                      marginLeft: '20px',
                      width: '70px',
                      height: '40px',
                      fontWeight: 'bold',
                      Color: 'white',
                      backgroundColor: 'white',
                      border: 'white',
                      cursor: 'pointer',
                    }}
                    onClick={contactInfo}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}

          <div
            style={{
              borderColor: 'd4d2d0',
              borderRadius: '8px',
              border: '1px #afafaf solid',
              marginBottom: '1rem',
              marginTop: ' 8px',
              marginLeft: '8px',
              width: '100%',
              boxShadow: '0 5px 1px -5px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flexStart',
              justifyContent: 'flex-start',
            }}
          >
            <div
              style={{
                marginLeft: ' 20px',
                marginTop: ' 8px',
                fontWeight: '700',
                display: 'flex',
              }}
            >
              <div>Ready to work</div>
            </div>
            <div
              style={{
                display: 'flex',
                marginLeft: ' 20px',
                marginTop: ' 8px',
                marginBottom: '1.5rem',
              }}
            >
              <div
                style={{
                  marginLeft: '0px',
                  marginTop: ' 12px',
                  fontSize: '0.8rem',
                  fontWeight: '400',
                  lineHeight: '1.5em',
                }}
              >
                I am available to start immediately
              </div>
              <div
                style={{
                  marginLeft: '200px',
                  marginTop: ' 0px',
                  fontSize: '0.8rem',
                  fontWeight: '400',
                  lineHeight: '1.5em',
                }}
              >
                <Android12Switch defaultChecked />
              </div>
            </div>
          </div>
          <div
            style={{
              borderColor: 'd4d2d0',
              borderRadius: '8px',
              border: '1px #afafaf solid',
              marginBottom: '1rem',
              marginTop: ' 8px',
              marginLeft: '8px',
              width: '100%',
              boxShadow: '0 5px 1px -5px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flexStart',
              justifyContent: 'flex-start',
            }}
          >
            <div
              style={{
                marginLeft: ' 20px',
                marginTop: ' 8px',
                fontWeight: '700',
                display: 'flex',
              }}
            >
              <div>Job preferences</div>
              <EditIcon
                style={{ marginLeft: '287px' }}
                onClick={() => {
                  history.push('./JobPreferences');
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: ' 20px',
                marginTop: ' 8px',
                marginBottom: '1.6rem',
              }}
            >
              <div
                style={{
                  marginLeft: '0px',
                  marginTop: ' 12px',
                  fontSize: '0.8rem',
                  fontWeight: '400',
                  lineHeight: '1.5em',
                  color: '#444444',
                }}
              >
                Save specific details like desired pay and schedule that help us
                match you with better jobs
              </div>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default UserProfile;
