import React from 'react';

import Nav from './Nav';
import NavLeft from './NavLeft';
import Beforelogin from './Beforelogin';
import getLoginDetails from '../utils/getLoginDetails';

const Navbar = () => {
  const decoded = getLoginDetails();

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Indeed_logo.svg/2560px-Indeed_logo.svg.png"
        style={{
          width: '120px',
          height: '30px',
          marginTop: '30px',
          marginLeft: '10px',
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
        <div style={{ marginLeft: '20px', width: '90%' }}>
          <Nav />
        </div>
        <div style={{ width: '35%' }}>
          {decoded ? <NavLeft /> : <Beforelogin />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
