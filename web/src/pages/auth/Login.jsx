// Import packages
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, FormControlLabel } from '@mui/material';

// Import files
import './css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = (event) => {
    event.preventDefault();
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
                By signing in to your account, you agree to Indeed&apos;s Terms
                of Service and consent to our Cookie Policy and Privacy Policy.
              </p>
            </div>
            <form
              style={{ display: 'flex', flexDirection: 'column' }}
              onSubmit={login}
            >
              <label
                htmlFor="login-email"
                style={{
                  fontSize: '1rem',
                  fontWeight: '700',
                  lineHeight: '1.5',
                  color: '#2d2d2d',
                  letterSpacing: '0',
                }}
              >
                Email Address
                <input
                  id="login-email"
                  className="LRinput"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label
                htmlFor="login-password"
                style={{
                  fontSize: '1rem',
                  fontWeight: '700',
                  lineHeight: '1.5',
                  color: '#2d2d2d',
                  letterSpacing: '0',
                }}
              >
                Password
                <input
                  id="login-password"
                  className="LRinput"
                  type="password"
                  value={password}
                  width
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
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
              <button className="LRbutton" type="submit">
                Sign In
              </button>
            </form>
            <div
              style={{ display: 'flex', flexDirection: 'row', width: '450px' }}
            >
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
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <p className="rpar">Help Center</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
