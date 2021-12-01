/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useHistory } from 'react-router';
import Nav from './Nav';
import NavLeft from './NavLeft';
import Beforelogin from './Beforelogin';
import getLoginDetails from '../utils/getLoginDetails';

const Navbar = () => {
  const decoded = getLoginDetails();
  const history = useHistory();

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <img
        onClick={() => history.push('/')}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Indeed_logo.svg/2560px-Indeed_logo.svg.png"
        style={{
          width: '120px',
          height: '30px',
          marginTop: '30px',
          marginLeft: '10px',
          cursor: 'pointer',
        }}
        alt="indeed"
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div style={{ marginLeft: '20px', width: '95%' }}>
          <Nav />
        </div>
        <div style={{ width: '35%' }}>
          {decoded ? decoded.id ? <NavLeft /> : <Beforelogin /> : <Beforelogin />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
