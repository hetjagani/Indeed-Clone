/* eslint-disable max-len */
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Button from '../../../components/Button';
import AddSalaryModal from '../salaries/AddSalaryModal';

function Salaries({ title, showButton = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <AddSalaryModal handleOpen={handleOpen} handleClose={handleClose} isOpen={isOpen} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
        <Typography style={{
          fontWeight: 'bold', fontSize: '1.75rem', lineHeight: '1.25', marginBottom: '0.5rem',
        }}
        >
          {title}
        </Typography>
        {showButton
          ? (
            <Button
              onClick={handleOpen}
              label="Add a salary"
              style={{
                width: '150px', backgroundColor: 'white', color: '#2557a7', border: '1px solid #d4d2d0',
              }}
            />
          ) : null}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <p style={{ fontSize: '0.88rem', lineHeight: '1.5', color: '#595959' }}>
          Salaries estimated from employees, users, and past and present job advertisements on Indeed.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography style={{
            marginTop: '15px', fontWeight: 'bold', fontSize: '1.4em', lineHeight: '1.25', marginBottom: '0.5rem',
          }}
          >
            Salaries
          </Typography>
          <p style={{ marginTop: '20px' }}>Retail Sales associate</p>
          <p style={{ marginTop: '-10px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$11.81</span>
            {' '}
            per hour
          </p>
          <p>Senior Software Engineer</p>
          <p style={{ marginTop: '-10px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$137,678</span>
            {' '}
            per year
          </p>
          <p>Customer service associate</p>
          <p style={{ marginTop: '-10px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$11.07</span>
            {' '}
            per hour
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography style={{
            marginTop: '15px', fontWeight: 'bold', fontSize: '1.4em', lineHeight: '1.25', marginBottom: '0.5rem',
          }}
          >
            Salaries
          </Typography>
          <p style={{ marginTop: '20px' }}>Retail Sales associate</p>
          <p style={{ marginTop: '-10px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$11.81</span>
            {' '}
            per hour
          </p>
          <p>Senior Software Engineer</p>
          <p style={{ marginTop: '-10px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$137,678</span>
            {' '}
            per year
          </p>
          <p>Customer service associate</p>
          <p style={{ marginTop: '-10px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$11.07</span>
            {' '}
            per hour
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography style={{
            marginTop: '15px', fontWeight: 'bold', fontSize: '1.4em', lineHeight: '1.25', marginBottom: '0.5rem',
          }}
          >
            Salaries
          </Typography>
          <p style={{ marginTop: '20px' }}>Retail Sales associate</p>
          <p style={{ marginTop: '-10px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$11.81</span>
            {' '}
            per hour
          </p>
          <p>Senior Software Engineer</p>
          <p style={{ marginTop: '-10px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$137,678</span>
            {' '}
            per year
          </p>
          <p>Customer service associate</p>
          <p style={{ marginTop: '-10px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$11.07</span>
            {' '}
            per hour
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography style={{
            marginTop: '15px', fontWeight: 'bold', fontSize: '1.4em', lineHeight: '1.25', marginBottom: '0.5rem',
          }}
          >
            Salaries
          </Typography>
          <p style={{ marginTop: '20px' }}>Retail Sales associate</p>
          <p style={{ marginTop: '-10px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$11.81</span>
            {' '}
            per hour
          </p>
          <p>Senior Software Engineer</p>
          <p style={{ marginTop: '-10px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$137,678</span>
            {' '}
            per year
          </p>
          <p>Customer service associate</p>
          <p style={{ marginTop: '-10px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$11.07</span>
            {' '}
            per hour
          </p>
        </div>

      </div>
    </>
  );
}

export default Salaries;
