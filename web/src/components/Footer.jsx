import React from 'react';

import './css/Footer.css';

function Footer() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginLeft: '10px',
          bottom: 0,
        }}
      >
        <p className="footerMargin">Hiring Lab</p>
        <p className="footerMargin">Career Advice</p>
        <p className="footerMargin">Browse Jobs</p>
        <p className="footerMargin">Browse Companies</p>
        <p className="footerMargin">Salaries</p>
        <p className="footerMargin">Find Certifications</p>
        <p className="footerMargin">Browse Schools</p>
        <p className="footerMargin">Indeed Events</p>
        <p className="footerMargin">Work at Indeed</p>
        <p className="footerMargin">Countries</p>
        <p className="footerMargin">About</p>
        <p className="footerMargin">Help Center</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginLeft: '10px',
        }}
      >
        <p className="footerMargin">&copy; 2021 Indeed</p>
        <p className="footerMargin">Do Not Sell My Personal Information</p>
        <p className="footerMargin">Accessibility at Indeed</p>
        <p className="footerMargin">Privacy Center</p>
        <p className="footerMargin">Cookies</p>
        <p className="footerMargin">Privacy</p>
        <p className="footerMargin">Terms</p>
      </div>
    </div>
  );
}

export default Footer;
