import React from 'react';
import EmployerNav from './EmployerNav';
import EmployerSVG from '../../components/svg/EmployerSVG';
import Button from '../../components/Button';

function EmployersMain() {
  return (
    <div>
      <EmployerNav />
      <div style={{
        display: 'flex', justifyContent: 'center', flexDirection: 'row', width: '100%', alignItems: 'center',
      }}
      >
        <div style={{
          display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-start', marginTop: '50px', maxWidth: '750px',
        }}
        >
          <h1 style={{ fontSize: '76px' }}>You&apos;re here to hire.</h1>
          <h1 style={{ fontSize: '76px', marginTop: '-50px' }}>We&apos;re here to help.</h1>
          <p style={{ fontSize: '28px', marginLeft: '5px', marginTop: '-10px' }}>
            Post your job, interview candidates, and make offers all on Indeed. Start hiring today.
          </p>
          <Button label="Post a job" style={{ width: '200px', marginTop: '20px' }} />
        </div>
        <EmployerSVG />
      </div>
    </div>
  );
}

export default EmployersMain;
