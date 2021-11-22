import React from 'react';
import Nav from './Nav';
import NavLeft from './NavLeft';
// import Beforelogin from './Beforelogin';
// import Box from '@mui/material/Box';

const Navbar = () => (
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
      <div style={{ marginLeft: '20px', width: '65%' }}>
        <Nav />
      </div>
      <div style={{ width: '35%' }}>
        {/* <Beforelogin /> */}
        <NavLeft />
      </div>
    </div>
  </div>
);

export default Navbar;
