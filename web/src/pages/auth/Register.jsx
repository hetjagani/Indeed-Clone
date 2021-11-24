// Import packages
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Checkbox,
} from '@mui/material';
import { validate as validateEmail } from 'email-validator';
// import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';

// Import files
import './css/Login.css';
import Input from '../../components/Input';
import register from '../../api/auth/register';
import Button from '../../components/Button';

const Register = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [emailIsVisited, setEmailIsVisited] = useState(false);
  const [emailHasError, setEmailHasError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState('');
  const emailShouldShowError = !emailHasError && emailIsVisited;

  const [password, setPassword] = useState('');
  const [passwordIsVisited, setPasswordIsVisited] = useState(false);
  const [passwordHasError, setPasswordHasError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const passwordShouldShowError = !passwordHasError && passwordIsVisited;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;

  const [role, setRole] = useState({
    user: false,
    employer: false,
  });

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailHasError(validateEmail(e.target.value));
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordHasError(passwordRegex.test(e.target.value));
  };

  useEffect(() => {
    if (passwordShouldShowError) {
      setPasswordErrorText('Please enter a valid password!');
    } else {
      setPasswordErrorText('');
    }
  }, [passwordShouldShowError]);

  useEffect(() => {
    if (emailShouldShowError) {
      setEmailErrorText('Please enter valid email address!');
    } else {
      setEmailErrorText('');
    }
  }, [emailShouldShowError]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (emailShouldShowError && passwordShouldShowError) {
      return;
    }
    const payload = {
      email,
      password,
      role: role.employer === true ? 'employeer' : 'user',
    };
    const response = await register(payload);
    if (!response) {
      return;
    }
    const cookies = new Cookies();
    cookies.set('token', response.data.token, { path: '/' });
    history.push('/');
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#f3f2f1',
      }}
    >
      <div
        style={{
          backgroundColor: '#f3f2f1',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{ justifyContent: 'center', display: 'flex' }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Indeed_logo.svg/2560px-Indeed_logo.svg.png"
            style={{
              width: '120px',
              height: '30px',
              marginBottom: '25px',
              marginTop: '80px',
            }}
            alt="indeed"
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '470px',
            border: '1px black',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              width: '432px',
              backgroundColor: 'white',
              padding: '20px',
            }}
          >
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                lineHeight: '1.5',
                color: '#2d2d2d',
              }}
            >
              Create an Account (it&apos;s free)
            </h2>
            <div style={{ width: '435px' }}>
              <p
                style={{
                  fontSize: '0.75rem',
                  fontWeight: '400',
                  lineHeight: '1.34',
                  color: '#2d2d2d',
                  letterSpacing: '0',
                }}
              >
                By creating an account, you agree to Indeed&apos;s Terms of
                Service, Cookie Policy and Privacy Policy. You consent to
                receiving marketing messages from Indeed and may opt out from
                receiving such messages by following the unsubscribe link in our
                messages, or as detailed in our terms.
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '450px',
                marginTop: '20px',
                marginBottom: '25px',
              }}
            >
              <hr className="LRlin" />
              <span className="LRor">or</span>
              <hr className="LRlin" />
            </div>
            <form
              style={{ display: 'flex', flexDirection: 'column' }}
              onSubmit={handleSubmit}
            >
              <Input
                label="Email address *"
                type="email"
                value={email}
                onChange={onEmailChange}
                required
                setIsVisited={setEmailIsVisited}
                isError={emailShouldShowError}
                errorText={emailErrorText}
              />
              <Input
                label="Password *"
                type="password"
                value={password}
                onChange={onPasswordChange}
                required
                setIsVisited={setPasswordIsVisited}
                isError={passwordShouldShowError}
                errorText={passwordErrorText}
              />

              <FormLabel
                style={{
                  fontSize: '1rem',
                  fontWeight: '700',
                  lineHeight: '1.5',
                  color: '#2d2d2d',
                  letterSpacing: '0',
                }}
                required
              >
                Your role
              </FormLabel>
              <p
                style={{
                  fontWeight: '400',
                  lineHeight: '1.5',
                  fontSize: '0.875rem',
                  marginBottom: '0.25rem',
                  color: '#2d2d2d',
                  marginTop: '-2px',
                }}
              >
                Let us know how you&apos;ll be using our products
              </p>
              <RadioGroup aria-label="role" name="radio-buttons-group">
                <div className="radiodiv">
                  <FormControlLabel
                    value="employer"
                    control={<Radio />}
                    onChange={(event) => setRole({
                      employer: event.target.checked,
                      jobseeker: !event.target.checked,
                    })}
                    label="Employer"
                  />
                </div>
                <div className="radiodiv">
                  <FormControlLabel
                    value="job seeker"
                    control={<Radio />}
                    label="Job seeker"
                    onChange={(event) => setRole({
                      employer: !event.target.checked,
                      jobseeker: event.target.checked,
                    })}
                  />
                </div>
              </RadioGroup>

              <FormControlLabel
                control={(
                  <Checkbox
                    size="medium"
                    sx={{
                      color: '#2557a7',
                    }}
                  />
                )}
                label="Keep me signed in on this device."
              />
              <div style={{ marginTop: '20px', marginBottom: '30px' }}>
                <Button label="Create an account" type="submit" />
              </div>
            </form>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <p className="rpar">Have an account? Sign in</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
