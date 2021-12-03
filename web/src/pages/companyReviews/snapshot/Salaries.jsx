/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Button from '../../../components/Button';
import AddSalaryModal from '../salaries/AddSalaryModal';
import SalariesByIndustry from './SalariesByIndustry';

function Salaries({
  companyName, showButton = false, salaries, flag, compId, getSalaryDetails,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = async () => {
    await getSalaryDetails();
    setIsOpen(false);
  };

  return (
    <>
      <AddSalaryModal handleOpen={handleOpen} handleClose={handleClose} isOpen={isOpen} compId={compId} getSalaryDetails={getSalaryDetails} />
      <div style={{
        display: 'flex', width: '100%', justifyContent: 'space-between', marginTop: '15px',
      }}
      >
        <Typography style={{
          fontWeight: 'bold', fontSize: '1.75rem', lineHeight: '1.25', marginBottom: '0.5rem',
        }}
        >
          Avg Salaries at
          {' '}
          {companyName}
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
            <SalariesByIndustry industry={key} data={salaries[key]} flag={flag} />
          ))
          : null : null}
      </div>
    </>
  );
}

export default Salaries;
