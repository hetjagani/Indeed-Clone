/* eslint-disable no-nested-ternary */
import { Typography } from '@mui/material';
import React from 'react';

function SalariesByIndustry({ industry, data, flag }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography
        style={{
          marginTop: '15px',
          fontWeight: 'bold',
          fontSize: '1.4em',
          lineHeight: '1.25',
          marginBottom: '0.5rem',
        }}
      >
        {industry}
      </Typography>
      {data && data.length > 0
        ? flag === false
          ? data.slice(0, 3).map((salaryData) => (
            <>
              <p style={{ marginTop: '20px' }}>{salaryData.title}</p>
              <p style={{ marginTop: '-10px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  $
                  {salaryData.salary}
                </span>
                {' '}
                per annum
              </p>
            </>
          ))
          : data.map((salaryData) => (
            <>
              <p style={{ marginTop: '20px' }}>{salaryData.title}</p>
              <p style={{ marginTop: '-10px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                  $
                  {salaryData.salary}
                </span>
                {' '}
                per annum
              </p>
            </>
          ))
        : null}
    </div>
  );
}

export default SalariesByIndustry;
