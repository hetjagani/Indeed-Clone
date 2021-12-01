/* eslint-disable react/destructuring-assignment */
import { Typography } from '@mui/material';
import React from 'react';

function AboutCompany(props) {
  return (
    <div>
      <Typography
        style={{
          marginTop: '40px',
          fontWeight: 'bold',
          fontSize: '1.75rem',
          lineHeight: '1.25',
          marginBottom: '0.5rem',
        }}
      >
        About
      </Typography>
      <div style={{ marginTop: '1.5rem', marginLeft: '0rem', marginRight: '0rem' }}>
        <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>
          {(props.data && props.data.about) ? props.data.about : 'NA'}
        </p>
      </div>

      <Typography
        style={{
          marginTop: '50px',
          fontWeight: 'bold',
          fontSize: '1.75rem',
          lineHeight: '1.25',
          marginBottom: '0.5rem',
        }}
      >
        Our Culture
      </Typography>
      <div style={{ marginTop: '1.5rem', marginLeft: '0rem', marginRight: '0rem' }}>
        <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>
          {(props.data && props.data.workCulture) ? props.data.workCulture : 'Not reported'}
        </p>
      </div>

      <Typography
        style={{
          marginTop: '50px',
          fontWeight: 'bold',
          fontSize: '1.75rem',
          lineHeight: '1.25',
          marginBottom: '0.5rem',
        }}
      >
        Values
        {' '}
        {(props.data && props.data.name) ? `at ${props.data.name}` : 'Not reported'}
      </Typography>
      <div style={{ marginTop: '1.5rem', marginLeft: '0rem', marginRight: '0rem' }}>
        <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>
          {(props.data && props.data.values) ? props.data.values : 'Not reported'}
        </p>
      </div>
    </div>
  );
}

export default AboutCompany;
