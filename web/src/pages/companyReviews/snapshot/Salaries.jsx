/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
import React from 'react';
import { Typography } from '@mui/material';
import SalariesByIndustry from './SalariesByIndustry';

function Salaries(props) {
  return (
    <>
      <Typography
        style={{
          marginTop: '15px',
          fontWeight: 'bold',
          fontSize: '1.75rem',
          lineHeight: '1.25',
          marginBottom: '0.5rem',
        }}
      >
        Salaries
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <p style={{ fontSize: '0.88rem', lineHeight: '1.5', color: '#595959' }}>
          Salaries estimated from employees, users, and past and present job advertisements on
          Indeed.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        {Object.keys(props.salaries).length > 0
          ? Object.keys(props.salaries).map((key) => (
            <SalariesByIndustry industry={key} data={props.salaries[key]} />
          ))
          : null}
      </div>
    </>
  );
}

export default Salaries;
