import React from 'react';
import CompanyAbout from './CompanyAbout';
import Reviews from './Reviews';
import Salaries from './Salaries';
import WorkHappiness from './WorkHappiness';

function Snapshot() {
  return (
    <>
      <p style={{ fontSize: '12px', color: '#6f6f6f' }}>
        {' '}
        Work at
        {' '}
        Facebook: Jobs and careers
      </p>
      <WorkHappiness />
      <CompanyAbout />
      <Salaries title="Salaries" />
      <Reviews />
    </>
  );
}

export default Snapshot;
