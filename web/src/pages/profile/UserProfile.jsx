/* eslint-disable no-unused-vars */
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
import putUser from '../../api/user/putUser';
import postUser from '../../api/user/postUser';
import ResumeModal from './ResumeModal';
import getUser from '../../api/user/getUser';
import upload from '../../api/media/upload';

import { userDets } from '../../app/actions';
import PdfSVG from '../../components/svg/PdfSVG';

async function postImages({ image }) {
  // eslint-disable-next-line no-undef
  const formData = new FormData();
  formData.append('imageData', image);
  const response = await upload(formData);
  return response;
}

function UserProfile() {
  // const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [userDetail, setUserDetail] = useState({});

  const [isOpen, setIsOpen] = useState(false);
  const [showMe, setShowMe] = useState(true);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setmobile] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [resume, setResume] = useState('');
  const [cover, setCover] = useState('');
  const [flag, setFlag] = useState(false);
  const [email, setEmail] = useState('');
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
    const userDetails = await getUser(user.user.id);
    console.log(userDetails);
    if (!userDetails) {
      console.log('bruh');
      setFlag(true);
    } else {
      console.log('lol');
      setUserDetail(userDetails.data);
      setFirstName(userDetails.data.name.split(' ').slice(0, -1).join(' '));
      setLastName(userDetails.data.name.split(' ').slice(-1).join(' '));
      setmobile(userDetails.data.contactNo);
      setCity(userDetails.data.city);
      setZipcode(userDetails.data.zip);
    }
  };

  const putUserDetails = async () => {
    const resumes = [];
    resumes.push(resume);
    const coverLetters = [];
    const emails = [];
    emails.push(email);
    coverLetters.push(cover);
    if (flag) {
      const body = {
        id: user.user.id,
        name: firstName.concat(' ', lastName),
        contactNo: mobile,
        city: city,
        zip: zipcode,
        resumes,
        coverLetters,
        emails,
      };
      console.log(body);
      dispatch(userDets({
        name: firstName.concat(' ', lastName),
        contactNo: mobile,
        city: city,
        zip: zipcode,
      }));
      const response = await postUser(body);
      getUserDetails();
    } else {
      console.log('in else');
      const body = {
        name: firstName.concat(' ', lastName),
        contactNo: mobile,
        city: city,
        zip: zipcode,
        resumes,
        coverLetters,
        emails,
      };
      console.log(body);
      dispatch(userDets({
        name: firstName.concat(' ', lastName),
        contactNo: mobile,
        city: city,
        zip: zipcode,
      }));
      const updateResponse = await putUser(body, user.user.id);
      console.log(updateResponse);
      getUserDetails();
    }
  };
  const uploadResume = async (event) => {
    event.preventDefault();
    const fil = event.target.files[0];
    const result = await postImages({ image: fil });
    if (!result) {
      return;
    }
    setResume(result.data.url);
  };
  const uploadCoverLetter = async (event) => {
    event.preventDefault();
    const fil = event.target.files[0];
    const result = await postImages({ image: fil });
    if (!result) {
      return;
    }
    setCover(result.data.url);
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
                  Please upload resume
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
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ paddingTop: '10px' }}
                    onChange={uploadResume}
                  />
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

                  <div style={{ display: 'flex', alignItems: 'center', paddingTop: '10px' }}>
                    <TextField
                      sx={{ width: '95%', height: '50%', fontSize: '0.9em' }}
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
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

                  <p
                    style={{
                      fontWeight: 'bold',
                      color: '#666',
                      fontSize: '0.9em',
                    }}
                  >
                    CoverLetter
                  </p>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ paddingTop: '10px' }}
                      onChange={uploadCoverLetter}
                    />
                  </div>

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
