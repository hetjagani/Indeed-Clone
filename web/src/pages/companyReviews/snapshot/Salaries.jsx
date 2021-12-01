/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Button from '../../../components/Button';
import AddSalaryModal from '../salaries/AddSalaryModal';
import SalariesByIndustry from './SalariesByIndustry';

function Salaries({ title, showButton = false, salaries }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <AddSalaryModal handleOpen={handleOpen} handleClose={handleClose} isOpen={isOpen} />
      <div style={{
        display: 'flex', width: '100%', justifyContent: 'space-between', marginTop: '15px',
      }}
      >
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
        {salaries ? Object.keys(salaries).length > 0
          ? Object.keys(salaries).map((key) => (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <p style={{ fontSize: '0.88rem', lineHeight: '1.5', color: '#595959' }}>
                  Salaries estimated from employees, users, and past and present job advertisements on
                  Indeed.
                </p>
              </div>
              <SalariesByIndustry industry={key} data={salaries[key]} />
            </>
          ))
          : null : null}
      </div>
    </>
  );
}

export default Salaries;
