/* eslint-disable object-shorthand */
/* eslint-disable no-nested-ternary */
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import TextField from '@mui/material/TextField';
// import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import putUser from '../../api/users/putDetails';
import ResumeModal from './ResumeModal';
import getUserByID from '../../api/users/getUser';

import { userDets } from '../../app/actions';
import PdfSVG from '../../components/svg/PdfSVG';

function UserProfile() {
  // const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [userDetail, setUserDetail] = useState({});

  const [isOpen, setIsOpen] = useState(false);
  const [showMe, setShowMe] = useState(true);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const [firstName, setFirstName] = useState('Gunjal');
  const [lastName, setLastName] = useState('Gupta');
  const [mobile, setmobile] = useState('(408)-673-7346');
  const [city, setCity] = useState('San Jose');
  const [zipcode, setZipcode] = useState('95126');

  const contactInfo = () => {
    setShowMe(!showMe);
    return <div>here</div>;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const style = {
    position: 'relative',
    width: 500,
    height: '90%',
    overflowX: 'hidden',
    bgcolor: 'background.paper',
    p: 4,
  };

  const getUserDetails = async () => {
    const userDetails = await getUserByID(user.user.id);
    setUserDetail(userDetails.data);
    setFirstName(userDetails.data.name.split(' ').slice(0, -1).join(' '));
    setLastName(userDetails.data.name.split(' ').slice(-1).join(' '));
    setmobile(userDetails.data.contactNo);
    setCity(userDetails.data.city);
  };

  const putUserDetails = async () => {
    const body = {
      name: firstName.concat(' ', lastName),
      contactNo: mobile,
      city: city,
      zip: zipcode,
    };
    dispatch(userDets({
      name: firstName.concat(' ', lastName),
      contactNo: mobile,
      city: city,
      zip: zipcode,
    }));
    await putUser(body, user.user.id);
    getUserDetails();
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={style}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              position: 'relative',
              border: '3px solid rgb(8 95 247)',
              width: '65px',
              height: '65px',
              borderRadius: '65px',
              borderColor: 'black',
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
              marginLeft: '10px',
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
              {firstName.charAt(0)}
              {lastName.charAt(0)}
            </div>
          </div>
          <div
            style={{
              marginLeft: '10px',
              fontSize: '1.5rem',
              fontFamily:
                'Helvetica Neue,Helvetica,Avenir Next,Arial,Roboto,Noto,sans-serif',
              fontWeight: '700',
              lineHeight: '1.5rem',
            }}
          >
            {userDetail ? userDetail.name : ''}
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
                justifyContent: 'space-between',
                marginLeft: ' 20px',
                marginTop: ' 20px',
                marginBottom: '1rem',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex' }}>
                <PdfSVG />
                <div style={{ marginLeft: ' 20px', marginTop: ' 8px' }}>
                  {user ? user.resume ? user.resume[0] : 'Please upload resume' : 'Please upload resume'}
                  <div
                    style={{
                      marginLeft: '0px',
                      marginTop: ' 12px',
                      fontSize: '0.8rem',
                      fontWeight: '400',
                      lineHeight: '0.8em',
                      // display: 'flex',
                      // alignItems: 'center',
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
              </div>
              <MoreVertIcon
                style={{ marginRight: '30px', marginTop: '-20px' }}
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
                  justifyContent: 'space-between',
                }}
              >
                <div>Contact Information</div>
                <EditIcon
                  style={{ marginRight: '10px' }}
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
                  {userDetail ? userDetail.name : ''}
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      marginTop: '18px',
                      fontSize: '0.8rem',
                      fontWeight: '400',
                      lineHeight: '0.8em',
                      color: '#444444',
                    }}
                  >
                    {userDetail ? userDetail.emails ? userDetail.emails.length > 0 ? userDetail.emails[0] : '' : '' : ''}
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
                    {userDetail.contactNo ? userDetail.contactNo : ''}
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
                  {userDetail.city ? userDetail.city : ''}
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
                  </div>
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
                    onClick={() => {
                      contactInfo();
                      putUserDetails();
                    }}
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
        </div>
      </Box>
    </div>
  );
}

export default UserProfile;
