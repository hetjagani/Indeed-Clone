// Import packages
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Checkbox, FormControlLabel } from '@mui/material';
import { validate as validateEmail } from 'email-validator';
import jwt from 'jwt-decode';
// import toast from 'react-hot-toast';
// import Cookies from 'universal-cookie';
import { setCookie } from 'react-use-cookie';
import toast from 'react-hot-toast';

// Import files
import './css/Login.css';
import { useDispatch } from 'react-redux';
import Input from '../../components/Input';
import login from '../../api/auth/login';
import Button from '../../components/Button';
import {
  loginRequest, loginFailure, loginSuccess, compamny,
} from '../../app/actions';
import getEmployerByID from '../../api/employer/get';
import getLoginDetails from '../../utils/getLoginDetails';

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars

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

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailHasError(validateEmail(e.target.value));
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordHasError(passwordRegex.test(e.target.value));
  };

  useEffect(() => {
    const decoded = getLoginDetails();
    if (decoded) {
      if (decoded.role === 'user') {
        history.push('/');
      } else if (decoded.role === 'employer') {
        history.push('/employee/dashboard');
      } else if (decoded.role === 'admin') {
        history.push('/admin/reviews');
      }
    }
  }, []);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailShouldShowError && passwordShouldShowError) {
      return;
    }
    const payload = { email, password };

    login(payload)
      .then(async (response) => {
        dispatch(loginRequest());
        if (response === null || response === undefined) {
          return;
        }
        setCookie('token', response.data.token, { path: '/' });
        const user = await jwt(response.data.token);
        dispatch(loginSuccess({
          loggedIn: true,
          id: user.id,
          email,
          role: user.role,
        }));
        if (user.role === 'user') {
          history.push('/');
        } else if (user.role === 'employer') {
          const employer = await getEmployerByID(user.id);
          if (!employer) {
            toast.error('Employer not found. Please register your company!');
            return;
          }
          await dispatch(compamny(employer.data.company[0]));
          history.push('/employee/dashboard');
        } else {
          history.push('/admin/reviews');
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(loginFailure(err));
      });
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
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Indeed_logo.svg/2560px-Indeed_logo.svg.png"
            style={{
              height: '30px',
              marginBottom: '25px',
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
              Sign In
            </h2>
            <div style={{ width: '435px' }}>
              <p
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '400',
                  lineHeight: '1.43',
                  color: '#2d2d2d',
                  letterSpacing: '0',
                }}
              >
                By signing in to your account, you agree to Indeed&apos;s Terms of Service and
                consent to our Cookie Policy and Privacy Policy.
              </p>
            </div>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
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
                <Button label="Sign in" type="submit" />
              </div>
            </form>
            <div style={{ display: 'flex', flexDirection: 'row', width: '450px' }}>
              <hr className="LRlin" />
              <span className="LRor">or</span>
              <hr className="LRlin" />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <p className="LRlink">New to Indeed? Create an account</p>
              </Link>
            </div>
          </div>
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: '30px',
            height: '1rem',
            fontSize: '1.1rem',
            color: '#2557a7',
            cursor: 'pointer',
          }}
        >
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <p className="rpar">Forgot your password?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
